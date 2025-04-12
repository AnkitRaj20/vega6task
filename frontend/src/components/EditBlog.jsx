import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditBlog = () => {
  const { id } = useParams(); // blog ID from URL
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [existingImage, setExistingImage] = useState("");
  const [newImage, setNewImage] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      const token = localStorage.getItem("accessToken");
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/blog/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        setTitle(data.data.title);
        setDescription(data.data.description);
        setExistingImage(data.data.image);
      } else {
        console.error("Failed to fetch blog");
      }
    };

    fetchBlog();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (newImage) formData.append("image", newImage);

    const res = await fetch(`${import.meta.env.VITE_BASE_URL}/blog/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: formData,
    });

    const data = await res.json();
    if (res.ok) {
      navigate("/blog");
    } else {
      console.error("Update failed", data.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-2xl p-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Edit Blog</h2>
        <form onSubmit={handleUpdate} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Blog Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Existing Blog Image
            </label>
            {existingImage && (
              <img
                src={existingImage}
                alt="Current"
                className="w-32 h-32 rounded-lg border shadow-md mb-2"
              />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setNewImage(e.target.files[0])}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                         file:rounded-md file:border-0 file:text-sm file:font-semibold
                         file:bg-cyan-50 file:text-cyan-700 hover:file:bg-cyan-100"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Blog Description
            </label>
            <textarea
              rows="5"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500"
              required
            ></textarea>
          </div>

          <div>
            <button
              type="submit"
              className="bg-cyan-600 text-white px-6 py-2 rounded-lg hover:bg-cyan-700 transition duration-200 shadow"
            >
              Update Blog
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBlog;
