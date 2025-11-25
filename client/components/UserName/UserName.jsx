import React, { useRef, useState } from "react";
import "./UserName.css";
import { sendingOTPForReset } from "../../src/service/fetching";
import EnterOTP from "../EnterOTP/EnterOTP";
const UserName = ({ setRenderUserName }) => {
  const [usernameState, setUserName] = useState();
  const userNameRef = useRef();
  const [emailState, setEmailState] = useState();
  const [renderEnterOtp, setRenderEnterOtp] = useState(false);
  const submitUsername = async (e) => {
    e.preventDefault();
    const res = await sendingOTPForReset(userNameRef.current.value);
    if (res.message === "foundSend") {
      setUserName(userNameRef.current.value);
      setEmailState(res.email);
      setRenderEnterOtp(true);
    } else {
      alert("Invalid UserName");
    }
  };
  return (
    <>
      {renderEnterOtp && (
        <EnterOTP
          setRenderEnterOtp={setRenderEnterOtp}
          emailState={emailState}
          usernameState={usernameState}
        />
      )}

      <div className="outerUserComp">
        <div class="user-card">
          <button
            class="close-btn"
            aria-label="Close"
            onClick={() => setRenderUserName(false)}
          >
            &times;
          </button>

          <div class="card-header">
            <h2>Password Reset</h2>
            <p>Enter your valid Username</p>
          </div>
          <form onSubmit={submitUsername}>
            <div class="input-group">
              <label for="username">Username</label>
              <input
                type="text"
                id="username"
                placeholder="Enter your name here"
                ref={userNameRef}
              />
            </div>

            <button class="next-btn" type="submit">
              Next
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UserName;
