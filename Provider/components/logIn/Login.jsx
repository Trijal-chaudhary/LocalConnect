import React, { useRef } from "react";
import "./Login.css";
import { postLoin } from "../../src/services/fetching";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const userNameRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    console.log(userNameRef.current.value, passwordRef.current.value);
    const response = await postLoin(
      userNameRef.current.value,
      passwordRef.current.value
    );
    if (response.message === "found") {
      navigate("/");
    } else {
      alert("not Found");
    }
  };
  return (
    <div className="OuterLogIn">
      <div className="login-container">
        <header className="login-header">
          <h1>Log In</h1>
        </header>

        <form className="login-form" onSubmit={submit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="e.g., harish_plumber"
              ref={userNameRef}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              ref={passwordRef}
              required
            />
          </div>

          <button type="submit" className="submit-btn">
            Log In
          </button>
        </form>
        <p>
          dont Have an Account? <a href="/signup">Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
