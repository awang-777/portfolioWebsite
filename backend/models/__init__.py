from backend import db
from datetime import datetime
import json

class Project(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=False)
    category = db.Column(db.String(50), default='immersive')
    media_type = db.Column(db.String(20), default='image')  # image, video, interactive, etc.
    media_url = db.Column(db.String(500))
    thumbnail_url = db.Column(db.String(500))
    year = db.Column(db.Integer)
    technologies = db.Column(db.Text)  # JSON string of technologies used
    featured = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'category': self.category,
            'media_type': self.media_type,
            'media_url': self.media_url,
            'thumbnail_url': self.thumbnail_url,
            'year': self.year,
            'technologies': json.loads(self.technologies) if self.technologies else [],
            'featured': self.featured,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }
    
    def set_technologies(self, tech_list):
        """Helper method to set technologies as JSON string"""
        self.technologies = json.dumps(tech_list)
    
    def get_technologies(self):
        """Helper method to get technologies as list"""
        return json.loads(self.technologies) if self.technologies else []

class ContactMessage(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    subject = db.Column(db.String(200))
    message = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    read = db.Column(db.Boolean, default=False)
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'subject': self.subject,
            'message': self.message,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'read': self.read
        }
