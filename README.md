# Task Management Application (MERN Stack)

A simple Task Management application built with MongoDB, Express.js, React, and Node.js.

## Features

- **User Authentication**: Sign up and login with password hashing (bcrypt)
- **Task Management**: Create, read, update, and delete tasks
- **Task Status**: Mark tasks as pending or completed
- **Protected Routes**: JWT-based authentication
- **Responsive Design**: Works on desktop and mobile

## Project Structure

```
intelligencextask1/
├── backend/                 # Node.js + Express backend
│   ├── controllers/         # Route controllers
│   │   ├── authController.js
│   │   └── taskController.js
│   ├── middleware/          # Custom middleware
│   │   └── authMiddleware.js
│   ├── models/              # Mongoose models
│   │   ├── Task.js
│   │   └── User.js
│   ├── routes/              # API routes
│   │   ├── authRoutes.js
│   │   └── taskRoutes.js
│   ├── .env                 # Environment variables
│   ├── package.json
│   └── server.js            # Entry point
│
└── frontend/                # React frontend
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/      # Reusable components
    │   │   ├── Navbar.jsx
    │   │   ├── TaskForm.jsx
    │   │   ├── TaskItem.jsx
    │   │   └── TaskList.jsx
    │   ├── context/         # React context
    │   │   └── AuthContext.jsx
    │   ├── pages/           # Page components
    │   │   ├── Dashboard.jsx
    │   │   ├── Login.jsx
    │   │   └── Signup.jsx
    │   ├── services/        # API services
    │   │   └── api.js
    │   ├── App.jsx
    │   ├── App.css
    │   ├── index.jsx
    │   └── index.css
    └── package.json
```

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account (or local MongoDB)

## Installation & Setup

### Backend Setup

1. Navigate to the backend folder:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file (already included) with:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

4. Start the backend server:
   ```bash
   npm run dev
   ```
   The server will run on `http://localhost:5000`

### Frontend Setup

1. Open a new terminal and navigate to the frontend folder:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the React development server:
   ```bash
   npm start
   ```
   The app will open in your browser at `http://localhost:3000`

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | Register a new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/profile` | Get user profile (protected) |

### Tasks (All Protected)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/tasks` | Create a new task |
| GET | `/api/tasks` | Get all tasks for user |
| GET | `/api/tasks/:id` | Get a single task |
| PUT | `/api/tasks/:id` | Update a task |
| DELETE | `/api/tasks/:id` | Delete a task |

## Task Model

```javascript
{
  title: String (required),
  description: String (optional),
  status: 'pending' | 'completed',
  user: ObjectId (reference to User),
  createdAt: Date
}
```

## User Model

```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  createdAt: Date
}
```

## Technologies Used

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT authentication
- **cors** - Cross-origin resource sharing
- **dotenv** - Environment variables

### Frontend
- **React** - UI library
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client
- **CSS** - Styling

## Usage

1. **Sign Up**: Create a new account with name, email, and password
2. **Login**: Use your credentials to log in
3. **Add Task**: Click "Add Task" and fill in the form
4. **View Tasks**: See all your tasks on the dashboard
5. **Complete Task**: Click "Complete" to mark a task as done
6. **Edit Task**: Click "Edit" to modify a task
7. **Delete Task**: Click "Delete" to remove a task

## License

MIT