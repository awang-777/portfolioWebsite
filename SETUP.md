# Development setup instructions

## Backend Setup (Flask)

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Copy environment variables:
   ```bash
   cp ../.env.example .env
   ```

5. Initialize the database:
   ```bash
   flask db init
   flask db migrate -m "Initial migration"
   flask db upgrade
   ```

6. Run the Flask development server:
   ```bash
   python app.py
   ```

## Frontend Setup (React)

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

## Project Structure

```
Amanda Portfolio/
├── backend/                 # Flask API
│   ├── app.py              # Main Flask application
│   ├── requirements.txt    # Python dependencies
│   ├── routes/             # API routes
│   ├── models/             # Database models
│   └── utils/              # Utility functions
├── frontend/               # React application
│   ├── package.json        # Node.js dependencies
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── styles/         # CSS styles
│   │   └── utils/          # Utility functions
│   └── public/             # Static assets
├── uploads/                # File uploads directory
├── .env.example           # Environment variables template
└── .gitignore             # Git ignore rules
```

## Features Included

- **Backend (Flask)**:
  - RESTful API for projects and contact form
  - Database models for projects and contact messages
  - File upload handling
  - Email integration for contact form
  - CORS configuration for frontend communication

- **Frontend (React)**:
  - Modern React with hooks
  - React Router for navigation
  - Styled Components for styling
  - Framer Motion for animations
  - Responsive design
  - SEO optimization with React Helmet

## Next Steps

1. Customize the design and content
2. Add your actual project data
3. Configure email settings
4. Set up file storage (local or cloud)
5. Deploy to production
