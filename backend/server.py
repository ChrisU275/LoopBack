from flask import Flask
from flask_cors import CORS
from routes import api  

app = Flask(__name__)
app.secret_key = "supersecretkey"

# Allow React frontend to call this backend
CORS(app,supports_credentials=True)

# Register your Blueprint
app.register_blueprint(api,origins=["http://localhost:3000"], url_prefix="/api")

if __name__ == "__main__":
    app.run(debug=True)
