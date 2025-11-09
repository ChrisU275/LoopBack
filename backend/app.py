from flask import Flask, jsonify, request
from flask_cors import CORS
from db import get_db, close_db

app = Flask(__name__)
CORS(app)

@app.teardown_appcontext
def teardown_db(exception):
    close_db()

@app.route("/api/test", methods=["GET"])
def test_connection():
    db = get_db()
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT * FROM your_table_name LIMIT 5")
    rows = cursor.fetchall()
    return jsonify(rows)

@app.route("/api/add", methods=["POST"])
def add_data():
    data = request.get_json()
    db = get_db()
    cursor = db.cursor()
    cursor.execute("INSERT INTO your_table_name (column1, column2) VALUES (%s, %s)",
                   (data["col1"], data["col2"]))
    db.commit()
    return jsonify({"message": "Data added successfully!"}), 201

if __name__ == "__main__":
    app.run(port=5000, debug=True)
