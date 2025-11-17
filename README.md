# Flipr - MERN Portfolio Application

A full-stack MERN (MongoDB, Express, React, Node.js) application with a public landing page and admin dashboard for managing projects, clients, contacts, and newsletter subscriptions.

## Project Structure

```
flipr/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   ├── models/
│   │   │   ├── Project.js
│   │   │   ├── Client.js
│   │   │   ├── Contact.js
│   │   │   └── Subscriber.js
│   │   ├── routes/
│   │   │   ├── projectRoutes.js
│   │   │   ├── clientRoutes.js
│   │   │   ├── contactRoutes.js
│   │   │   └── subscriberRoutes.js
│   │   └── app.js
│   ├── .env
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── api.js
    │   ├── App.jsx
    │   ├── main.jsx
    │   ├── index.css
    │   ├── pages/
    │   │   ├── LandingPage.jsx
    │   │   └── AdminPanel.jsx
    │   └── components/
    │       ├── Navbar.jsx
    │       ├── HeroSection.jsx
    │       ├── ProjectsSection.jsx
    │       ├── HappyClientsSection.jsx
    │       ├── ContactForm.jsx
    │       ├── NewsletterSection.jsx
    │       └── admin/
    │           ├── ProjectForm.jsx
    │           ├── ClientForm.jsx
    │           ├── ContactsTable.jsx
    │           └── SubscribersTable.jsx
    ├── index.html
    ├── vite.config.js
    └── package.json
```

## Setup & Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (running locally or via MongoDB Atlas)
- npm or yarn

### Backend Setup

1. Navigate to backend folder:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Ensure `.env` file exists with these variables:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/flipr
NODE_ENV=development
JWT_SECRET=supersecretjwtkey
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=changeme
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
```

4. (Optional but recommended) Create a **Cloudinary** account and use the credentials above. Images uploaded through the admin panel will be stored in Cloudinary automatically. If you leave the file picker blank and provide an `Image URL`, that URL will still be used.

4. Start the backend server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. In a new terminal, navigate to frontend folder:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the frontend development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## Running Both Simultaneously

In production, you would run these in separate terminal tabs:

**Terminal 1 (Backend):**
```bash
cd backend
npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm run dev
```

Both will run on their respective ports and communicate via the API endpoints.

## Deployment

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md).

**Quick Summary:**
1. Set up MongoDB Atlas (free tier)
2. Set up Cloudinary account (free tier)
3. Deploy backend on Render (Web Service)
4. Deploy frontend on Render (Static Site)
5. Configure environment variables in Render dashboard

**Required Environment Variables:**

**Backend:**
- `MONGO_URI` - MongoDB Atlas connection string
- `JWT_SECRET` - Random secure string for JWT signing
- `ADMIN_EMAIL` - Admin login email
- `ADMIN_PASSWORD` - Admin login password
- `CLOUDINARY_CLOUD_NAME` - Your Cloudinary cloud name
- `CLOUDINARY_API_KEY` - Your Cloudinary API key
- `CLOUDINARY_API_SECRET` - Your Cloudinary API secret
- `FRONTEND_URL` - Your deployed frontend URL (for CORS)

**Frontend:**
- `VITE_API_BASE_URL` - Your deployed backend URL (e.g., `https://your-backend.onrender.com/api`)

## Features

### Public Landing Page
- **Hero Section**: Eye-catching banner with CTA button
- **Projects Section**: Dynamically fetches and displays projects from the database
- **Happy Clients Section**: Shows client testimonials
- **Contact Form**: Allows users to submit contact information
- **Newsletter Section**: Email subscription functionality

### Admin Dashboard
- **Authentication**: Secure login flow backed by JWT tokens. Credentials are configured via environment variables.
- **Tab-based Interface**: Easy navigation between different admin sections
- **Projects Management**: Add new projects with name, description, and image URL
- **Clients Management**: Add client testimonials with name, designation, and description
- **Contact Submissions**: View all contact form submissions in a table
- **Subscribers**: View newsletter subscriber list with subscription dates

## API Endpoints

### Auth
- `POST /api/auth/login` - Authenticate admin user and receive JWT (requires `ADMIN_EMAIL`/`ADMIN_PASSWORD`)
- `GET /api/auth/me` - Validate current JWT token

### Projects
- `GET /api/projects` - Fetch all projects
- `POST /api/projects` - Create a new project _(requires authentication)_

### Clients
- `GET /api/clients` - Fetch all clients/testimonials
- `POST /api/clients` - Create a new client _(requires authentication)_

### Contacts
- `GET /api/contacts` - Fetch all contact submissions _(requires authentication)_
- `POST /api/contacts` - Submit a contact form

### Subscribers
- `GET /api/subscribers` - Fetch all subscribers _(requires authentication)_
- `POST /api/subscribers` - Subscribe to newsletter

## Technologies Used

**Backend:**
- Express.js - Web framework
- Mongoose - MongoDB ODM
- CORS - Cross-Origin Resource Sharing
- dotenv - Environment variables

**Frontend:**
- React - UI library
- Vite - Build tool and dev server
- Axios - HTTP client for API calls
- CSS3 - Styling

## Code Quality

- **Modular Architecture**: Separated components, routes, and models
- **Error Handling**: Try-catch blocks with meaningful error messages
- **Validation**: Input validation on both client and server sides
- **Responsive Design**: Mobile-friendly CSS with media queries
- **Clean Code**: Clear naming conventions and minimal comments

## Notes

- The application uses placeholder images from `https://via.placeholder.com/` if image URLs fail to load
- Admin access now requires valid credentials. Update `ADMIN_EMAIL` / `ADMIN_PASSWORD` in the backend `.env` file to suit your environment.
- All timestamps are formatted for better readability
- Database connection errors are logged to console with helpful messages

## Future Enhancements

- Authentication and authorization
- Edit/Delete functionality for admin panel
- Image upload instead of URL input
- Search and filter in tables
- Pagination for large datasets
- Email notifications for form submissions
- Category system for projects
