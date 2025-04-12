# MERN Blog App with Authentication and CRUD Functionality

This is a full-stack blog management application built with the **MERN Stack (MongoDB, Express.js, React.js, Node.js)** that includes user authentication with **JWT**, image uploads, and complete **CRUD functionality for blogs**.

---

## 🚀 Features

### 🔐 Authentication

- **Sign Up Page**
  - Form with fields: `Email`, `Password`, and `Profile Image Upload`
  - Validates inputs and stores user data securely in MongoDB with password hashing.
  
- **Login Page**
  - Login using email and password.
  - On successful login, a **JWT token** is generated and stored locally.
  - Redirects authenticated users to the **Dashboard**.

---

### 🏠 Dashboard Page

- Displays the **logged-in user's profile image** on the top-right corner.
- Provides navigation to view and manage blogs.

---

### 📄 Blog Management (CRUD)

#### ➕ Create Blog
- Form with fields:
  - `Blog Title`
  - `Blog Image`
  - `Blog Description`
- Validates and stores blog data in the database.

#### 📃 Read Blogs
- Displays a **paginated and searchable table** of blogs with:
  - Blog Title
  - Blog Image
  - Short Description
  - Action Buttons: `View`, `Edit`, `Delete`
  
#### ✏️ Update Blog
- Allows users to **edit blog content** through a form.
- Updates are saved back to the database.

#### ❌ Delete Blog
- Deletes a selected blog with a confirmation prompt.
- Only the blog creator is authorized to delete their blogs.

#### 👁️ View Blog
- Each blog has a `View` button to display its full content on a dedicated page.

---

## 🛡️ Authorization

- **Protected Routes**:
  - Routes like `/dashboard`, `/blog`, `/add-blog`, `/edit-blog/:id`, and `/view-blog/:id` are protected.
  - Only authenticated users can access them using a **JWT-based Protected Route setup**.

- **Blog Ownership**:
  - Users can only edit or delete blogs they have created.
  - This is verified both on the frontend and backend.

---

## 📦 Technologies Used

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Mongoose
- **Auth**: JWT, bcrypt
- **Image Upload**: Multer

---
