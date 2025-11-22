import React from "react";
import "./Pincode.css";
import { useState } from "react";
import { useRef } from "react";
const Pincode = ({ setRenderPin, setPin }) => {
  const pinRef = useRef();
  const settingPin = (e) => {
    e.preventDefault();
    setPin(pinRef.current.value);
  };
  return (
    <div class="modal-overlay">
      <div class="modal-content">
        <button class="close-button" onClick={() => setRenderPin(false)}>
          &times;
        </button>

        <div class="modal-header">
          <h2>Select Your Location</h2>
        </div>

        <form class="pincode-form" onSubmit={settingPin}>
          <div class="form-group2">
            <label for="pincode">Enter Pincode</label>
            <input
              type="text"
              id="pincode"
              name="pincode"
              placeholder="e.g., 201310"
              required
              pattern="[0-9]{6}"
              maxlength="6"
              ref={pinRef}
              title="Please enter a 6-digit Indian pincode"
            />
          </div>
          <button type="submit" class="submit-btn">
            Find Services
          </button>
        </form>
      </div>
    </div>
  );
};

export default Pincode;
