# Taskly - MERN Stack Task Management Application

## Overview

Taskly is a modern full-stack task management application built using the MERN Stack (MongoDB, Express.js, React.js, and Node.js). The application enables users to efficiently manage their daily tasks through a clean and responsive interface.

Users can create accounts, securely log in, organize tasks, update task progress, edit task details, and delete completed or unnecessary tasks. The application provides real-time task management capabilities with a modern user experience and secure authentication.

---

## Features

### User Authentication

* User Registration
* User Login
* Secure JWT Authentication
* Protected Dashboard Access
* Logout Functionality

### Task Management

* Create New Tasks
* View All Tasks
* Edit Existing Tasks
* Delete Tasks
* Update Task Status

  * Pending
  * In Progress
  * Completed

### Dashboard Analytics

* Total Tasks Counter
* Pending Tasks Counter
* In Progress Tasks Counter
* Completed Tasks Counter
* Completion Rate Visualization

### User Interface

* Modern Responsive Design
* Professional Dark Theme
* Interactive Toast Notifications
* Glassmorphism Inspired UI
* Mobile Friendly Layout

---

## Technology Stack

### Frontend

* React.js
* Vite
* Axios
* React Router DOM
* Tailwind CSS
* Lucide React Icons
* React Toastify

### Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JWT Authentication
* Bcrypt.js
* CORS

### Deployment

* Frontend: Vercel
* Backend: Render
* Database: MongoDB Atlas

---

## Project Structure

TASK

├── backend

│ ├── controllers

│ ├── models

│ ├── routes

│ ├── middleware

│ ├── server.js

│ └── package.json

│

├── frontend

│ ├── src

│ ├── public

│ ├── vite.config.js

│ └── package.json

│

└── README.md

---

## Installation

### Clone Repository

```bash
git clone https://github.com/your-github-zenku663-svg/Taskly-mern.git
```

### Backend Setup

```bash
cd backend
npm install
```

Create a .env file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Run backend:

```bash
npm start
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## Future Enhancements

* Task Categories
* Due Dates & Reminders
* Email Notifications
* Team Collaboration
* File Attachments
* Activity Tracking
* Dark/Light Theme Toggle

---

## Learning Outcomes

This project helped in understanding:

* Full Stack Development
* REST API Development
* JWT Authentication
* MongoDB Database Management
* MERN Stack Architecture
* Frontend and Backend Deployment
* Version Control using Git and GitHub

---

## Author

Developed as part of a MERN Stack Internship Project.

Taskly demonstrates practical implementation of modern web development technologies and full-stack application deployment.
