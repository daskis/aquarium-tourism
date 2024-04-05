import logging
from telegram import Update, ReplyKeyboardMarkup, ReplyKeyboardRemove
from telegram.ext import Application, CommandHandler, ContextTypes, ConversationHandler, MessageHandler, filters
import sqlite3
logging.basicConfig(format='%(asctime)s - %(name)s - %(levelname)s - %(message)s', level=logging.INFO)
logger = logging.getLogger(__name__)



# Определение состояний для каждого вопроса и помощи
(START_CHOICE,  QUESTION_1, QUESTION_2, QUESTION_3, QUESTION_4, QUESTION_5,HELP, RESULT) = range(8)

# Вопросы и ответы
questions = [
    'Что взять в путешествие?',
    'Твой идеальный день?',
    'Твой выбор отдыха?',
    'Любимое время года?',
    'Твой способ передвижения?'
]

answers = [
    [['Компас и карта 🧭', 'Исследователь'], 
     ['Путеводитель и очки 📚', 'Мудрец'], 
     ['Кошелек и сувениры 💰', 'Торговец']],
    [['Поход на неизведанное 🚶‍♂️', 'Исследователь'], 
     ['Экскурсия по музеям 🏛', 'Мудрец'], 
     ['Шоппинг и рынки 🛍️', 'Торговец']],
    [['Кемпинг в лесу 🏕️', 'Миролюбец'], 
     ['Альпинизм и дайвинг 🧗‍♂️', 'Приключенец'], 
     ['Пляж и медитация 🏖️', 'Миролюбец']],
    [['Лето, пляжи и солнце ☀️', 'Миролюбец'], 
     ['Зима, горы и сноуборд 🏂', 'Приключенец'], 
     ['Весна, парки и цветы 🌸', 'Исследователь']],
    [['Пешком или велосипед 🚴', 'Исследователь'], 
     ['Поезда и автобусы 🚌', 'Мудрец'], 
     ['Арендованная машина 🚗', 'Торговец']]
]
def save_user_data(user_id, username, character_class, image_path):
    conn = sqlite3.connect('users.db')
    cursor = conn.cursor()
    cursor.execute('''
    INSERT INTO users(user_id, username, class, image_path, speed, cunning, luck)
    VALUES(?,?,?,?,?,?,?)''', (user_id, username, character_class, image_path, 1, 1, 1))
    conn.commit()
    conn.close()
# Функция для начала диалога
async def start(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    reply_keyboard = [['🧭 Начать выбор класса', '🆘 Попросить помощь']]
    await update.message.reply_text(
        'Здрав будь, дружище! Меня зовут Александр, богатырь из далеких странствий. '
        'Слышу, ты в поиске своего пути? Давай, помогу определиться, какие дороги тебе идти. '
        'Я точно знаю куда твоё сердце стремится. Али помощь в пути нужна? Не бойся выбора, '
        'ведь каждый шаг – это часть твоей истории. Поделись со мной своими мечтами, '
        'и вместе мы найдем твой истинный путь!',
        reply_markup=ReplyKeyboardMarkup(reply_keyboard, one_time_keyboard=True),
    )
    return START_CHOICE
async def show_user_menu(update: Update, context: ContextTypes.DEFAULT_TYPE):
    user_id = update.message.from_user.id
    conn = sqlite3.connect('users.db')
    cursor = conn.cursor()
    cursor.execute('SELECT username, class, image_path, speed, cunning, luck FROM users WHERE user_id = ?', (user_id,))
    user_data = cursor.fetchone()
    conn.close()

    if user_data:
        username, character_class, image_path, speed, cunning, luck = user_data
        message = f"Имя: {username}\nКласс: {character_class}\nСкорость: {speed}, Хитрость: {cunning}, Удача: {luck}"
        await update.message.reply_text(message)
        # Отправка изображения пользователя
        await update.message.reply_photo(photo=open(image_path, 'rb'))
    else:
        await update.message.reply_text('Информация о пользователе не найдена.')
# Функция для обработки начального выбора
async def start_choice(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    query = update.message.text
    if query == '🧭 Начать выбор класса':
        reply_keyboard = [list(map(lambda x: x[0], answers[0]))]
        await update.message.reply_text(
            questions[0],
            reply_markup=ReplyKeyboardMarkup(reply_keyboard, one_time_keyboard=True),
        )
        return QUESTION_1
    elif query == '🆘 Попросить помощь':
        return await help(update, context)

# Функция для обработки запроса помощи
async def help(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    await update.message.reply_text(
        'Не волнуйся, я здесь, чтобы помочь тебе! Cмело задавай свой вопрос!'
        # Добавьте полезную информацию или советы здесь
    )
    return ConversationHandler.END

async def question_handler(update: Update, context: ContextTypes.DEFAULT_TYPE, question_number: int) -> int:
    user_answer = update.message.text
    for answer in answers[question_number - 1]:
        if user_answer == answer[0]:
            if 'results' not in context.user_data:
                context.user_data['results'] = {}
            context.user_data['results'][answer[1]] = context.user_data['results'].get(answer[1], 0) + 1
            break
    print(question_number)
    if question_number < len(questions):
        # Если не последний вопрос, задаем следующий вопрос
        print(question_number)
        reply_keyboard = [list(map(lambda x: x[0], answers[question_number]))]
        await update.message.reply_text(
            questions[question_number],
            reply_markup=ReplyKeyboardMarkup(reply_keyboard, one_time_keyboard=True),
        )
        print(question_number)
        return question_number + 1
    else:
        # Если последний вопрос, переходим к выводу результатов
        return await result(update, context)

# Функция для вывода результата
async def result(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    user_id = update.message.from_user.id
    username = update.message.from_user.username or "Unknown"  # Если username отсутствует, используйте "Unknown"
    final_class = max(context.user_data['results'], key=context.user_data['results'].get)
    photo_path = get_photo_path_based_on_class(final_class)
    
    # Сохранение данных пользователя в базу данных
    save_user_data(user_id, username, final_class, photo_path)
    
    await update.message.reply_photo(photo=open(photo_path, 'rb'), caption=f"Твой класс: {final_class}")
    return ConversationHandler.END


# Функция для выбора изображения на основе класса персонажа
def get_photo_path_based_on_class(character_class):
    images = {
        'Исследователь': 'explorer.jpg',
        'Мудрец': 'sage.jpg',
        'Торговец': 'merchant.jpg',
        'Приключенец': 'adventurer.jpg',
        'Миролюбец': 'peacelover.jpg',
    }
    return images.get(character_class, "hermit.jpg")

# Функция для отмены диалога
async def cancel(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    await update.message.reply_text('Опрос отменен.', reply_markup=ReplyKeyboardRemove())
    return ConversationHandler.END
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
    },
    fallbacks=[CommandHandler('cancel', cancel)],)


    application.add_handler(conv_handler)
    application.add_handler(CommandHandler('menu', show_user_menu))
    application.run_polling()

if __name__ == '__main__':
    main()