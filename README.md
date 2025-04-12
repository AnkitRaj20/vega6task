# MERN Blog App with Authentication and CRUD Functionality

This is a full-stack blog management application built with the **MERN Stack (MongoDB, Express.js, React.js, Node.js)**. The app supports user authentication using **JWT**, image uploads, and complete **CRUD functionality for blogs**, with comment and reply support.

---

# Steps To Run Backend

```
  cd backend
  npm install
  npm run dev
```
if .env is missing then copy it from .env.sample file

# Steps To Run Frontend

```
  cd frontend
  npm install
  npm run dev
```
if .env is missing then copy it from .env.sample file

## 🚀 Features

### 🔐 Authentication

**Sign Up Page**

- Located at `/frontend/components/SignUp.jsx`
- Form with fields: `Email`, `Password`, and `Profile Image Upload`
- Validates input and stores user data in MongoDB with password hashing

**Login Page**

- Located at `/frontend/components/Login.jsx`
- Login using email and password
- Generates a **JWT token** upon successful login and stores it in localStorage
- Redirects authenticated users to the **Dashboard**

---

### 🏠 Dashboard Page

- Displays the **logged-in user's profile image** on the top-right corner
- Accessible at `/frontend/components/Dashboard.jsx`
- Provides navigation to create, view, edit, and delete blogs

---

### 📄 Blog Management (CRUD)

#### ➕ Create Blog

- Form with fields: `Blog Title`, `Blog Image`, and `Blog Description`
- Validates inputs and stores blog data
- Located at `/frontend/components/AddBlog.jsx`

#### 📃 Read Blogs

- Displays a searchable and paginated table of blogs with:
  - Blog Title
  - Blog Image
  - Short Description
  - Action Buttons: `View`, `Edit`, `Delete`
- Implemented in `/frontend/components/BlogList.jsx`

#### ✏️ Update Blog

- Editable form to update blog fields
- Saves updates to MongoDB
- Located at `/frontend/components/EditBlog.jsx`

#### ❌ Delete Blog

- Deletes a blog after user confirmation
- Only creators can delete their own blogs

#### 👁️ View Blog

- Dedicated view page to display full blog content
- Allows comment interactions
- Located at `/frontend/components/ViewBlog.jsx`

---

### 🔒 Authorization

- **Protected Routes**: Pages like `/dashboard`, `/add-blog`, `/edit-blog/:id`, and `/view-blog/:id` require a valid JWT token
- **Blog Ownership**: Users can only edit or delete their own blogs, verified on both frontend and backend

---

### 💬 Comment & Reply System (Optional)

- Users can leave comments and replies on each blog
- Supports nested replies with full CRUD
- Comments are associated with each blog and stored in MongoDB
- Implemented in `ViewBlog.jsx`

---

## 📆 Project Structure

```
root
│
├── frontend/                  # React Frontend              
│   ├── components/            
│   └── App.jsx                # Main entry file
│
└── backend/                       # Node.js/Express Backend
    ├── src/  
        ├── controllers/       # Controllers for auth, blog, comment
        ├── models/            # Mongoose models
        ├── routes/            # Express routes
        ├── middleware/        # Auth middleware
        └── index.js           # Entry point
```

---

## 📆 Tech Stack

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Mongoose
- **Auth**: JWT, bcrypt
- **Image Upload**: Multer

---
