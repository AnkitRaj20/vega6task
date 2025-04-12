import React, { useState } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import { Loader } from "lucide-react";

const BlogForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image);

    // You can replace this fetch call with your API logic
    fetch(`${import.meta.env.VITE_BASE_URL}/blog`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: formData,
    })
      .then((res) => res.json())
      .then(() => {
        navigate("/blog");
        setLoading(false);
      })
      .catch((err) => {
        console.error("Submission failed:", err);
        setLoading(false);
      });
  };

  return (
    <>
      <div className="fixed top-0 w-full z-10">
        <Navbar />
      </div>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
        <div className="bg-white shadow-xl rounded-2xl w-full max-w-2xl p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Create New Blog
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Blog Title
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="Enter blog title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Blog Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                         file:rounded-md file:border-0 file:text-sm file:font-semibold
                         file:bg-cyan-50 file:text-cyan-700 hover:file:bg-cyan-100"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Blog Description
              </label>
              <textarea
                rows="5"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="Write your blog description..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
            </div>

            <div>
              <button
                type="submit"
                className="bg-cyan-600 text-white px-6 py-2 rounded-lg hover:bg-cyan-700 transition duration-200 shadow"
              >
                {loading ? <Loader /> : "Submit Blog"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default BlogForm;
