import sqlite3

def create_db():
    conn = sqlite3.connect('users.db')
    cursor = conn.cursor()
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS users (
        user_id INTEGER PRIMARY KEY,
        username TEXT NOT NULL,
        class TEXT NOT NULL,
        image_path TEXT NOT NULL,
        speed INTEGER DEFAULT 1,
        cunning INTEGER DEFAULT 1,
        luck INTEGER DEFAULT 1
    );
    ''')
    conn.commit()
    conn.close()

create_db()
