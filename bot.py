import logging
import sqlite3
import asyncio
import os
from telegram import Update, ReplyKeyboardMarkup, ReplyKeyboardRemove
from telegram.ext import Application, CommandHandler, ContextTypes, ConversationHandler, MessageHandler, filters, CallbackQueryHandler
from apscheduler.schedulers.asyncio import AsyncIOScheduler
from apscheduler.triggers.interval import IntervalTrigger
from telegram import InlineKeyboardButton, InlineKeyboardMarkup
logging.basicConfig(format='%(asctime)s - %(name)s - %(levelname)s - %(message)s', level=logging.INFO)
logger = logging.getLogger(__name__)

# States
(START_CHOICE, QUESTION_1, QUESTION_2, QUESTION_3, QUESTION_4, QUESTION_5, HELP, RESULT, MENU) = range(9)

# Questions and answers
questions = ['Что взять в путешествие?', 'Твой идеальный день?', 'Твой выбор отдыха?', 'Любимое время года?', 'Твой способ передвижения?']
answers = [
    [['Компас и карта 🧭', 'Исследователь'], ['Путеводитель и очки 📚', 'Мудрец'], ['Кошелек и сувениры 💰', 'Торговец']],
    [['Поход на неизведанное 🚶‍♂️', 'Исследователь'], ['Экскурсия по музеям 🏛', 'Мудрец'], ['Шоппинг и рынки 🛍️', 'Торговец']],
    [['Кемпинг в лесу 🏕️', 'Миролюбец'], ['Альпинизм и дайвинг 🧗‍♂️', 'Приключенец'], ['Пляж и медитация 🏖️', 'Миролюбец']],
    [['Лето, пляжи и солнце ☀️', 'Миролюбец'], ['Зима, горы и сноуборд 🏂', 'Приключенец'], ['Весна, парки и цветы 🌸', 'Исследователь']],
    [['Пешком или велосипед 🚴', 'Исследователь'], ['Поезда и автобусы 🚌', 'Мудрец'], ['Арендованная машина 🚗', 'Торговец']]
]

def save_user_data(user_id, username, character_class, image_path):
    conn = sqlite3.connect('users.db')
    cursor = conn.cursor()
    cursor.execute("PRAGMA journal_mode=WAL")
    cursor.execute('''
        INSERT INTO users(user_id, username, class, image_path, speed, cunning, luck)
        VALUES(?,?,?,?,?,?,?)''', (user_id, username, character_class, image_path, 1, 1, 1))
    conn.commit()
    conn.close()

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    user_id = update.message.from_user.id
    if not is_user_registered(user_id):
        reply_keyboard = [['🧭 Начать выбор класса', '🆘 Попросить помощь']]
        await update.message.reply_text(
            'Здрав будь, дружище! Меня зовут Александр, богатырь из далеких странствий...',
            reply_markup=ReplyKeyboardMarkup(reply_keyboard, one_time_keyboard=True),
        )
        return START_CHOICE
    else:
        await update.message.reply_text(text='...',reply_markup=ReplyKeyboardRemove())
        logger.info("Attempting to remove reply keyboard for user %s", update.effective_user.id)
        await send_menu_with_buttons(update, context)
        return ConversationHandler.END 
    


def is_user_registered(user_id):
    conn = sqlite3.connect('users.db')
    cursor = conn.cursor()
    cursor.execute('SELECT 1 FROM users WHERE user_id = ?', (user_id,))
    user_exists = cursor.fetchone() is not None
    conn.close()
    return user_exists

async def start_choice(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    query = update.message.text
    if query == '🧭 Начать выбор класса':
        return await question_handler(update, context, 0)
    elif query == '🆘 Попросить помощь':
        return await help(update, context)

async def help(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    await update.message.reply_text('Не волнуйся, я здесь, чтобы помочь тебе! Смело задавай свой вопрос!')
    logger.info("Attempting to remove reply keyboard for user %s", update.effective_user.id)
    return ConversationHandler.END

async def question_handler(update: Update, context: ContextTypes.DEFAULT_TYPE, question_number: int) -> int:
    logger.info(f"User {update.effective_user.id} is in QUESTION_{question_number}, answered: {update.message.text}")
    user_answer = update.message.text
    if question_number == 0:
        next_question_number = question_number 
        reply_keyboard = [list(map(lambda x: x[0], answers[next_question_number]))]
        await update.message.reply_text(
            questions[next_question_number],
            reply_markup=ReplyKeyboardMarkup(reply_keyboard, one_time_keyboard=True),
        )
        return next_question_number + 1
    for answer in answers[question_number - 1]:
        if user_answer == answer[0]:
            if 'results' not in context.user_data:
                context.user_data['results'] = {}
            context.user_data['results'][answer[1]] = context.user_data['results'].get(answer[1], 0) + 1
            break

    if question_number < len(questions) - 1:
        next_question_number = question_number + 1
        reply_keyboard = [list(map(lambda x: x[0], answers[next_question_number]))]
        await update.message.reply_text(
            questions[next_question_number],
            reply_markup=ReplyKeyboardMarkup(reply_keyboard, one_time_keyboard=True),
        )
        return next_question_number + 1
    else:
        return await result(update, context)

async def result(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    final_class = max(context.user_data['results'], key=context.user_data['results'].get)
    await update.message.reply_text(f"Твой класс: {final_class}. Используй команду /menu, чтобы увидеть меню.",reply_markup=ReplyKeyboardRemove())
    logger.info("Attempting to remove reply keyboard for user %s", update.effective_user.id)
    
    return ConversationHandler.END
async def register(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    return start_choice
async def cancel(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    update.message.reply_text(reply_markup=ReplyKeyboardRemove())
    logger.info("Attempting to remove reply keyboard for user %s", update.effective_user.id)
    await update.message.reply_text('Опрос отменен.', reply_markup=ReplyKeyboardRemove())
    logger.info("Attempting to remove reply keyboard for user %s", update.effective_user.id)    
    return ConversationHandler.END
async def send_notifications(bot):
    conn = sqlite3.connect('users.db')
    cursor = conn.cursor()
    cursor.execute('SELECT user_id, class FROM users')
    users = cursor.fetchall()
    conn.close()

    for user_id, user_class in users:
        message = "Специальное предложение для вашего класса: {user_class}"
        try:
            await bot.send_message(chat_id=user_id, text=message)
        except Exception as e:
            logger.error(f"Ошибка при отправке сообщения пользователю {user_id}: {e}")
async def send_menu_with_buttons(update: Update, context: ContextTypes.DEFAULT_TYPE):
    user_id = update.effective_user.id
    
    conn = sqlite3.connect('users.db')
    cursor = conn.cursor()
    
    # Получаем данные пользователя из базы данных
    cursor.execute('SELECT username, class, image_path, speed, cunning, luck FROM users WHERE user_id = ?', (user_id,))
    user_data = cursor.fetchone()

    if user_data:
        username, character_class, image_path, speed, cunning, luck = user_data
        # Формируем сообщение пользователя с его данными
        personal_message = f"Имя: {username}\nКласс: {character_class}\nСкорость: {speed}, Хитрость: {cunning}, Удача: {luck}"
        
        # Создаем клавиатуру с кнопками
        keyboard = [
            [InlineKeyboardButton("Квесты", callback_data='quests'),
             InlineKeyboardButton("Спецпредложения", callback_data='offers')],
            [InlineKeyboardButton("Меню", callback_data='menu')]
        ]
        reply_markup = InlineKeyboardMarkup(keyboard)

        # Отправляем сообщение с клавиатурой
        await context.bot.send_message(chat_id=user_id, text=personal_message, reply_markup=reply_markup)
        
        # Если есть изображение профиля, отправляем его
        if image_path and os.path.exists(image_path):
            with open(image_path, 'rb') as photo:
                await context.bot.send_photo(chat_id=user_id, photo=photo)
    else:
        # Если пользователь не найден, отправляем сообщение об этом
        await context.bot.send_message(chat_id=user_id, text="Профиль пользователя не найден. Выполните регистрацию, используя команду /start.")
    
    conn.close()
# async def show_user_menu(update: Update, context: ContextTypes.DEFAULT_TYPE):
#     user_id = update.message.from_user.id
#     conn = sqlite3.connect('users.db')
#     cursor = conn.cursor()
#     cursor.execute('SELECT username, class, image_path, speed, cunning, luck FROM users WHERE user_id = ?', (user_id,))
#     user_data = cursor.fetchone()
#     conn.close()
#     if user_data:
#         username, character_class, image_path, speed, cunning, luck = user_data
#         message = f"Имя: {username}\nКласс: {character_class}\nСкорость: {speed}, Хитрость: {cunning}, Удача: {luck}"
#         await update.message.reply_text(message)
#         if image_path and os.path.exists(image_path):
#             await update.message.reply_photo(photo=open(image_path, 'rb'))
#         else:
#             await update.message.reply_text("Изображение профиля отсутствует.")
#     else:
#         await update.message.reply_text("Профиль пользователя не найден. Выполните регистрацию, используя команду /register.")

async def show_menu(update: Update, context: ContextTypes.DEFAULT_TYPE):
    # Assuming send_menu_with_buttons is adapted to work with an update object
    await update.message.reply_text(f"Твой класс: {final_class}. Используй команду /menu, чтобы увидеть меню.",reply_markup=ReplyKeyboardRemove())
    logger.info("Attempting to remove reply keyboard for user %s", update.effective_user.id)

    await send_menu_with_buttons(update)
    # Return an appropriate state or end the conversation
    return ConversationHandler.END 

async def send_special_quest(update: Update, context: ContextTypes.DEFAULT_TYPE, quest_id=None):
    conn = sqlite3.connect('quests_offers.db')
    cursor = conn.cursor()
    
    if quest_id is None:
        cursor.execute('SELECT * FROM quests ORDER BY RANDOM() LIMIT 1')
    else:
        cursor.execute('SELECT * FROM quests WHERE id = ?', (quest_id,))
    
    quest = cursor.fetchone()

    if quest is None:
        await context.bot.send_message(chat_id=update.effective_chat.id, text="Квест не найден.")
        return

    quest_id, title, description, image_url = quest
    cursor.execute('SELECT id FROM quests WHERE id < ? ORDER BY id DESC LIMIT 1', (quest_id,))
    prev_quest = cursor.fetchone()
    prev_quest_id = prev_quest[0] if prev_quest else None

    cursor.execute('SELECT id FROM quests WHERE id > ? ORDER BY id ASC LIMIT 1', (quest_id,))
    next_quest = cursor.fetchone()
    next_quest_id = next_quest[0] if next_quest else None

    message = f"*{quest['title']}*\n{quest['description']}"
    keyboard = [
        [InlineKeyboardButton("Следующий квест", callback_data=f'quests:{next_quest_id}'),
         InlineKeyboardButton("Предыдущий квест", callback_data=f'quests:{prev_quest_id}')],
        [InlineKeyboardButton("Меню", callback_data='menu')]
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)
    if quest['image_url']:
        await context.bot.send_photo(chat_id=update.effective_chat.id, photo=quest['image_url'], caption=message, reply_markup=reply_markup, parse_mode="Markdown")
    else:
        await context.bot.send_message(chat_id=update.effective_chat.id, text=message, reply_markup=reply_markup, parse_mode="Markdown")


async def send_special_offers(update: Update, context: ContextTypes.DEFAULT_TYPE, offer_id=None):
    # Здесь логика для выбора спецпредложения по offer_id, если он указан,
    # или случайного спецпредложения, если offer_id=None
    # Также необходимо реализовать логику для определения next_offer_id и prev_offer_id

    offer = {"id": "offer_id", "title": "Скидка 50% на все приключения!", "description": "Только сегодня и только для вас!", "image_url": "http://example.com/offer.jpg"}
    next_offer_id = "next_offer_id"
    prev_offer_id = "prev_offer_id"

    message = f"*{offer['title']}*\n{offer['description']}"
    keyboard = [
        [InlineKeyboardButton("Следующее предложение", callback_data=f'offers:{next_offer_id}'),
         InlineKeyboardButton("Предыдущее предложение", callback_data=f'offers:{prev_offer_id}')],
        [InlineKeyboardButton("Меню", callback_data='menu')]
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)
    if offer['image_url']:
        await context.bot.send_photo(chat_id=update.effective_chat.id, photo=offer['image_url'], caption=message, reply_markup=reply_markup, parse_mode="Markdown")
    else:
        await context.bot.send_message(chat_id=update.effective_chat.id, text=message, reply_markup=reply_markup, parse_mode="Markdown")


async def button_callback_handler(update: Update, context: ContextTypes.DEFAULT_TYPE):
    print("I am called")
    query = update.callback_query
    await query.answer()
    data = query.data   
    logger.info(f"Received callback query: {query.data}")
    if data.startswith('quests'):
        quest_id = data.split(':')[1]
        await send_special_quest(update, context, quest_id if len(data) > 1 else None)
    elif data.startswith('offers'):
        offer_id = data.split(':')[1]
        await send_special_offers(update, context, offer_id if len(data) > 1 else None)
    elif data.startswith('menu'):
        await show_user_menu(update, context)
#async def all_update_handler(update: Update, context: ContextTypes.DEFAULT_TYPE):
#   logger.info(f"Received update: {update}")
def main():
    application = Application.builder().token("6564573865:AAFz0XogD4kPuoBsUqNq0PRbDs9ybn0i96E").build()
    conv_handler = ConversationHandler(
    entry_points=[CommandHandler('start', start)],
    states={
        START_CHOICE: [MessageHandler(filters.TEXT & ~filters.COMMAND, start_choice)],
        QUESTION_1: [MessageHandler(filters.TEXT & ~filters.COMMAND, lambda update, context: question_handler(update, context, 1))],
        QUESTION_2: [MessageHandler(filters.TEXT & ~filters.COMMAND, lambda update, context: question_handler(update, context, 2))],
        QUESTION_3: [MessageHandler(filters.TEXT & ~filters.COMMAND, lambda update, context: question_handler(update, context, 3))],
        QUESTION_4: [MessageHandler(filters.TEXT & ~filters.COMMAND, lambda update, context: question_handler(update, context, 4))],
        QUESTION_5: [MessageHandler(filters.TEXT & ~filters.COMMAND, lambda update, context: question_handler(update, context, 5))],
                
        RESULT: [MessageHandler(filters.TEXT & ~filters.COMMAND, result)],
        HELP: [MessageHandler(filters.Regex('^(🆘 Попросить помощь)$'), help)],
        MENU: [MessageHandler(filters.TEXT & ~filters.COMMAND, send_menu_with_buttons)],  # Add your MENU state here
    },
    fallbacks=[CommandHandler('cancel', cancel)],)
    #application.add_handler(MessageHandler(filters.ALL, all_update_handler)) # for DEBUG

    
    application.add_handler(conv_handler)
    application.add_handler(CommandHandler('register', register))
    application.add_handler(CommandHandler('menu', send_menu_with_buttons))
    application.add_handler(CallbackQueryHandler(button_callback_handler))
    scheduler = AsyncIOScheduler()
    scheduler.add_job(send_notifications, 'interval', seconds=130, args=[application.bot])
    #scheduler = AsyncIOScheduler()
    #scheduler.add_job(send_menu_with_buttons, 'interval', seconds=10, args=[application.bot])
    scheduler.start()

    loop = asyncio.get_event_loop()
    loop.create_task(application.run_polling())
    loop.run_forever()

if __name__ == '__main__':
    main()    
