import React from "react";
import "./Status.css";
const Status = ({ status }) => {
  return (
    <div className="OuterStatus">
      <div className="status-tracker">
        <div className="step complete">
          <div className="node"></div>
          <div className="label">Uploaded</div>
        </div>

        <div className="connector complete"></div>

        <div className="step complete">
          <div className="node"></div>
          <div className="label">Pending</div>
        </div>
        {status === "Rejected" && (
          <>
            <div className="connector complete"></div>

            <div className="step complete">
              <div className="node"></div>
              <div className="label">Verifying</div>
            </div>

            <div className="connector complete"></div>

            <div className="step active-red">
              <div className="node"></div>
              <div className="label">Rejected</div>
            </div>
          </>
        )}
        {status === "Approved" && (
          <>
            <div className="connector complete"></div>

            <div className="step complete">
              <div className="node"></div>
              <div className="label">Verifying</div>
            </div>

            <div className="connector complete"></div>

            <div className="step active">
              <div className="node"></div>
              <div className="label">Approved</div>
            </div>
          </>
        )}
        {status === "pending" && (
          <>
            <div className="connector complete"></div>

            <div className="step active">
              <div className="node "></div>
              <div className="label">Verifying</div>
            </div>

            <div className="connector "></div>

            <div className="step">
              <div className="node"></div>
              <div className="label">Approved</div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Status;
