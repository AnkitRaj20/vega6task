import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Register from "./components/Register";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import EditBlog from "./components/EditBlog";
import ViewBlog from "./components/ViewBlog";
import ProtectedRoute from "./components/ProtectedRoute"; // Import it

function App() {
  return (
    <Router>
      <div className="flex">
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/blog"
              element={
                <ProtectedRoute>
                  <Blog />
                </ProtectedRoute>
              }
            />
            <Route
              path="/add-blog"
              element={
                <ProtectedRoute>
                  <BlogForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/edit-blog/:id"
              element={
                <ProtectedRoute>
                  <EditBlog />
                </ProtectedRoute>
              }
            />
            <Route
              path="/view-blog/:id"
              element={
                <ProtectedRoute>
                  <ViewBlog />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
