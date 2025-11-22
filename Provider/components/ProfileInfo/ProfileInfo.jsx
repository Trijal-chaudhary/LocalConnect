import React, { useEffect, useState } from "react";
import "./ProfileInfo.css";
import { logOut, postislogged } from "../../src/services/fetching";
import { useNavigate } from "react-router-dom";
const ProfileInfo = () => {
  const navigate = useNavigate();
  const [profileDetails, setProfileDetails] = useState();
  const [profileUrl, setProfileUrl] = useState(null);
  const [certsUrl, setCertsUrl] = useState(null);
  const [resumeUrl, setResumeUrl] = useState(null);
  const [aadhaarFrontUrl, setAadhaarFrontUrl] = useState(null);
  const [aadhaarBackUrl, setaadhaarBackUrl] = useState(null);
  const [panUrl, setPanUrl] = useState(null);
  const [addressProofUrl, setAddressProofUrl] = useState(null);
  const loggOut = async () => {
    await logOut();
    navigate("/login");
    // setIsLogged(false);
  };
  useEffect(() => {
    postislogged().then((response) => {
      setProfileDetails(response.userDetail.details);
      response.userDetail.urls.forEach((ele) => {
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
      console.log(response.userDetail);
    });
  }, []);
  return (
    <div className="OuterProfile">
      <div class="profile-container">
        <aside class="profile-sidebar">
          <img src={profileUrl} alt="Profile Picture" class="profile-picture" />

          <h1>{profileDetails?.full_name}</h1>

          <p class="username">@{profileDetails?.username}</p>

          <div class="service-tag">{profileDetails?.primary_service}</div>
          <div class="service-tag">{profileDetails?.sub_categories}</div>

          <h2>About Me</h2>

          <p class="bio">{profileDetails?.bio}</p>
        </aside>

        <main class="profile-main">
          <h2>Personal & Contact Details</h2>
          <div class="details-grid">
            <div class="detail-item">
              <label>Email Address</label>
              <span>{profileDetails?.email}</span>
            </div>

            <div class="detail-item">
              <label>Mobile Number</label>
              <span>{profileDetails?.mobile}</span>
            </div>
          </div>

          <h2>Service Details</h2>
          <div class="details-grid">
            <div class="detail-item">
              <label>Experience</label>
              <span>{profileDetails?.experience}</span>
            </div>

            <div class="detail-item">
              <label>Specialties / Sub-categories</label>
              <span>
                {profileDetails?.primary_service}/
                {profileDetails?.sub_categories}{" "}
              </span>
            </div>

            <div class="detail-item">
              <label>Service Area Pincodes</label>
              <span>{profileDetails?.service_area}</span>
            </div>

            <div class="detail-item">
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
          </div>

          <h2>Standard Availability</h2>
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

          <h2>Uploaded Documents & Verification</h2>
          <p>
            This section is for your personal reference. These documents are
            kept confidential and are used for verification purposes only.
          </p>

          <ul class="document-list">
            <li class="document-item">
              <span>Certificates</span>
              <a href={certsUrl} target="_blank" rel="noopener noreferrer">
                View
              </a>
            </li>
            <li class="document-item">
              <span>Resume</span>
              <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
                View
              </a>
            </li>
            <li class="document-item">
              <span>Aadhaar (Front)</span>
              <a
                href={aadhaarFrontUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                View
              </a>
            </li>
            <li class="document-item">
              <span>Aadhaar (Back)</span>
              <a
                href={aadhaarBackUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                View
              </a>
            </li>
            <li class="document-item">
              <span>PAN Card</span>
              <a href={panUrl} target="_blank" rel="noopener noreferrer">
                View
              </a>
            </li>
            <li class="document-item">
              <span>Address Proof</span>
              <a
                href={addressProofUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                View
              </a>
            </li>
            <li class="document-item">
              <span>Live Selfie</span>
              <a href={profileUrl} target="_blank" rel="noopener noreferrer">
                View
              </a>
            </li>
          </ul>
          <button className="LogOutBUtten" onClick={loggOut}>
            LogOut
          </button>
        </main>
      </div>
    </div>
  );
};

export default ProfileInfo;
