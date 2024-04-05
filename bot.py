import logging
from telegram import Update, ReplyKeyboardMarkup, ReplyKeyboardRemove
from telegram.ext import Application, CommandHandler, ContextTypes, ConversationHandler, MessageHandler, filters
import os
logging.basicConfig(format='%(asctime)s - %(name)s - %(levelname)s - %(message)s', level=logging.INFO)
logger = logging.getLogger(__name__)

# Определение состояний
LOCATION, TRAVEL, ELEMENT, EVENING, ENVIRONMENT, RESULT = range(6)

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    reply_keyboard = [['В лесу 🌲', 'У моря 🌊', 'В горах ⛰️']]
    await update.message.reply_text(
        'Где ты предпочитаешь проводить время?',
        reply_markup=ReplyKeyboardMarkup(reply_keyboard, one_time_keyboard=True),
    )
    return LOCATION

async def location(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    context.user_data['LOCATION'] = update.message.text
    reply_keyboard = [['Пешком 🚶', 'На корабле ⛵', 'На коне 🐴']]
    await update.message.reply_text(
        'Как ты предпочитаешь путешествовать?',
        reply_markup=ReplyKeyboardMarkup(reply_keyboard, one_time_keyboard=True),
    )
    return TRAVEL

async def travel(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    context.user_data['TRAVEL'] = update.message.text
    reply_keyboard = [['Огонь 🔥', 'Вода 💧', 'Воздух 💨']]
    await update.message.reply_text(
        'Какой элемент тебя больше всего привлекает?',
        reply_markup=ReplyKeyboardMarkup(reply_keyboard, one_time_keyboard=True),
    )
    return ELEMENT

async def element(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    context.user_data['ELEMENT'] = update.message.text
    reply_keyboard = [['Читать 📚', 'Заботиться о природе 🌿', 'Изобретать 🛠️']]
    await update.message.reply_text(
        'Что ты предпочитаешь делать вечером?',
        reply_markup=ReplyKeyboardMarkup(reply_keyboard, one_time_keyboard=True),
    )
    return EVENING

async def evening(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    context.user_data['EVENING'] = update.message.text
    reply_keyboard = [['В библиотеке 📖', 'В городе 🏙️', 'В природе 🏞️']]
    await update.message.reply_text(
        'В какой среде ты чувствуешь себя как дома?',
        reply_markup=ReplyKeyboardMarkup(reply_keyboard, one_time_keyboard=True),
    )
    return ENVIRONMENT

async def environment(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    context.user_data['ENVIRONMENT'] = update.message.text
    # Здесь производим анализ ответов и выбираем картинку для отправки
    # Пример анализа ответов (реализация зависит от вашей логики)
    result = analyze_answers(context.user_data)
    photo_path = get_photo_path_based_on_result(result)
    await update.message.reply_photo(photo=open(photo_path, 'rb'), caption=result)
    return ConversationHandler.END
def analyze_answers(answers):
    race = ""
    travel = ""
    element = ""
    
    # Определение расы
    if answers['LOCATION'] == 'В лесу 🌲':
        race = "Эльф"
    elif answers['LOCATION'] == 'У моря 🌊':
        race = "Человек"
    elif answers['LOCATION'] == 'В горах ⛰️':
        race = "Дварф"

    # Определение способа путешествия
    if answers['TRAVEL'] == 'Пешком 🚶':
        travel = "Следопыт"
    elif answers['TRAVEL'] == 'На корабле ⛵':
        travel = "Мореплаватель"
    elif answers['TRAVEL'] == 'На коне 🐴':
        travel = "Всадник"

    # Определение элемента
    if answers['ELEMENT'] == 'Огонь 🔥':
        element = "Маг огня"
    elif answers['ELEMENT'] == 'Вода 💧':
        element = "Маг воды"
    elif answers['ELEMENT'] == 'Воздух 💨':
        element = "Маг воздуха"

    # Формирование описания персонажа
    class_name = f"{race} {travel} {element}"
    descriptions = {
    "Эльф Следопыт Маг огня": "Лесной Странник, мастер выживания и магии огня, способный призвать пламя даже в самом глухом лесу.",
    "Эльф Следопыт Маг воды": "Хранитель Ручьев, искусный следопыт, чьи заклинания воды могут исцелять и защищать.",
    "Эльф Следопыт Маг воздуха": "Вестник Ветров, ловкий и быстрый, управляющий ветрами для достижения своих целей.",
    "Эльф Мореплаватель Маг огня": "Путешествует по морям на корабле, управляемом магией огня, исследуя дальние земли.",
    "Эльф Мореплаватель Маг воды": "Гармонично существует с морем, управляя волнами и течениями на своё усмотрение.",
    "Эльф Мореплаватель Маг воздуха": "Использует силу ветра для навигации и управления своим парусником.",
    "Эльф Всадник Маг огня": "Верховой воин, способный призывать огненных коней из другого измерения.",
    "Эльф Всадник Маг воды": "Его верный скакун может пересекать водные преграды без усилий, благодаря магии воды.",
    "Эльф Всадник Маг воздуха": "Скорость и легкость – его главные качества, он способен преодолевать любые препятствия.",
    "Человек Следопыт Маг огня": "Исследует земли, используя свои знания огня для выживания в диких условиях.",
    "Человек Следопыт Маг воды": "Находит воду в любой местности, используя магию для обнаружения источников.",
    "Человек Следопыт Маг воздуха": "Легко ориентируется в пространстве, используя потоки воздуха для определения направлений.",
    "Человек Мореплаватель Маг огня": "Отважный путешественник, освещающий свой путь факелами магического огня.",
    "Человек Мореплаватель Маг воды": "Морской волк, способный укрощать штормы и вызывать тихую погоду.",
    "Человек Мореплаватель Маг воздуха": "Мастер парусного спорта, использующий ветра для достижения невиданных скоростей.",
    "Человек Всадник Маг огня": "Храбрый рыцарь, вооруженный огненным мечом и не знающий страха перед лицом опасности.",
    "Человек Всадник Маг воды": "Способен пересекать бурные реки и озера на своем верном скакуне, как по суше.",
    "Человек Всадник Маг воздуха": "Прыгает выше и дальше всех, его конь кажется почти невесомым при скачке.",
    "Дварф Следопыт Маг огня": "Отважный исследователь подземелий, использующий огонь для освещения своего пути.",
    "Дварф Следопыт Маг воды": "Находит и использует подземные воды, создавая источники питьевой воды для своих экспедиций.",
    "Дварф Следопыт Маг воздуха": "Умеет находить выход из любых пещер, чувствуя сквозняки и потоки воздуха.",
    "Дварф Мореплаватель Маг огня": "Редкость среди дварфов, его корабль известен как 'Плывущий вулкан'.",
    "Дварф Мореплаватель Маг воды": "Строит непотопляемые корабли, используя магию воды для их защиты.",
    "Дварф Мореплаватель Маг воздуха": "Создает механические паруса, которые адаптируются к любым ветрам.",
    "Дварф Всадник Маг огня": "Его боевой карабин стреляет огненными шарами, поражая врагов на расстоянии.",
    "Дварф Всадник Маг воды": "Способен вызывать дождь, который гасит огонь и восстанавливает силы.",
    "Дварф Всадник Маг воздуха": "Использует ветер для увеличения скорости и маневренности своего боевого молота."
    }

    
    return descriptions.get(class_name, "Отшельник, искатель приключений и знаний")


def get_photo_path_based_on_result(result):
    images = {
    "Лесной Странник, мастер выживания и магии огня, способный призвать пламя даже в самом глухом лесу.": "forest_strider.png",
    "Хранитель Ручьев, искусный следопыт, чьи заклинания воды могут исцелять и защищать.": "stream_keeper.png",
    "Вестник Ветров, ловкий и быстрый, управляющий ветрами для достижения своих целей.": "wind_herald.png",
    "Путешествует по морям на корабле, управляемом магией огня, исследуя дальние земли.": "fire_sailor.png",
    "Гармонично существует с морем, управляя волнами и течениями на своё усмотрение.": "water_sailor.png",
    "Использует силу ветра для навигации и управления своим парусником.": "air_sailor.png",
    "Верховой воин, способный призывать огненных коней из другого измерения.": "fire_rider.png",
    "Его верный скакун может пересекать водные преграды без усилий, благодаря магии воды.": "water_rider.png",
    "Скорость и легкость – его главные качества, он способен преодолевать любые препятствия.": "air_rider.png",
    "Исследует земли, используя свои знания огня для выживания в диких условиях.": "fire_explorer.png",
    "Находит воду в любой местности, используя магию для обнаружения источников.": "water_explorer.png",
    "Легко ориентируется в пространстве, используя потоки воздуха для определения направлений.": "air_explorer.png",
    "Отважный исследователь подземелий, использующий огонь для освещения своего пути.": "dwarf_fire_pathfinder.png",
    "Находит и использует подземные воды, создавая источники питьевой воды для своих экспедиций.": "dwarf_water_pathfinder.png",
    "Умеет находить выход из любых пещер, чувствуя сквозняки и потоки воздуха.": "dwarf_air_pathfinder.png",
    "Редкость среди дварфов, его корабль известен как 'Плывущий вулкан'.": "dwarf_fire_sailor.png",
    "Строит непотопляемые корабли, используя магию воды для их защиты.": "dwarf_water_sailor.png",
    "Создает механические паруса, которые адаптируются к любым ветрам.": "dwarf_air_sailor.png",
    "Его боевой карабин стреляет огненными шарами, поражая врагов на расстоянии.": "dwarf_fire_rider.png",
    "Способен вызывать дождь, который гасит огонь и восстанавливает силы.": "dwarf_water_rider.png",
    "Использует ветер для увеличения скорости и маневренности своего боевого молота.": "dwarf_air_rider.png"
    }
    default_image_path = "hermit.png"  # Предполагаем, что 'hermit.png' находится в папке 'images'

    # Получаем путь к изображению из словаря, если результат существует; иначе используем путь к изображению по умолчанию
    image_path = images.get(result, default_image_path)
    
    # Полный путь к файлу
    full_image_path = os.path.join(os.getcwd(), image_path)  # os.getcwd() возвращает текущую рабочую директорию
    
    # Проверяем, существует ли файл по полученному пути
    if not os.path.isfile(full_image_path):
        # Если файл не существует, используем путь к изображению по умолчанию
        image_path = default_image_path

    return image_path


async def cancel(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    await update.message.reply_text('Опрос отменен.', reply_markup=ReplyKeyboardRemove())
    return ConversationHandler.END

def main() -> None:
    application = Application.builder().token("6564573865:AAFz0XogD4kPuoBsUqNq0PRbDs9ybn0i96E").build()
    
    conv_handler = ConversationHandler(
        entry_points=[CommandHandler('start', start)],
        states={
            LOCATION: [MessageHandler(filters.TEXT & ~filters.COMMAND, location)],
            TRAVEL: [MessageHandler(filters.TEXT & ~filters.COMMAND, travel)],
            ELEMENT: [MessageHandler(filters.TEXT & ~filters.COMMAND, element)],
            EVENING: [MessageHandler(filters.TEXT & ~filters.COMMAND, evening)],
            ENVIRONMENT: [MessageHandler(filters.TEXT & ~filters.COMMAND, environment)],
        },
        fallbacks=[CommandHandler('cancel', cancel)],
    )

    application.add_handler(conv_handler)
    application.run_polling()

if __name__ == '__main__':
    main()
