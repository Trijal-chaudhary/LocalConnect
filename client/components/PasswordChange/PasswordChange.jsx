import React, { useRef } from "react";
import { resetPassword } from "../../src/service/fetching";
import "./password.css";
import { useNavigate } from "react-router-dom";
const PasswordChange = ({ usernameState, emailState }) => {
  const newPasswordRef = useRef();
  // const
  const navigate = useNavigate();
  const handelSubmit = (e) => {
    e.preventDefault();
    resetPassword(emailState, usernameState, newPasswordRef.current.value).then(
      (res) => {
        console.log(res);
        if (res.message === "changed") {
          // navigate("/");
          window.location.reload();
        } else {
          alert("Something went wrong. Please try again later.");
          navigate("/");
        }
      }
    );
  };
  return (
    <div className="OuterOtp">
      <div class="modal-overlay">
        <div class="modal-content">
          <div class="modal-header">
            <h2>Set New Password</h2>
            <p>{usernameState}</p>
          </div>
          <form class="otp-form" onSubmit={handelSubmit}>
            <div class="form-group2">
              <label for="password">Password:</label>
              <input
                type="password"
                id="Passowrd"
                name="password"
                placeholder="Enter the new Password"
                ref={newPasswordRef}
                required
              />
              <label for="password">Conform Password</label>
              <input
                type="password"
                id="ConformPassword"
                name="Conform Password"
                placeholder="Conform Password"
                required
              />
            </div>
            <button type="submit" class="submit-btn">
              Reset
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PasswordChange;
