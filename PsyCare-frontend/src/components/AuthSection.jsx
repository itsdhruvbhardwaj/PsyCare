// ...existing code...
import React, { useState } from "react";
import DashboardLoading from "./DashboardLoading.jsx";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext.jsx";

const AuthSection = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState("😊");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "",
  });

  const avatars = [
    "😊", "😇", "🐻", "😉", "🌸", "⭐", "🥸", "🌙", "🌻", "🦋", "🍃",
    "🚀", "❤️", "⚡", "🎉", "🐱", "🍀", "🌟",
  ];

  // Hindi funny names in English words
  const hindiFunnyNames = [
    "Chota Packet",
    "Nautanki King",
    "Drama Queen",
    "Bindaas Bandaa",
    "Mast Maula",
    "Jhakaas Jodi",
    "Golmaal Guru",
    "Fultoo Filmy",
    "Tension Ka The End",
    "Jugaadu",
    "Chatpata Chaat",
    "Dabangg Dude",
    "Baklol",
    "Pataka Girl",
    "Chill Pill",
    "Hawa Hawai",
    "Gupshup Guru",
    "Masti Machine",
    "Lafanga",
    "Jolly Joker"
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const [loading, setLoading] = useState(false);
  const [showDashboardLoading, setShowDashboardLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { setUser } = useUser();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      let res, data;
      if (isSignUp) {
        res = await fetch("http://localhost:8080/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.fullName,
            email: formData.email,
            password: formData.password,
            mobile: formData.mobile,
            role: "student", // Default role
            avatar: selectedAvatar,
          }),
        });
      } else {
        res = await fetch("http://localhost:8080/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        });
      }
      const text = await res.text();
      data = text ? JSON.parse(text) : {};
      if (!res.ok) throw new Error(data.message || "Request failed");
      setSuccess(data.message || (isSignUp ? "Signup successful!" : "Login successful!"));
      if (isSignUp) {
        // After signup, redirect to login page
        setTimeout(() => {
          setIsSignUp(false);
        }, 1500);
        return;
      }
      if (data.token && data.user) {
        // Assign a random funny name if not present (for simple login)
        if (!data.user.funnyName) {
          const randomName = hindiFunnyNames[Math.floor(Math.random() * hindiFunnyNames.length)];
          data.user.funnyName = randomName;
        }
        // Assign a random avatar if not present
        if (!data.user.avatar) {
          const randomAvatar = avatars[Math.floor(Math.random() * avatars.length)];
          data.user.avatar = randomAvatar;
        }
        localStorage.setItem("token", data.token);
        setUser(data.user); // Update context for live navbar update
        setShowDashboardLoading(true);
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (showDashboardLoading) {
    return <DashboardLoading />;
  }
  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#ebe1fc] to-[#dbf0ff] pt-14 pb-8">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold text-[#22223b] mb-2">
          Join the PsyCare Community
        </h1>
        <p className="text-lg md:text-xl text-[#67687e] font-medium">
          Create your account and start your mental wellness journey today
        </p>
      </div>

      {/* Card */}
      <div className="flex justify-center">
        <div className="bg-white rounded-3xl shadow-lg max-w-xl w-full p-10">
          {/* Toggle Buttons */}
          <div className="flex mb-6 bg-gray-100 rounded-xl p-1">
            <button
              className={`flex-1 py-2 rounded-l-xl font-semibold transition-all ${
                isSignUp
                  ? "bg-[#f8f7fc] text-[#58595e] shadow-inner"
                  : "bg-gray-200 text-gray-400"
              }`}
              onClick={() => setIsSignUp(true)}
            >
              Sign Up
            </button>
            <button
              className={`flex-1 py-2 rounded-r-xl font-semibold transition-all ${
                !isSignUp
                  ? "bg-[#f8f7fc] text-[#58595e] shadow-inner"
                  : "bg-gray-200 text-gray-400"
              }`}
              onClick={() => setIsSignUp(false)}
            >
              Login
            </button>
          </div>

          {/* Avatar Selection */}
          {isSignUp && (
            <div className="mb-6">
              <h6 className="mb-3 font-semibold text-gray-700">Choose Your Avatar</h6>
              <div className="flex flex-wrap justify-center">
                {avatars.map((avatar, index) => (
                  <div
                    key={index}
                    className={`w-12 h-12 flex items-center justify-center rounded-xl cursor-pointer text-xl m-1 transition-all ${
                      selectedAvatar === avatar
                        ? "border-2 border-[#a682e3] bg-[#f7f6ff] shadow-[0_0_0_4px_#ede8ff]"
                        : "border-2 border-gray-200 bg-white"
                    }`}
                    onClick={() => setSelectedAvatar(avatar)}
                  >
                    {avatar}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {error && (
              <div className="mb-4 text-red-500 font-semibold text-center">{error}</div>
            )}
            {success && (
              <div className="mb-4 text-green-600 font-semibold text-center">{success}</div>
            )}
            {isSignUp && (
              <div className="mb-4 relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  👤
                </span>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-4 py-3 rounded-lg bg-[#f7f6ff] border border-[#eeebfa] text-gray-700 font-medium focus:ring-2 focus:ring-[#a682e3] outline-none"
                />
              </div>
            )}

            <div className="mb-4 relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                ✉️
              </span>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full pl-12 pr-4 py-3 rounded-lg bg-[#f7f6ff] border border-[#eeebfa] text-gray-700 font-medium focus:ring-2 focus:ring-[#a682e3] outline-none"
              />
            </div>

            <div className="mb-6 relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                🔒
              </span>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full pl-12 pr-12 py-3 rounded-lg bg-[#f7f6ff] border border-[#eeebfa] text-gray-700 font-medium focus:ring-2 focus:ring-[#a682e3] outline-none"
              />
              <button
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-lg"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
            {isSignUp && (
              <div className="mb-4">
                <div className="relative flex items-center">
                  <span className="absolute left-4 text-gray-400 flex items-center h-full">📱</span>
                  <input
                    type="tel"
                    name="mobile"
                    placeholder="Mobile Number"
                    value={formData.mobile || ""}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-3 rounded-lg bg-[#f7f6ff] border border-[#eeebfa] text-gray-700 font-medium focus:ring-2 focus:ring-[#a682e3] outline-none"
                    required
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-2 text-left">This number will not be shared. It will only be used to contact you if you feel depressed.</p>
              </div>
            )}


            <button
              type="submit"
              className="w-full py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-[#aa85ff] to-[#67c7fc] shadow-md hover:shadow-lg transition"
              disabled={loading}
            >
              {loading ? (isSignUp ? "Signing Up..." : "Logging In...") : (isSignUp ? "Create Account" : "Login")}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 text-center">
            <span className="text-gray-400 text-sm font-medium">OR CONTINUE WITH</span>
          </div>

{/* Google Login button without role selection */}
<div className="flex justify-center mb-6">
  <button
    type="button"
    className="flex items-center gap-2 border border-gray-200 rounded-lg px-6 py-2 text-lg font-semibold text-[#302aa2] bg-white hover:bg-gray-50 transition"
    onClick={() => {
      // Directly redirect to Google login, no role selection
      window.location.href = `http://localhost:8080/api/auth/google`;
    }}
  >
    <svg width="20" height="20" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
    Google
  </button>
</div>

          {/* Terms */}
          <div className="text-center text-gray-500 text-sm font-medium">
            By creating an account, you agree to our{" "}
            <a href="#" className="text-[#a682e3] underline font-semibold">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-[#a682e3] underline font-semibold">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};


export default AuthSection;
