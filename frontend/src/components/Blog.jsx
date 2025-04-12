import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const fetchBlogs = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) return;

    try {
      const res = await fetch(
        `http://localhost:8080/api/v1/blog?page=${page}&limit=${limit}&search=${search}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (res.ok) {
        setBlogs(data.data.blogs);
        setTotalPages(data.data.pagination.totalPages);
      } else {
        console.error("Error:", data.message);
      }
    } catch (err) {
      console.error("Error fetching blogs:", err);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [page, limit, search]);

  const handleDelete = async (id) => {
    const token = localStorage.getItem("accessToken");
    if (!token) return;

    try {
      const res = await fetch(`http://localhost:8080/api/v1/blog/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (res.ok) {
        setBlogs(blogs.filter((blog) => blog._id !== id));
      } else {
        console.error("Error:", data.message);
        alert(data.message);
      }
    } catch (err) {
      console.error("Error deleting blog:", err);
    }
  };

  return (
    <>
      <div className="fixed top-0 w-full z-10">
        <Navbar />
      </div>

      <div className="mt-24 px-4">
        {/* Top Controls */}
        <div className="flex justify-between items-center mb-4">
          {/* Search input */}
          <input
            type="text"
            placeholder="Search blogs..."
            value={search}
            onChange={(e) => {
              setPage(1);
              setSearch(e.target.value);
            }}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />

          {/* Limit dropdown */}
          <select
            value={limit}
            onChange={(e) => {
              setPage(1);
              setLimit(Number(e.target.value));
            }}
            className="px-4 py-2 border border-gray-300 rounded-md"
          >
            <option value={1}>1 per page</option>
            <option value={2}>2 per page</option>
            <option value={5}>5 per page</option>
            <option value={10}>10 per page</option>
            <option value={20}>20 per page</option>
            <option value={50}>50 per page</option>
          </select>
        </div>

        {/* Blog Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Image
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {blogs.map((blog) => (
                <tr key={blog._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {blog.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img
                      src={blog.image}
                      alt="Blog"
                      className="w-20 h-20 rounded-full border-4 border-cyan-500 shadow-lg"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {blog.description.length >  30 ? `${blog.description.slice(0,29)}...` : blog.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm space-x-3">
                    <button
                      className="text-blue-600 hover:underline"
                      onClick={() => navigate(`/view-blog/${blog._id}`)}
                    >
                      View
                    </button>
                    {blog.owner && (
                      <button
                        className="text-yellow-600 hover:underline"
                        onClick={() => navigate(`/edit-blog/${blog._id}`)}
                      >
                        Edit
                      </button>
                    )}
                    {blog.owner && (
                      <button
                        onClick={() => handleDelete(blog._id)}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center items-center mt-6 space-x-4">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-cyan-500 text-white rounded hover:bg-cyan-600 disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-gray-700 font-semibold">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            className="px-4 py-2 bg-cyan-500 text-white rounded hover:bg-cyan-600 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default Blog;
