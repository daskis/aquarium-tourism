import logging

from telegram import ReplyKeyboardMarkup, ReplyKeyboardRemove, Update
from telegram.ext import (
    Application,
    CommandHandler,
    ContextTypes,
    ConversationHandler,
    MessageHandler,
    filters,
)

# Enable logging
logging.basicConfig(format="%(asctime)s - %(name)s - %(levelname)s - %(message)s", level=logging.INFO)
logger = logging.getLogger(__name__)

CLASS, RACE, STATS = range(3)

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    """Starts the conversation and asks the user about their character class."""
    reply_keyboard = [["Warrior", "Mage", "Rogue"]]

    await update.message.reply_text(
        "Welcome to the character creation process! Let's start by choosing a class for your character. "
        "Send /cancel to stop anytime.\n\n"
        "What class do you choose?",
        reply_markup=ReplyKeyboardMarkup(reply_keyboard, one_time_keyboard=True, input_field_placeholder="Warrior, Mage, or Rogue?"),
    )

    return CLASS

async def character_class(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    """Stores the selected class and asks for race."""
    user = update.message.from_user
    character_class = update.message.text
    logger.info("Class of %s: %s", user.first_name, character_class)
    context.user_data['class'] = character_class  # Storing the class in context

    reply_keyboard = [["Human", "Elf", "Dwarf"]]
    await update.message.reply_text(
        "Great choice! Now, what is your race?",
        reply_markup=ReplyKeyboardMarkup(reply_keyboard, one_time_keyboard=True, input_field_placeholder="Human, Elf, or Dwarf?"),
    )

    return RACE

async def character_race(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    """Stores the selected race and asks for stats."""
    user = update.message.from_user
    character_race = update.message.text
    logger.info("Race of %s: %s", user.first_name, character_race)
    context.user_data['race'] = character_race  # Storing the race in context

    await update.message.reply_text(
        "Fascinating! Finally, distribute 5 stat points between Strength, Agility, and Intelligence. "
        "Please use the format: 'Strength 2, Agility 2, Intelligence 1'.",
        reply_markup=ReplyKeyboardRemove(),
    )

    return STATS

async def character_stats(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    """Stores the stats and ends the conversation."""
    user = update.message.from_user
    stats = update.message.text
    logger.info("Stats of %s: %s", user.first_name, stats)
    # Example: Parse and store the stats here

    await update.message.reply_text(
        "Your character is now created! Thank you for your time.",
        reply_markup=ReplyKeyboardRemove(),
    )

    return ConversationHandler.END

async def cancel(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    """Cancels and ends the conversation."""
    await update.message.reply_text(
        "Character creation canceled. Maybe next time!",
        reply_markup=ReplyKeyboardRemove(),
    )

    return ConversationHandler.END

def main() -> None:
    application = Application.builder().token("6564573865:AAFz0XogD4kPuoBsUqNq0PRbDs9ybn0i96E").build()

    conv_handler = ConversationHandler(
        entry_points=[CommandHandler("start", start)],
        states={
            CLASS: [MessageHandler(filters.Regex("^(Warrior|Mage|Rogue)$"), character_class)],
            RACE: [MessageHandler(filters.Regex("^(Human|Elf|Dwarf)$"), character_race)],
            STATS: [MessageHandler(filters.TEXT & ~filters.COMMAND, character_stats)],
        },
        fallbacks=[CommandHandler("cancel", cancel)],
    )

    application.add_handler(conv_handler)
    application.run_polling(allowed_updates=Update.ALL_TYPES)

if __name__ == "__main__":
    main()
