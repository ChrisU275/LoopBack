import os
from flask import g
import mysql.connector
from dotenv import load_dotenv

load_dotenv()

def get_db():
    if 'db' not in g:
        g.db = mysql.connector.connect(
            host=os.getenv('DB_HOST'),
            user=os.getenv('DB_USER'),
            password=os.getenv('DB_PASSWORD'),
            database=os.getenv('DB_NAME')
        )
    return g.db

def close_db(e=None):
    db = g.pop('db', None)
    if db is not None:
        db.close()


def test_db_connection():
    try:
        connection = mysql.connector.connect(
            port=int(os.getenv("DB_PORT", "3307")),
            host=os.getenv("DB_HOST"),
            user=os.getenv("DB_USER"),
            password=os.getenv("DB_PASSWORD"),
            database=os.getenv("DB_NAME")
        )

        if connection.is_connected():
            print("✅ Database connection established successfully!")
            cursor = connection.cursor()
            cursor.execute("SELECT 1")  # simple test query
            result = cursor.fetchone()
            print("Test query result:", result)
            cursor.close()
            connection.close()
            print("✅ Connection closed cleanly.")
        else:
            print("❌ Connection failed for unknown reason.")
    except mysql.connector.Error as err:
        print("❌ Database connection failed:", err)