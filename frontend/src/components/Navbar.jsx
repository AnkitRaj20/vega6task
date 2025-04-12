import { LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/user/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      const data = await res.json();

      if (data.success) {
        localStorage.removeItem("accessToken");
        navigate("/");
      } else {
        console.error("Logout failed:", data.message);
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 flex justify-between items-center p-4 bg-white/30 dark:bg-gray-800/30 backdrop-blur-lg border border-white/20 dark:border-gray-700/20 shadow-md">
      <Link to="/dashboard" className="sm:text-2xl text-md font-semibold text-black dark:text-white tracking-wider" style={{ fontFamily: "Pacifico, cursive" }}>
        Dashboard
      </Link>
      <div>
        {/* <Link to="/dashboard" className="text-black dark:text-white hover:text-gray-700 dark:hover:text-gray-300 transition-colors mr-4">
          Dashboard
        </Link> */}
        <Link to="/blog" className="text-black dark:text-white hover:text-gray-700 dark:hover:text-gray-300 transition-colors mr-4">
          Blog
        </Link>
        <Link to="/add-blog" className="text-black dark:text-white hover:text-gray-700 dark:hover:text-gray-300 transition-colors mr-4">
          Add Blog
        </Link>
      <button
        onClick={handleLogout}
        title="Logout"
        className="p-2 rounded-full text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
      >
        <LogOut />
      </button>
      </div>
      
    </nav>
  );
};

export default Navbar;
