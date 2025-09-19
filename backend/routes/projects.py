from flask import Blueprint, request, jsonify
from backend.models import Project, db
from backend.utils.file_upload import allowed_file, save_file

projects_bp = Blueprint('projects', __name__)

@projects_bp.route('/', methods=['GET'])
def get_projects():
    """Get all projects"""
    projects = Project.query.all()
    return jsonify([project.to_dict() for project in projects])

@projects_bp.route('/<int:project_id>', methods=['GET'])
def get_project(project_id):
    """Get a specific project by ID"""
    project = Project.query.get_or_404(project_id)
    return jsonify(project.to_dict())

@projects_bp.route('/', methods=['POST'])
def create_project():
    """Create a new project"""
    data = request.get_json()
    
    project = Project(
        title=data['title'],
        description=data['description'],
        category=data.get('category', 'immersive'),
        media_type=data.get('media_type', 'image'),
        media_url=data.get('media_url', ''),
        thumbnail_url=data.get('thumbnail_url', ''),
        year=data.get('year'),
        technologies=data.get('technologies', []),
        featured=data.get('featured', False)
    )
    
    db.session.add(project)
    db.session.commit()
    
    return jsonify(project.to_dict()), 201

@projects_bp.route('/<int:project_id>', methods=['PUT'])
def update_project(project_id):
    """Update a project"""
    project = Project.query.get_or_404(project_id)
    data = request.get_json()
    
    for key, value in data.items():
        if hasattr(project, key):
            setattr(project, key, value)
    
    db.session.commit()
    return jsonify(project.to_dict())

@projects_bp.route('/<int:project_id>', methods=['DELETE'])
def delete_project(project_id):
    """Delete a project"""
    project = Project.query.get_or_404(project_id)
    db.session.delete(project)
    db.session.commit()
    return '', 204
