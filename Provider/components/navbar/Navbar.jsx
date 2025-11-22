import React, { useEffect, useState } from "react";
import style from "./Navbar.module.css";
import SideBar from "../sideBar/SideBar";
import "./toggle.css";
import { useNavigate } from "react-router-dom";
import { logOut } from "../../src/services/fetching";
const Navbar = ({ isLogged, details, loggOut }) => {
  const navigate = useNavigate();
  const [isYes, setIsYes] = useState(false);
  const [selfieURL, setSelfieURL] = useState("");
  const sidebr = () => {
    const sb = document.getElementById("sid");
    if (sb.classList.contains(style.close)) {
      sb.classList.remove(style.close);
      sb.classList.add(style.open);
    } else if (sb.classList.contains(style.open)) {
      sb.classList.remove(style.open);
      sb.classList.add(style.close);
    }
  };
  useEffect(() => {
    const selfie = details?.urls?.find(
      (item) => item.fieldName === "live_selfie"
    );
    console.log(selfie?.url);
    setSelfieURL(selfie?.url);
  }, [details]);
  return (
    <>
      <div className={style.navbar}>
        <svg
          className={style.ham}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 640 640"
          onClick={sidebr}
        >
          <path d="M96 160C96 142.3 110.3 128 128 128L512 128C529.7 128 544 142.3 544 160C544 177.7 529.7 192 512 192L128 192C110.3 192 96 177.7 96 160zM96 320C96 302.3 110.3 288 128 288L512 288C529.7 288 544 302.3 544 320C544 337.7 529.7 352 512 352L128 352C110.3 352 96 337.7 96 320zM544 480C544 497.7 529.7 512 512 512L128 512C110.3 512 96 497.7 96 480C96 462.3 110.3 448 128 448L512 448C529.7 448 544 462.3 544 480z" />
        </svg>
        <img
          src="/assets/logo.png"
          alt="logo"
          onClick={() => navigate("/")}
          className={style.logo}
        />
        <div className={style.locationSelector}>₹0</div>
        <ul className={style.navList}>
          <li>Analytics</li>
          <li>Help</li>
        </ul>
        {isLogged ? (
          <>
            <p className="Avl">Available?</p>
            <div className="toggle-container">
              <span className={`label ${!isYes ? "active" : ""}`}>No</span>
              <div
                className={`toggle-switch ${isYes ? "yes" : "no"}`}
                onClick={() => setIsYes((prev) => !prev)}
              >
                <div className="toggle-thumb"></div>
              </div>
              <span className={`label ${isYes ? "active" : ""}`}>Yes</span>
            </div>
          </>
        ) : (
          ""
        )}

        {!isLogged ? (
          <>
            <div className={style.actionsContainer}>
              <button
                className={style.loginButton}
                onClick={() => navigate("/login")}
              >
                LogIn
              </button>
              <button
                className={style.signupButton}
                onClick={() => navigate("signup")}
              >
                SignUp
              </button>
            </div>
          </>
        ) : (
          <>
            <img
              src={selfieURL}
              alt="avatar"
              className="profile-avatar"
              onClick={() => navigate("/profile")}
            />
            {/* <p className="profile-name">{details?.details?.full_name}</p> */}
          </>
        )}
      </div>
      <div className={`${style.sideBar} ${style.close}`} id="sid">
        <SideBar />
      </div>
    </>
  );
};

export default Navbar;
