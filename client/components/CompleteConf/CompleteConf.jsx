import React from "react";
import "./CompleteConf.css";
const CompleteConf = ({ bookedProveder, comf }) => {
  return (
    <div className="OuterCNF">
      <div class="modal-overlay">
        <div class="modal-content">
          <div class="modal-header">
            <h2>Service Completion</h2>
          </div>
          <div class="modal-body">
            <p>
              Has your service provider,{" "}
              <strong>{bookedProveder.details.full_name}</strong>, completed the
              work to your satisfaction?
            </p>
          </div>
          <div class="modal-actions">
            <button class="btn btn-primary" onClick={comf}>
              Yes, Confirm Completion
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompleteConf;
