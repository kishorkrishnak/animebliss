import React from "react";
import Navbar from "../Sections/Navbar";
import "./LoginPage.css";

const SignupPage = () => {
  return (
    <>
      <Navbar></Navbar>
      <div className="main-wrapper">
        <h1 className="welcome-text">
          <span className="welcome-text-dodgerblue">Hola,</span>
          <br />
          Welcome to <br /> <span>Animebliss </span>
        </h1>

        <div className="login-container">
          <h2>Sign Up</h2>
          <span style={{ color: "#78909C" }}>Please fill in your details.</span>

          <form className="login-form" action="/loginreq" method="POST">
            <label htmlFor="">Username *</label>
            <input
              className="input input-username"
              placeholder="Your username"
              type="text"
            />
            <label htmlFor="">Email*</label>
            <input
              className="input input-email"
              placeholder="Your username"
              type="text"
            />
            <label htmlFor="">Password *</label>
            <input
              className="input input-password1"
              placeholder="Your password"
              type="text"
            />
            <label htmlFor="">Confirm Password *</label>
            <input
              className="input input-password2"
              placeholder="Your password"
              type="text"
            />

            <button type="submit">Sign Up</button>
          </form>

          <div className="signupprompt">
            <span>Already have a account?</span>
            <a href="/login">Sign In</a>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignupPage;
