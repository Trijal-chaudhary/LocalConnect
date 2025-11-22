import React from "react";
import "./Complete.css";
const Complete = ({ setRenderOtp, complte }) => {
  return (
    <div className="OuterComplete">
      <div class="modal-overlay">
        <div class="modal-content">
          <button class="close-button" onClick={() => setRenderOtp(false)}>
            &times;
          </button>
          <div class="modal-header">
            <h2>Update Job Status</h2>
          </div>
          <div class="modal-body">
            <p>Have you completed this job?</p>
          </div>
          <div class="modal-actions">
            <button
              class="btn btn-secondary"
              onClick={() => setRenderOtp(false)}
            >
              No, Not Yet
            </button>
            <button class="btn btn-primary" onClick={complte}>
              Yes, Completed
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Complete;
