import React, { useState } from "react";
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Navbar from "../Sections/Navbar";
import { saveUserProfile } from "../../services/storage";
import toast, { Toaster } from "react-hot-toast";
import "./Login.css";

const SignupPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = (e) => {
    e.preventDefault();
    const finalName = username.trim() || "AnimeHero";

    const profile = {
      isLoggedIn: true,
      name: finalName,
      email: email || `${finalName.toLowerCase()}@animebliss.tv`,
      avatar: `https://api.dicebear.com/7.x/adventurer/svg?seed=${finalName}`,
    };

    saveUserProfile(profile);
    toast.success(`Account created for ${finalName}!`);
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
              Create an <span className="title-accent">Account</span>
            </h1>
            <p className="auth-desc">Join AnimeBliss to build your dream anime watchlist.</p>
          </div>

          <form className="auth-form" onSubmit={handleSignUp}>
            <div className="form-group">
              <label className="input-label">Username</label>
              <div className="input-field-wrapper">
                <UserOutlined className="input-icon" />
                <input
                  type="text"
                  placeholder="Your otaku nickname"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="auth-input"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="input-label">Email</label>
              <div className="input-field-wrapper">
                <MailOutlined className="input-icon" />
                <input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="auth-input"
                  required
                />
              </div>
            </div>

            <button type="submit" className="auth-submit-btn">
              Create Account
            </button>
          </form>

          <div className="auth-footer">
            <span>Already have an account? </span>
            <span className="auth-link" onClick={() => navigate("/login")}>
              Sign In
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
