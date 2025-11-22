import React, { useState } from "react";
import "./ProviderDetails.css";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { bookClient, ProviderDetailsAdmin } from "../../src/service/fetching";

const ProviderDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [profileDetails, setProfileDetails] = useState();
  const [profileUrl, setProfileUrl] = useState(null);
  const [reviewSection, setReviewSection] = useState();
  const [avgStar, SetAvgStar] = useState();
  const [certsUrl, setCertsUrl] = useState(null);
  const [resumeUrl, setResumeUrl] = useState(null);
  const [aadhaarFrontUrl, setAadhaarFrontUrl] = useState(null);
  const [aadhaarBackUrl, setaadhaarBackUrl] = useState(null);
  const [panUrl, setPanUrl] = useState(null);
  const [addressProofUrl, setAddressProofUrl] = useState(null);

  useEffect(() => {
    ProviderDetailsAdmin(id).then((res) => {
      // console.log(res.details.details);
      setProfileDetails(res.details.details);
      setReviewSection(res.details.review);
      SetAvgStar(res.details.avgStar);
      // console.log(res.details.review);
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
  }, [id]);
  const book = () => {
    bookClient(id).then(() => {
      navigate("/");
    });
  };
  return (
    <div className="OuterAdmin">
      <div className="admin-container">
        <header className="admin-header">
          <h1>
            <span>{profileDetails?.full_name}</span>
          </h1>
        </header>

        <div className="verification-layout">
          <main className="main-details">
            <h2>Provider Details</h2>
            <div className="details-grid">
              <div className="detail-item">
                <label>Full Name</label>
                <span>{profileDetails?.full_name}</span>
              </div>

              <div className="detail-item">
                <label>Username</label>
                <span>@{profileDetails?.username}</span>
              </div>
            </div>

            <h2>Service Details</h2>
            <div className="details-grid">
              <div className="detail-item">
                <label>Primary Service</label>
                <span>{profileDetails?.primary_service}</span>
              </div>

              <div className="detail-item">
                <label>Experience</label>
                <span>{profileDetails?.experience} years</span>
              </div>

              <div className="detail-item">
                <label>Specialties</label>
                <span>{profileDetails?.sub_categories}</span>
              </div>

              <div className="detail-item">
                <label>Service Area</label>
                <span>{profileDetails?.service_area}</span>
              </div>

              <div className="detail-item detail-item-full">
                <label>Portfolio Link</label>
                {profileDetails?.portfolio_link ? (
                  <a
                    href={profileDetails?.portfolio_link}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View Portfolio
                  </a>
                ) : (
                  <span>Not provided</span>
                )}
              </div>

              <div className="detail-item detail-item-full bio">
                <label>About</label>
                {profileDetails?.bio}
              </div>
            </div>
          </main>

          <aside className="evidence-sidebar">
            <h2>Images</h2>

            <div className="evidence-item">
              <label>Profile Photo</label>
              <img src={profileUrl} alt="Profile" />
            </div>
          </aside>
        </div>
        <button className="Book" onClick={book}>
          BOOK
        </button>
      </div>
      <div class="review-section">
        <h2>
          Rating and Reviews{" "}
          <strong className="review-avg">
            {"★".repeat(Math.floor(avgStar)) +
              "☆".repeat(5 - Math.floor(avgStar))}{" "}
            {avgStar}
          </strong>
        </h2>
        <div class="review-list">
          {reviewSection?.map((ele) => (
            <>
              <div class="review-card">
                <div class="review-header">
                  <h4 class="review-name">{ele.name}</h4>
                  <span class="review-date">
                    {new Date(ele.time).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <p class="review-text">{ele.review}</p>
                <h5 class="review-rating">
                  {"★".repeat(ele.star) + "☆".repeat(5 - ele.star)} {ele.star}
                </h5>
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProviderDetails;
