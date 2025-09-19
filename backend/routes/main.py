from flask import Blueprint, jsonify
from backend.models import Project

main_bp = Blueprint('main', __name__)

@main_bp.route('/')
def index():
    return jsonify({
        'message': 'Amanda Portfolio API',
        'version': '1.0.0',
        'status': 'running'
    })

@main_bp.route('/api/health')
def health_check():
    return jsonify({
        'status': 'healthy',
        'message': 'API is running successfully'
    })
