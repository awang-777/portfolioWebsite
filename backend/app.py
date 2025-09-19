from flask import Flask, jsonify
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

app = Flask(__name__)

# Basic configuration
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'dev-secret-key')

@app.route('/')
def index():
    return jsonify({
        'message': 'Amanda Portfolio API',
        'version': '1.0.0',
        'status': 'running'
    })

@app.route('/api/health')
def health_check():
    return jsonify({
        'status': 'healthy',
        'message': 'API is running successfully'
    })

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8000)
