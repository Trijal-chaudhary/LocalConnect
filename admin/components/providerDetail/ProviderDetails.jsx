import React, { useState } from "react";
import "./ProviderDetails.css";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  approve,
  ProviderDetailsAdmin,
  reject,
} from "../../public/service/fetching";
import { useNavigate } from "react-router-dom";

const ProviderDetails = () => {
  const navigate = useNavigate();
  const { id, status } = useParams();
  const [profileDetails, setProfileDetails] = useState();
  const [statusState, setStatus] = useState();
  const [profileUrl, setProfileUrl] = useState(null);
  const [certsUrl, setCertsUrl] = useState(null);
  const [resumeUrl, setResumeUrl] = useState(null);
  const [aadhaarFrontUrl, setAadhaarFrontUrl] = useState(null);
  const [aadhaarBackUrl, setaadhaarBackUrl] = useState(null);
  const [panUrl, setPanUrl] = useState(null);
  const [addressProofUrl, setAddressProofUrl] = useState(null);

  useEffect(() => {
    setStatus(status);

    ProviderDetailsAdmin(id).then((res) => {
      // console.log(res.details.details);
      setProfileDetails(res.details.details);
      res.details.urls.forEach((ele) => {
        if (ele.fieldName === "live_selfie") {
          setProfileUrl(ele.url);
          console.log(ele.url);
        }
        switch (ele.fieldName) {
          case "live_selfie":
            setProfileUrl(ele.url);
            break;
          case "certs":
            setCertsUrl(ele.url);
            break;
          case "resume":
            setResumeUrl(ele.url);
            break;
          case "aadhaar_front":
            setAadhaarFrontUrl(ele.url);
            break;
          case "aadhaar_back":
            setaadhaarBackUrl(ele.url);
            break;
          case "pan_photo":
            setPanUrl(ele.url);
            break;
          case "address_proof":
            setAddressProofUrl(ele.url);
            break;
          default:
            break;
        }
      });
    });
  }, [id, status]);

  const rejectProvider = async () => {
    reject(id).then(() => {
      navigate("/");
    });
  };
  const approvedProvider = async () => {
    approve(id).then(() => {
      navigate("/");
    });
  };
  return (
    <div className="OuterAdmin">
      <div class="admin-container">
        <header class="admin-header">
          <h1>
            Reviewing: <span>{profileDetails?.full_name}</span>
          </h1>
          <div class="status-badge">Pending Verification</div>
        </header>

        <div class="verification-layout">
          <main class="main-details">
            <h2>Provider Details</h2>

            <div class="details-grid">
              <div class="detail-item">
                <label>Full Legal Name</label>
                <span>{profileDetails?.full_name}</span>
              </div>
              <div class="detail-item">
                <label>Username</label>
                <span>@{profileDetails?.username}</span>
              </div>
              <div class="detail-item">
                <label>Mobile Number</label>
                <span>{profileDetails?.mobile}</span>
              </div>
              <div class="detail-item">
                <label>Email Address</label>
                <span>{profileDetails?.email}</span>
              </div>
            </div>

            <h2>Service Details</h2>
            <div class="details-grid">
              <div class="detail-item">
                <label>Primary Service</label>
                <span>{profileDetails?.primary_service}</span>
              </div>
              <div class="detail-item">
                <label>Experience</label>
                <span>{profileDetails?.experience}</span>
              </div>
              <div class="detail-item">
                <label>Specialties / Sub-categories</label>
                <span>{profileDetails?.sub_categories}</span>
              </div>
              <div class="detail-item">
                <label>Service Area Pincodes</label>
                <span>{profileDetails?.service_area}</span>
              </div>
              <div class="detail-item detail-item-full">
                <label>Portfolio Link</label>
                {profileDetails?.portfolio_link === "" ? (
                  <>
                    <span>Not provided</span>
                  </>
                ) : (
                  <>
                    <span>{profileDetails?.portfolio_link}</span>
                  </>
                )}
              </div>
              <div class="detail-item detail-item-full bio">
                <label>Provider Bio</label>
                {profileDetails?.bio}
              </div>
            </div>

            <h2>Availability</h2>
            <div class="availability-grid">
              {profileDetails?.avail_mon === "on" && (
                <div class="day-item on">Monday</div>
              )}
              {profileDetails?.avail_mon === "on" && (
                <div class="day-item on">Tuesday</div>
              )}
              {profileDetails?.avail_mon === "on" && (
                <div class="day-item on">Wednesday</div>
              )}
              {profileDetails?.avail_mon === "on" && (
                <div class="day-item on">Thursday</div>
              )}
              {profileDetails?.avail_mon === "on" && (
                <div class="day-item on">Friday</div>
              )}
              {profileDetails?.avail_mon === "on" && (
                <div class="day-item on">Saturday</div>
              )}
              {profileDetails?.avail_mon === "on" && (
                <div class="day-item on">Sunday</div>
              )}
            </div>

            <h2>Confidential Data</h2>
            <div class="details-grid">
              <div class="detail-item">
                <label>Aadhaar Number</label>
                <span>{profileDetails?.aadhaar_num}</span>
              </div>
              <div class="detail-item">
                <label>PAN Number</label>
                <span>{profileDetails?.pan_num}</span>
              </div>
            </div>
          </main>

          <aside class="evidence-sidebar">
            <h2>Uploaded Evidence</h2>

            <div class="evidence-item">
              <label>Live Selfie</label>
              <img src={profileUrl} alt="Live Selfie" />
            </div>

            <div class="evidence-item">
              <label>Aadhaar (Front)</label>
              <img src={aadhaarFrontUrl} alt="Aadhaar Front" />
            </div>

            <div class="evidence-item">
              <label>Aadhaar (Back)</label>
              <img src={aadhaarBackUrl} alt="Aadhaar Back" />
            </div>

            <div class="evidence-item">
              <label>PAN Card</label>
              <img src={panUrl} alt="PAN Card" />
            </div>

            <div class="evidence-item">
              <label>Address Proof</label>
              <img src={addressProofUrl} alt="Address Proof" />
            </div>

            <div class="evidence-item">
              <label>Certificates</label>
              <a
                class="document-link"
                href={certsUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Certificate
              </a>
            </div>

            <div class="evidence-item">
              <label>Resume / CV</label>
              <a
                class="document-link"
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Resume
              </a>
            </div>

            {statusState === "pending" && (
              <>
                <div class="action-panel">
                  <h2>Admin Action</h2>

                  <div class="form-group">
                    <label for="admin-notes">
                      Reason for Rejection (if any)
                    </label>
                    <textarea
                      id="admin-notes"
                      name="notes"
                      placeholder=""
                    ></textarea>
                  </div>
                  <div class="action-buttons">
                    <button
                      class="action-btn btn-reject"
                      onClick={rejectProvider}
                    >
                      Reject
                    </button>
                    <button
                      class="action-btn btn-approve"
                      onClick={approvedProvider}
                    >
                      Approve & Verify
                    </button>
                  </div>
                </div>
              </>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
};

export default ProviderDetails;
