import { GithubFilled, GoogleCircleFilled } from "@ant-design/icons";
import "./LoginPage.css";
import { useEffect } from "react";
import Navbar from "../Sections/Navbar";
import { GoogleLogin } from "react-google-login";
import { useNavigate } from "react-router-dom";
import { gapi } from "gapi-script";
import toast, { Toaster } from "react-hot-toast";
const LoginPage = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const clientId =
    "952500448273-nr07eb37fsoadpoktd855vrpmphsrg9e.apps.googleusercontent.com";
  const onSuccess = (res) => {
    toast.success("Login Successful!");
    setIsLoggedIn(true);
    navigate("/");
  };
  const onFailure = (err) => {
    toast.error("Login Failed");
  };
  useEffect(() => {
    gapi.load("client:auth2", () => {
      gapi.client.init({
        clientId: clientId,
        scope: "",
      });
    });
  });
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
          <h2>Sign in</h2>
          <span style={{ color: "#78909C" }}>
            Please sign in to your account.
          </span>
          <form className="login-form" action="/loginreq" method="POST">
            <label htmlFor="">Email *</label>
            <input
              className="input input-email"
              placeholder="Your email address"
              type="text"
            />
            <label htmlFor="">Password *</label>
            <input
              className="input input-password"
              placeholder="Your password"
              type="text"
            />
            <div className="extras">
              <div>
                <input
                  name="remembercheckbox"
                  className="remember-checkbox"
                  type="checkbox"
                />
                <span>Remember me</span>
              </div>
              <a href="/forgotpass">Forgot your password?</a>
            </div>
            <button type="submit">Sign In</button>
          </form>

          <GoogleLogin
            render={(renderProps) => (
              <button
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                <GoogleCircleFilled /> Sign In
              </button>
            )}
            clientId={clientId}
            onSuccess={onSuccess}
            onFailure={onFailure}
            redirectUri="https://animebliss.vercel.app/"
            cookiePolicy={"single_host_origin"}
          />
          <button>
            <GithubFilled /> Sign In
          </button>
          <div className="signupprompt">
            <span>Dont't have a account?</span>
            <a href="/signup">Sign Up</a>
          </div>
        </div>
      </div>
      <Toaster
        toastOptions={{
          duration: 1000,
        }}
        position="top-right"
      ></Toaster>
    </>
  );
};
export default LoginPage;
