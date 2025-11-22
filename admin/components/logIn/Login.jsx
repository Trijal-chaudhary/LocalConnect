import React, { useRef } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { approve, loginAdmin, reject } from "../../public/service/fetching";
const Login = () => {
  const userNameRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    console.log(userNameRef.current.value, passwordRef.current.value);
    const response = await loginAdmin(
      userNameRef.current.value,
      passwordRef.current.value
    );
    if (response.user === "found") {
      navigate("/");
    } else {
      alert("not Found");
    }
  };
  return (
    <div className="OuterLogIn">
      <div className="login-container">
        <header className="login-header">
          <h1>Log In(ADMIN)</h1>
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
      </div>
    </div>
  );
};

export default Login;
