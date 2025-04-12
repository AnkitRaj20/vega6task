import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";

const Dashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) return;

      try {
        const res = await fetch(`${import.meta.env.VITE_BASE_URL}/user`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (res.ok) {
          setUser(data.data);
        } else {
          console.error("Error:", data.message);
        }
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };

    fetchUser();
  }, []);

  return (
    <>
      <div className="fixed top-0 w-full z-10">
        <Navbar />
      </div>
      <div className="min-h-screen mt-20 bg-gray-100 p-6 flex items-start justify-between">
        <div className="text-left">
          <p className="text-gray-700">Welcome {user?.email}!</p>
        </div>

        {user && (
          <div className="ml-auto">
            <img
              src={user.profilePicture}
              alt="Profile"
              className="w-24 h-24 rounded-full border-4 border-cyan-500 shadow-lg"
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;
