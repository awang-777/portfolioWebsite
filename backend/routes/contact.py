from flask import Blueprint, request, jsonify
from flask_mail import Message
from backend import mail

contact_bp = Blueprint('contact', __name__)

@contact_bp.route('/', methods=['POST'])
def send_contact_message():
    """Send contact form message"""
    data = request.get_json()
    
    # Validate required fields
    required_fields = ['name', 'email', 'message']
    for field in required_fields:
        if not data.get(field):
            return jsonify({'error': f'{field} is required'}), 400
    
    try:
        # Create email message
        msg = Message(
            subject=f"Portfolio Contact: {data['name']}",
            sender=data['email'],
            recipients=['amanda@example.com'],  # Replace with actual email
            body=f"""
Name: {data['name']}
Email: {data['email']}
Subject: {data.get('subject', 'No subject')}

Message:
{data['message']}
            """
        )
        
        # Send email
        mail.send(msg)
        
        return jsonify({
            'message': 'Thank you for your message! I\'ll get back to you soon.',
            'status': 'success'
        })
        
    except Exception as e:
        return jsonify({
            'error': 'Failed to send message. Please try again later.',
            'status': 'error'
        }), 500
