import "./Login.css";
import { Link } from "react-router-dom";
const Login = () => {
  return (
    <div className="login-div-container">
      <div className="login-div">
        <h1 className="heading">Animebliss</h1>
        <div className="login-desc">
          <h2>Watch Anime</h2>
        </div>
        <h2 className="login-desc-noads">No Ads</h2>

        <h2>Login</h2>
        <form action="">
          <div className="input-sep">
            <label>Email Address</label>
            <input type="text" className="logininput" id="email" name="email" />
          </div>
          <div className="input-sep">
            <label>Password</label>
            <input
              type="text"
              className="logininput"
              id="passwd"
              name="passwd"
            />
          </div>
        </form>
        <a href="/forgotpass" className="link-forgot-pass">
          Forgot your password?
        </a>
        <button>Sign in</button>
        <p>Or continue with</p>
        <button>Login with google</button>

        <button>Sign in anonymously</button>

        <div className="newtodiv">
          <p>New to animebliss?</p>
          <a
            className="btn-login"
            style={{ color: "red" }}
            href="/signup"
            className="link-signup"
          >
            Sign up now
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
