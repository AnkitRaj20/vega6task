import { Loader } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    if (profilePicture) {
      formData.append("profilePicture", profilePicture);
    }

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/user/register`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      if (data.success) {
        setLoading(false);
        localStorage.setItem("accessToken", data.data.accessToken);
        navigate("/dashboard");
      } else {
        setLoading(false);
        setErrorMsg(data.message || "Registration failed");
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
      setErrorMsg("Something went wrong. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 p-5 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <form onSubmit={handleRegister} encType="multipart/form-data">
            <div className="max-w-md mx-auto">
              <h1 className="text-2xl font-semibold mb-4">Register</h1>

              <div className="space-y-6">
                <div className="relative">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-cyan-600"
                    placeholder="Email address"
                    required
                  />
                  <label
                    htmlFor="email"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Email Address
                  </label>
                </div>

                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-cyan-600"
                    placeholder="Password"
                    required
                  />
                  <label
                    htmlFor="password"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Password
                  </label>
                </div>

                <div className="relative">
                  <input
                    id="profilePicture"
                    name="profilePicture"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setProfilePicture(e.target.files[0])}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0 file:text-sm file:font-semibold
                    file:bg-cyan-50 file:text-cyan-700 hover:file:bg-cyan-100"
                    required
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Upload your profile picture
                  </p>
                </div>

                {errorMsg && <p className="text-red-600 text-sm">{errorMsg}</p>}

                <div className="relative">
                  <button
                    type="submit"
                    className="bg-cyan-500 hover:bg-cyan-600 text-white rounded-md px-4 py-2 transition duration-200 w-full"
                  >
                    {loading ? <Loader /> :"Register"} 
                    
                  </button>
                </div>

                <div>
                  <p className="text-sm text-gray-600">
                    Already have an account?{" "}
                    <a href="/" className="text-cyan-500 hover:underline">
                      Login
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
