# 🌐  Khatwa-Frontend - Online Learning Management System

This is the frontend for the **Online Learning Management System (LMS)** project, built with **React.js**. It provides an intuitive, responsive user interface for students, instructors, and administrators.

## 🖥️ Features
- 🔐 Google OAuth 2.0 login integration
- 🧑‍🎓 Student Dashboard  
  - Browse and enroll in courses  
  - Track course progress  
  - Submit assignments & complete quizzes
- 🧑‍🏫 Instructor Dashboard  
  - Create & manage courses  
  - Upload content, quizzes, and assignments  
  - Grade student submissions & view analytics
- 🛠 Admin Panel  
  - Manage users  
  - Approve or reject courses  
  - System-wide reports and metrics

## 💻 Tech Stack
- **React.js** (Functional components + Hooks)
- **React Router** for navigation
- **Axios** for API communication
- **JWT** for auth session handling

## 📁 Project Structure
/src
┣ /components
┣ /pages
┣ /services
┣ /context
┣ App.js
┗ index.js

## 🔐 Authentication
- Google OAuth handled via backend token exchange
- Auth context manages login state
- Protected routes with role-based rendering

## 🧭 Navigation
- `/login` – OAuth login
- `/dashboard` – Redirects based on user role
- `/courses/:id` – Course detail page
- `/admin/users` – Admin user management

## 📦 Installation & Setup
1. Clone the repo  
2. Run `npm install`  
3. Set environment variables in `.env`  
4. Run `npm start` to launch locally  

> Make sure the backend is running and CORS is properly configured.

## 🧪 Testing
- Manual tests via browser and backend API
- UI tested on multiple screen sizes for responsiveness

