📚 Personal Book Manager — MERN Stack (React + Express + MongoDB)

A clean, minimal, and intuitive personal library management app.
Users can track books, manage reading status, filter by tags, and get dashboard insights about their reading habits.

This project is built as part of the Thumbstack MERN Developer Assignment.

🚀 Live Demo

Frontend (Vercel): https://book-manager-xi.vercel.app

Backend (Render): https://book-manager-9mew.onrender.com/

📌 Features
🔐 Authentication

Signup, Login

JWT-based authentication

Protected API routes

📚 Book Management

Add books with title, author, tags, and reading status

Edit book details

Delete books

Update reading status

Responsive book cards UI

🔎 Filtering

Filter books by status

Filter by tags

Combined filters supported

📊 Dashboard Insights

Total books

Want to Read count

Reading count

Completed count

Data refreshed dynamically

💅 UI / UX

Clean responsive UI using Bootstrap

Dashboard grid layout

Accordion-based add book form

Book cards with placeholder covers

Smooth UX interactions

🛠️ Tech Stack
Frontend

React (Vite)

React Router

Bootstrap 5

Fetch-based API client

Backend

Node.js + Express

MongoDB Atlas + Mongoose

JWT authentication

bcrypt password hashing

Deployment

Frontend → Vercel

Backend → Render

Database → MongoDB Atlas

📁 Folder Structure
personal-book-manager/
│
├── client/                     # React frontend
│   ├── src/
│   │   ├── pages/             # Login, Signup, Dashboard
│   │   ├── components/        # BookItem, AddBookForm, Filters, Navbar
│   │   ├── api.js             # API wrapper
│   │   ├── auth.js            # JWT utilities
│   │   ├── main.jsx
│   │   └── App.jsx
│   ├── index.html
│   └── vite.config.js
│
├── server/                     # Node/Express backend
│   ├── models/                # User, Book schemas
│   ├── routes/                # auth.js, books.js, dashboard.js
│   ├── middleware/            # JWT auth middleware
│   ├── lib/                   # DB connection helper
│   └── index.js               # Server entry point
│
└── README.md

🔧 Environment Variables
Frontend (client/.env)
VITE_API_BASE_URL= https://book-manager-9mew.onrender.com/api

Backend (server/.env)
PORT=10000
MONGODB_URI=my_mongodb_atlas_uri
JWT_SECRET=your_jwt_secret


A .env.example file should be included in the repository.

🔌 API Endpoints
Auth
Method	Endpoint	Description
POST	/api/auth/signup	
Register user
POST	/api/auth/login	
Login user
Books
Method	Endpoint	Description
GET	/api/books	Fetch all books
POST	/api/books	Add new book
GET	/api/books/:id	Get book by ID
PUT	/api/books/:id	Update book
DELETE	/api/books/:id	Delete book

Supports filters:
/api/books?status=reading&tag=fiction

Dashboard
Method	Endpoint	Description
GET	/api/dashboard	Returns reading stats summary

▶️ Running Locally
Frontend
cd client
npm install
npm run dev

Backend
cd server
npm install
npm run dev

🚀 Deployment Instructions
Frontend (Vercel)

Select client folder as project root

Build Command: npm run build

Output Directory: dist

Add Env variable:

VITE_API_BASE_URL= https://book-manager-9mew.onrender.com/
backend- render

🧪 Testing Checklist

 Signup works

 Login works

 Dashboard loads with stats

 Add book works

 Edit book works

 Delete book works

 Filters work

 Status updates reflect in dashboard stats

 Refresh on /dashboard loads without 404 (Vercel rewrite added)

📌 Notes

Client-side routing requires vercel.json rewrite rule

All protected routes require JWT in Authorization: Bearer <token> header

Mongoose models enforce minimal validation (kept simple on purpose)

📄 License

This assignment is built solely for recruitment evaluation purposes.
