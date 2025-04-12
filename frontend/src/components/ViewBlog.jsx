import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ViewBlog = () => {
  const { id } = useParams(); // blog ID from route
  const [blog, setBlog] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlog = async () => {
      const token = localStorage.getItem("accessToken");
      const res = await fetch(`http://localhost:8080/api/v1/blog/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (res.ok) {
        setBlog(data.data);
      } else {
        console.error("Failed to fetch blog");
        navigate("/blog");
      }
    };

    fetchBlog();
  }, [id, navigate]);

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6 flex justify-center">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-3xl p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{blog.title}</h1>

        <div className="mb-6">
          <img
            src={blog.image}
            alt="Blog"
            className="w-full max-h-[400px] object-fit rounded-xl border border-gray-200 shadow"
          />
        </div>

        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 md:p-8 max-w-full w-full overflow-hidden">
          <div className="text-gray-700 text-base sm:text-lg leading-relaxed whitespace-pre-line break-words">
            {blog.description}
          </div>
        </div>

        <div className="mt-8 text-sm text-gray-500">
          <p>
            <strong>Author:</strong> {blog.author?.email || "Unknown"}
          </p>
          <p>
            <strong>Created:</strong>{" "}
            {new Date(blog.createdAt).toLocaleDateString()}
          </p>
        </div>

        <div className="mt-6">
          <button
            onClick={() => navigate("/blog")}
            className="bg-cyan-600 text-white px-5 py-2 rounded-lg hover:bg-cyan-700 transition"
          >
            Back to Blogs
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewBlog;
