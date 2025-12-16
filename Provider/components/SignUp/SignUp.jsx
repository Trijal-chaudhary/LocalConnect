import React, { useState } from "react";
import "./SignUp.css";
import { postProviderDetail } from "../../src/services/fetching";
import Status from "../status/Status";
import { useNavigate } from "react-router-dom";
import CameraComponent from "../capture/Capture";
import VideoCapture from "../capture/VideoCapture";
import Capture from "../capture/Capture";
const SignUp = () => {
  const navigate = useNavigate();
  const [renderCap, setReanderCap] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }
    // const dataObject = Object.fromEntries(formData.entries());

    // console.log(dataObject);
    await postProviderDetail(formData);
  };
  return (
    <>
      <div className="bodySign">
        {renderCap && (
          <>
            <div className="mainOuterVideo">
              <div className="OuterVideoCap">
                <Capture />
              </div>
            </div>
          </>
        )}

        <div class="signup-container">
          <header class="signup-header">
            <h1>Become a LocalConnect Provider</h1>
            <p className="subhead">
              Join our trusted community of professionals.
            </p>
          </header>

          <form
            className="signup-form"
            onSubmit={handleSubmit}
            encType="multipart/form-data"
          >
            <div>
              <h2>Step 1: Account Setup</h2>
              <div class="form-group">
                <label for="full-name">Full Legal Name</label>
                <input
                  type="text"
                  id="full-name"
                  name="full_name"
                  placeholder="As shown on your Aadhaar"
                  required
                />
              </div>

              <div class="form-grid">
                <div class="form-group">
                  <label for="username">Username</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="e.g., harishPlumber05"
                    required
                  />
                </div>
                <div class="form-group">
                  <label for="mobile">Mobile Number</label>
                  <input
                    type="text"
                    id="mobile"
                    name="mobile"
                    placeholder="Enter mobile Number"
                    required
                  />
                </div>
              </div>

              <div class="form-group">
                <label for="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter Email Address"
                  required
                />
              </div>

              <div class="form-grid">
                <div class="form-group">
                  <label for="password">Create Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    required
                  />
                </div>
                <div class="form-group">
                  <label for="password-confirm">Confirm Password</label>
                  <input
                    type="password"
                    id="password-confirm"
                    name="password_confirm"
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <h2>Step 2: Your Service</h2>

              <div class="form-grid">
                <div class="form-group">
                  <label for="primary-service">Primary Service</label>
                  <select id="primary-service" name="primary_service" required>
                    <option value="" disabled selected>
                      Select your main service
                    </option>
                    <option value="electrician">Electrician</option>
                    <option value="plumber">Plumber</option>
                    <option value="carpenter">Carpenter</option>
                    <option value="painter">Painter</option>
                    <option value="cleaning">Home Cleaning</option>
                    <option value="tutor">Tutor / Education</option>
                    <option value="baker">Home Baker</option>
                    <option value="tiffin">Tiffin Service</option>
                    <option value="tailor">Local Tailor</option>
                    <option value="artist">Local Artist</option>
                    <option value="mehendi">Mehendi Artist</option>
                    <option value="photographer">Photographer</option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="experience">Years of Experience</label>
                  <select id="experience" name="experience" required>
                    <option value="0-1">0-1 Year (Fresher)</option>
                    <option value="1-3">1-3 Years</option>
                    <option value="3-5">3-5 Years</option>
                    <option value="5+">5+ Years</option>
                  </select>
                </div>
              </div>

              <div class="form-group">
                <label for="sub-categories">
                  Sub-categories(optional){" "}
                  <span class="optional">(e.g., Maths, Physics)</span>
                </label>
                <input
                  type="text"
                  id="sub-categories"
                  name="sub_categories"
                  placeholder="List your specialties, separated by commas"
                />
              </div>

              <div class="form-group">
                <label for="bio">Profile Bio</label>
                <textarea
                  id="bio"
                  name="bio"
                  placeholder="Tell customers about yourself, your skills, and your experience..."
                  required
                ></textarea>
              </div>

              <div class="form-group">
                <label>Skill Verification Uploads(optional)</label>
                <div class="form-grid">
                  <div class="form-group">
                    <label for="certs" class="file-upload-label">
                      <span>Upload Certificates</span>
                      <span class="small-text">e.g., ITI diploma, degree</span>
                    </label>
                    <input type="file" id="certs" name="certs" multiple />
                  </div>
                  <div class="form-group">
                    <label for="resume" class="file-upload-label">
                      <span>Upload Resume</span>
                      <span class="small-text">Work history or CV</span>
                    </label>
                    <input type="file" id="resume" name="resume" />
                  </div>
                </div>
              </div>

              <div class="form-group">
                <label for="portfolio-link">
                  Portfolio Link(optional){" "}
                  <span class="optional">
                    (For Artists, Photographers, etc.)
                  </span>
                </label>
                <input
                  type="text"
                  id="portfolio-link"
                  name="portfolio_link"
                  placeholder="e.g., your Instagram or website link"
                />
              </div>
            </div>

            <div>
              <h2>Step 3: Identity Verification</h2>
              <p
              // style="margin-top: -1.5rem; margin-bottom: 2rem; font-size: 0.95rem; color: #555;"
              >
                This information is required for our Multi-Layer Verification
                process and is kept confidential.
              </p>

              <div class="form-grid">
                <div class="form-group">
                  <label for="aadhaar-num">Aadhaar Number</label>
                  <input
                    type="text"
                    id="aadhaar-num"
                    name="aadhaar_num"
                    placeholder="XXXX XXXX XXXX"
                    required
                  />
                </div>
                <div class="form-group">
                  <label for="pan-num">PAN Number</label>
                  <input
                    type="text"
                    id="pan-num"
                    name="pan_num"
                    placeholder="ABCDE1234F"
                    required
                  />
                </div>
              </div>

              <div class="form-grid">
                <div class="form-group">
                  <label for="aadhaar-front" class="file-upload-label">
                    <span>Upload Aadhaar (Front)</span>
                    <span class="small-text">.jpg or .png</span>
                  </label>
                  <input
                    type="file"
                    id="aadhaar-front"
                    name="aadhaar_front"
                    required
                  />
                </div>
                <div class="form-group">
                  <label for="aadhaar-back" class="file-upload-label">
                    <span>Upload Aadhaar (Back)</span>
                    <span class="small-text">.jpg or .png</span>
                  </label>
                  <input
                    type="file"
                    id="aadhaar-back"
                    name="aadhaar_back"
                    required
                  />
                </div>
                <div class="form-group">
                  <label for="pan-photo" class="file-upload-label">
                    <span>Upload PAN Card</span>
                    <span class="small-text">.jpg or .png</span>
                  </label>
                  <input type="file" id="pan-photo" name="pan_photo" required />
                </div>
                <div class="form-group">
                  <label for="address-proof" class="file-upload-label">
                    <span>Upload Address Proof</span>
                    <span class="small-text">
                      e.g., Utility Bill, Rent Agreement
                    </span>
                  </label>
                  <input
                    type="file"
                    id="address-proof"
                    name="address_proof"
                    required
                  />
                </div>
              </div>

              <div class="form-group">
                <label
                  for="live-selfie"
                  class="file-upload-label"
                  // style="background-color: #f0f4ff; border-color: #b3c5ff;"
                >
                  <span>Upload a Profile Photo</span>
                  <span class="small-text">
                    Must be a clear, recent photo of your face
                  </span>
                </label>
                <input
                  type="file"
                  id="live-selfie"
                  name="live_selfie"
                  accept="image/*"
                  capture="user"
                  required
                />
              </div>
              <div class="form-group" onClick={() => setReanderCap(true)}>
                <label
                  for="live-video"
                  class="file-upload-label"
                  // style="background-color: #f0f4ff; border-color: #b3c5ff;"
                >
                  <span>Upload a Live Video</span>
                  <span class="small-text">
                    Saying your name and you want to join LocalConnect
                  </span>
                </label>
              </div>

              <div class="consent-box">
                <div class="form-group">
                  <label for="consent">
                    <input
                      type="checkbox"
                      id="consent"
                      name="consent"
                      required
                    />
                    <span>
                      I agree to the LocalConnect Terms of Service and consent
                      to a background check, including police verification, to
                      be conducted by LocalConnect or its designated partners.
                    </span>
                  </label>
                </div>
              </div>
            </div>
            <div>
              <h2>Step 4: Your Logistics</h2>
              <div class="form-group">
                <label for="service-area">Service Area Pincodes</label>
                <input
                  type="text"
                  id="service-area"
                  name="service_area"
                  placeholder="e.g., 201301, 201306, 201310"
                  required
                />
              </div>

              <div class="form-group">
                <label>Standard Availability</label>
                <div class="checkbox-group">
                  <div class="checkbox-item">
                    <input type="checkbox" id="mon" name="avail_mon" />
                    <label for="mon">Monday</label>
                  </div>
                  <div class="checkbox-item">
                    <input type="checkbox" id="tue" name="avail_tue" />
                    <label for="tue">Tuesday</label>
                  </div>
                  <div class="checkbox-item">
                    <input type="checkbox" id="wed" name="avail_wed" />
                    <label for="wed">Wednesday</label>
                  </div>
                  <div class="checkbox-item">
                    <input type="checkbox" id="thu" name="avail_thu" />
                    <label for="thu">Thursday</label>
                  </div>
                  <div class="checkbox-item">
                    <input type="checkbox" id="fri" name="avail_fri" />
                    <label for="fri">Friday</label>
                  </div>
                  <div class="checkbox-item">
                    <input type="checkbox" id="sat" name="avail_sat" />
                    <label for="sat">Saturday</label>
                  </div>
                  <div class="checkbox-item">
                    <input type="checkbox" id="sun" name="avail_sun" />
                    <label for="sun">Sunday</label>
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              class="submit-btn"
              onClick={() => navigate("/login")}
            >
              Submit Application
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
