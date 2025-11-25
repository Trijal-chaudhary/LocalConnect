import React from "react";
import "./UserName.css";
const UserName = ({ setRenderUserName }) => {
  return (
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

        <div class="input-group">
          <label for="username">Username</label>
          <input type="text" id="username" placeholder="Enter your name here" />
        </div>

        <button class="next-btn">Next</button>
      </div>
    </div>
  );
};

export default UserName;
