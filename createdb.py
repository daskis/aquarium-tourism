import sqlite3

def create_databases():
    # Создание базы данных пользователей
    # users_conn = sqlite3.connect('users.db')
    # users_cursor = users_conn.cursor()
    # users_cursor.execute('''
    # CREATE TABLE IF NOT EXISTS users (
    #     user_id INTEGER PRIMARY KEY,
    #     username TEXT NOT NULL,
    #     class TEXT NOT NULL,
    #     image_path TEXT NOT NULL,
    #     speed INTEGER DEFAULT 1,
    #     cunning INTEGER DEFAULT 1,
    #     luck INTEGER DEFAULT 1
    # );
    # ''')
    # users_conn.commit()
    # users_conn.close()

    # Создание базы данных квестов и спецпредложений
    quests_offers_conn = sqlite3.connect('users.db')
    quests_offers_cursor = quests_offers_conn.cursor()
    quests_data = [
    ("Исследуйте Парк Олимп", "Отправьтесь в путешествие по Парку Олимп в Сочи, наслаждаясь природой и свежим воздухом.", "hermit.jpg"),
    ("Поход к водопадам Руфабго", "Пройдите по живописным тропам к водопадам Руфабго в Адыгее, открыв для себя красоту нетронутой природы.", "hermit.jpg"),
    ("Серфинг в Анапе", "Поймайте волну на одном из лучших серфинг-спотов России на побережье Черного моря в Анапе.", "hermit.jpg"),
    ("Винный тур по Абрау-Дюрсо", "Исследуйте винодельни Абрау-Дюрсо, насладитесь дегустацией лучших вин и узнайте об истории виноделия в регионе.", "hermit.jpg"),
    ("Треккинг по Кавказским горам", "Отправьтесь в захватывающий треккинг по Кавказским горам, открывая новые виды и маршруты в окрестностях Красной Поляны.", "hermit.jpg"),
    ]

    for quest in quests_data:
        quests_offers_cursor.execute('''
            INSERT INTO quests (title, description, image_path) 
            VALUES (?, ?, ?);
        ''', quest)
    quests_offers_conn.commit()


    # quests_offers_cursor.execute('''
    # CREATE TABLE IF NOT EXISTS quests (
    #     quest_id INTEGER PRIMARY KEY AUTOINCREMENT,
    #     title TEXT NOT NULL,
    #     description TEXT NOT NULL,
    #     image_path TEXT
    # );
    # ''')
    # quests_offers_cursor.execute('''
    # CREATE TABLE IF NOT EXISTS offers (
    #     offer_id INTEGER PRIMARY KEY AUTOINCREMENT,
    #     title TEXT NOT NULL,
    #     description TEXT NOT NULL,
    #     discount TEXT,
    #     image_path TEXT
    # );
    # ''')
    quests_offers_conn.commit()
    quests_offers_conn.close()

create_databases()
