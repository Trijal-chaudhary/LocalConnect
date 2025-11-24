import React, { useRef } from "react";
import "./Otp.css";
import { ClientSignup } from "../../src/service/fetching";
const Otp = ({ handelOTP, setOtpRender }) => {
  const otpRef = useRef();
  const submitOTP = (e) => {
    e.preventDefault();
    handelOTP(otpRef.current.value);
  };
  const resend = () => {
    setOtpRender(false);
  };
  return (
    <div className="OuterOtp">
      <div class="modal-overlay">
        <div class="modal-content">
          <div class="modal-header">
            <h2>Verify Your Email</h2>
          </div>
          <form class="otp-form" onSubmit={submitOTP}>
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
                ref={otpRef}
                title="Please enter a 4-digit OTP"
              />
            </div>
            <button type="submit" class="submit-btn">
              Verify & Confirm
            </button>
          </form>
          <div className="outerbtns">
            <button type="submit" class="submit-btn bgRES" onClick={resend}>
              Resend OTP
            </button>
            <button
              type="submit"
              class="submit-btn bgCHEM"
              onClick={() => setOtpRender(false)}
            >
              Change Email
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Otp;
