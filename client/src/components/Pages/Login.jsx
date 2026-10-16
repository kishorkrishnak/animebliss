import React, { useState } from "react";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Navbar from "../Sections/Navbar";
import { saveUserProfile } from "../../services/storage";
import toast, { Toaster } from "react-hot-toast";
import "./Login.css";

const AVATAR_OPTIONS = [
  "https://api.dicebear.com/7.x/adventurer/svg?seed=Gojo",
  "https://api.dicebear.com/7.x/adventurer/svg?seed=Luffy",
  "https://api.dicebear.com/7.x/adventurer/svg?seed=Zoro",
  "https://api.dicebear.com/7.x/adventurer/svg?seed=Naruto",
  "https://api.dicebear.com/7.x/adventurer/svg?seed=Tanjiro",
];

const Login = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState(AVATAR_OPTIONS[0]);

  const handleSignIn = (e) => {
    e.preventDefault();
    const finalName = username.trim() || "AnimeFan";

    const profile = {
      isLoggedIn: true,
      name: finalName,
      email: `${finalName.toLowerCase()}@animebliss.tv`,
      avatar: selectedAvatar,
    };

    saveUserProfile(profile);
    if (setIsLoggedIn) setIsLoggedIn(true);
    toast.success(`Welcome back, ${finalName}!`);
    setTimeout(() => {
      navigate("/");
    }, 600);
  };

  return (
    <div className="auth-page-root">
      <Navbar />
      <Toaster position="top-right" />

      <div className="auth-wrapper">
        <div className="auth-card glass-panel">
          <div className="auth-header">
            <h1 className="auth-title">
              Welcome to <span className="title-accent">AnimeBliss</span>
            </h1>
            <p className="auth-desc">Sign in to sync your watchlist and streaming progress.</p>
          </div>

          {/* Avatar Selector */}
          <div className="avatar-select-section">
            <label className="input-label">Choose Your Avatar</label>
            <div className="avatar-options-row">
              {AVATAR_OPTIONS.map((url, i) => (
                <img
                  key={i}
                  src={url}
                  alt={`Avatar ${i}`}
                  className={`avatar-option ${selectedAvatar === url ? "selected" : ""}`}
                  onClick={() => setSelectedAvatar(url)}
                />
              ))}
            </div>
          </div>

          <form className="auth-form" onSubmit={handleSignIn}>
            <div className="form-group">
              <label className="input-label">Username</label>
              <div className="input-field-wrapper">
                <UserOutlined className="input-icon" />
                <input
                  type="text"
                  placeholder="e.g. OtakuKing"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="auth-input"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="input-label">Password</label>
              <div className="input-field-wrapper">
                <LockOutlined className="input-icon" />
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="auth-input"
                  required
                />
              </div>
            </div>

            <button type="submit" className="auth-submit-btn">
              Sign In to AnimeBliss
            </button>
          </form>

          <div className="auth-footer">
            <span>Don't have an account? </span>
            <span className="auth-link" onClick={() => navigate("/signup")}>
              Sign Up
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
