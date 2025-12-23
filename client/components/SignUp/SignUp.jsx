import React, { useState } from "react";
import "./SignUp.css";
import { ClientSignup, postVerifingOtp } from "../../src/service/fetching";
import { useNavigate } from "react-router-dom";
import Otp from "../OTP/Otp";
const SignUp = () => {
  const [OtpRender, setOtpRender] = useState(false);
  const [detailsState, setDetails] = useState();
  const navigate = useNavigate();
  const handelSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const dataObj = Object.fromEntries(formData.entries());
    ClientSignup(formData).then(() => {
      // navigate("/login");
      // setDetails(dataObj);
      postVerifingOtp(dataObj).then(() => {
        navigate("/login");
      });

      // setOtpRender(true);
    });
  };
  const handelOTP = async (otp) => {
    const res = await postVerifingOtp(otp, detailsState);
    if (res.message === "notMatch") {
      alert("invalid OTP");
    } else {
      navigate("/login");
    }
  };
  return (
    <>
      {OtpRender && (
        <Otp
          handelOTP={handelOTP}
          setOtpRender={setOtpRender}
          detailsState={detailsState}
        />
      )}

      <div className="OuterSignup">
        <div class="signup-container">
          <header class="signup-header">
            <h1>Create Your Account</h1>
            <p class="subhead">
              Find trusted local professionals in your area.
            </p>
          </header>

          <form
            class="signup-form"
            encType="multipart/form-data"
            onSubmit={handelSubmit}
          >
            <div class="form-group">
              <label for="full-name">Full Name</label>
              <input
                type="text"
                id="full-name"
                name="full_name"
                placeholder="Enter your full name"
                required
              />
            </div>

            <div class="form-group">
              <label for="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Choose a username"
                required
              />
            </div>
            <div class="form-group">
              <label for="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your valid email"
                required
              />
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Create a strong password"
                required
              />
            </div>

            <div class="form-group">
              <label for="address">Full Address</label>
              <textarea
                id="address"
                name="address"
                placeholder="Enter your full street address, landmark, etc."
                required
              ></textarea>
            </div>

            <div class="form-group">
              <label for="pincode">Pincode</label>
              <input
                type="text"
                id="pincode"
                name="pincode"
                placeholder="e.g., 201310"
                required
                pattern="[0-9]{6}"
                title="Please enter a 6-digit pincode"
              />
            </div>

            <button
              type="submit"
              class="submit-btn"
              // onClick={() => navigate("/login")}
            >
              Create Account
            </button>

            <div class="login-link">
              Already have an account? <a href="/login">Log In</a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
