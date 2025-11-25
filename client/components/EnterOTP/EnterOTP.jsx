import React, { useRef, useState } from "react";
import { OtpPasswordReset } from "../../src/service/fetching";
import PasswordChange from "../PasswordChange/PasswordChange";

const EnterOTP = ({ setRenderEnterOtp, emailState, usernameState }) => {
  const otpRef = useRef();
  const [renderChangepass, setRenderChangepass] = useState(false);
  const handelSubmit = async (e) => {
    e.preventDefault();
    const res = await OtpPasswordReset(otpRef.current.value, emailState);
    console.log(res);
    if (res.message === "match") {
      setRenderChangepass(true);
    } else {
      alert("Invalid OTP");
    }
  };
  return (
    <>
      {renderChangepass && (
        <PasswordChange usernameState={usernameState} emailState={emailState} />
      )}
      {!renderChangepass && (
        <>
          <div className="OuterOtp">
            <div class="modal-overlay">
              <div class="modal-content">
                <button
                  class="close-btn"
                  aria-label="Close"
                  onClick={() => setRenderEnterOtp(false)}
                >
                  &times;
                </button>
                <div class="modal-header">
                  <h2>Verify At it is You</h2>
                  <p>
                    An OTP has been sent to your <br />
                    email: {emailState}
                  </p>
                </div>
                <form class="otp-form" onSubmit={handelSubmit}>
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
        </>
      )}
    </>
  );
};

export default EnterOTP;
