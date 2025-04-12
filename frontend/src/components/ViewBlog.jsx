import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const ViewBlog = () => {
  const { id } = useParams(); // blog ID from route
  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [editCommentId, setEditCommentId] = useState(null);
  const [replyTo, setReplyTo] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("accessToken");

  // Fetch Blog
  useEffect(() => {
    const fetchBlog = async () => {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/blog/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) setBlog(data.data);
      else navigate("/blog");
    };
    fetchBlog();
  }, [id, navigate, token]);

  // Fetch Comments
  const fetchComments = async () => {
    const res = await fetch(`${import.meta.env.VITE_BASE_URL}/comment/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (res.ok) setComments(data.data);
  };

  useEffect(() => {
    fetchComments();
  }, [id]);

  // Create or Edit Comment
  const handleSubmitComment = async () => {
    if (!newComment.trim()) return;

    const method = editCommentId ? "PUT" : "POST";
    const url = editCommentId
      ? `${import.meta.env.VITE_BASE_URL}/comment/${editCommentId}`
      : `${import.meta.env.VITE_BASE_URL}/comment`;

    const body = {
      content: newComment,
      blogId: id,
      ...(replyTo && { parentComment: replyTo }),
    };

    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      setNewComment("");
      setEditCommentId(null);
      setReplyTo(null);
      fetchComments();
    } else {
      const data = await res.json();
      console.error("Error:", data.message);
      alert(data.message);
    }
  };

  // Delete Comment
  const handleDelete = async (commentId) => {
    const confirm = window.confirm("Are you sure you want to delete?");
    if (!confirm) return;

    const res = await fetch(
      `${import.meta.env.VITE_BASE_URL}/comment/${commentId}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (res.ok) {
      fetchComments();
    }
  };

  // Render comments recursively
  const renderComments = (commentList, level = 0) => {
    return commentList.map((comment) => (
      <div
        key={comment._id}
        style={{ marginLeft: level * 20 }}
        className="mb-4 border-l pl-4"
      >
        <p className="text-gray-800">{comment.content}</p>
        <p className="text-gray-500 text-xs">
          By {comment.createdBy?.email || "Unknown"} on{" "}
          {new Date(comment.createdAt).toLocaleDateString()}
        </p>

        <div className="flex gap-3 mt-1 text-sm text-blue-600">
          <button
            onClick={() => {
              setReplyTo(comment._id);
              setNewComment("");
              setEditCommentId(null);
            }}
          >
            Reply
          </button>
          {comment.owner && (
            <button
              onClick={() => {
                setNewComment(comment.content);
                setEditCommentId(comment._id);
                setReplyTo(null);
              }}
            >
              Edit
            </button>
          )}

          {comment.owner && (
            <button onClick={() => handleDelete(comment._id)}>Delete</button>
          )}
        </div>

        {comment.replies && comment.replies.length > 0 && (
          <div>{renderComments(comment.replies, level + 1)}</div>
        )}
      </div>
    ));
  };

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading...
      </div>
    );
  }

  return (
    <>
      <div className="z-10">
        <Navbar />
      </div>

      <div className="min-h-screen bg-gray-50 py-10 px-6 flex justify-center">
        <div className="bg-white shadow-xl rounded-2xl w-full max-w-3xl p-8">
          <h1 className="sm:text-3xl text-lg font-bold text-gray-800 mb-4">
            {blog.title}
          </h1>

          <img
            src={blog.image}
            alt="Blog"
            className="w-full max-h-[400px] object-fill rounded-xl mb-6"
          />

          <div className="w-full max-w-64 sm:max-w-full overflow-hidden">
            
              <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed whitespace-pre-line break-words">
              <strong>Content:</strong> <br /> {blog.description}
              </p>
            
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

          {/* Comment Section */}
          <div className="mt-10">
            <h2 className="text-xl font-semibold mb-2">Comments</h2>

            <div className="mb-4">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder={
                  replyTo
                    ? "Replying to a comment..."
                    : editCommentId
                      ? "Editing comment..."
                      : "Write a comment"
                }
                className="w-full border rounded-md p-2"
                rows="3"
              />
              <div className="mt-2 flex gap-3">
                <button
                  onClick={handleSubmitComment}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  {editCommentId ? "Update" : "Post"}
                </button>
                {(replyTo || editCommentId) && (
                  <button
                    onClick={() => {
                      setReplyTo(null);
                      setEditCommentId(null);
                      setNewComment("");
                    }}
                    className="text-sm text-gray-600"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>

            {comments.length > 0 ? (
              renderComments(comments)
            ) : (
              <p className="text-gray-500">No comments yet.</p>
            )}
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
    </>
  );
};

export default ViewBlog;
