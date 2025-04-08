from flask import Flask, send_from_directory
from flask_cors import CORS
import os

# Initialize Flask app
app = Flask(__name__, static_folder='.')
CORS(app)

# Configuration
app.config['SECRET_KEY'] = os.urandom(24)

# Routes
@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

@app.route('/<path:path>')
def serve_file(path):
    return send_from_directory('.', path)

if __name__ == '__main__':
    app.run(debug=True) 