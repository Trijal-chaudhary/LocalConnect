import React, { useRef } from "react";
import "./Otp.css";
const Otp = ({ setRenderOtp, otpSubmit }) => {
  const otpRef = useRef();
  const submitOtp = (e) => {
    e.preventDefault();
    otpSubmit(otpRef.current.value);
  };
  return (
    <div className="OuterOtp">
      <div class="modal-overlay">
        <div class="modal-content">
          <button class="close-button" onClick={() => setRenderOtp(false)}>
            &times;
          </button>
          <div class="modal-header">
            <h2>Verify Your Booking</h2>
          </div>
          <form class="otp-form" onSubmit={submitOtp}>
            <div class="form-group2">
              <label for="otp">Enter 4-Digit OTP</label>
              <input
                type="text"
                id="otp"
                name="otp"
                placeholder="----"
                required
                pattern="[0-9]{4}"
                maxlength="4"
                title="Please enter a 4-digit OTP"
                ref={otpRef}
              />
            </div>
            <button type="submit" class="submit-btn">
              Verify & Confirm
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Otp;
