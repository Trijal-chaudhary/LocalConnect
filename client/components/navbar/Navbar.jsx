import React from "react";
import style from "./Navbar.module.css";
import SideBar from "../sideBar/SideBar";
import { useNavigate } from "react-router-dom";
const Navbar = ({
  isLogged,
  userInfo,
  LogOut,
  pincode,
  setRenderPin,
  scrollToSection,
}) => {
  const navigate = useNavigate();
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
        <img src="/assets/logo.png" alt="logo" className={style.logo} />
        {isLogged && (
          <>
            <div
              className={style.locationSelector}
              onClick={() => setRenderPin(true)}
            >
              <svg
                className={style.loc}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 640"
              >
                <path d="M128 252.6C128 148.4 214 64 320 64C426 64 512 148.4 512 252.6C512 371.9 391.8 514.9 341.6 569.4C329.8 582.2 310.1 582.2 298.3 569.4C248.1 514.9 127.9 371.9 127.9 252.6zM320 320C355.3 320 384 291.3 384 256C384 220.7 355.3 192 320 192C284.7 192 256 220.7 256 256C256 291.3 284.7 320 320 320z" />
              </svg>
              {pincode ? pincode : "Select Location"}
            </div>
          </>
        )}

        <ul className={style.navList}>
          <li onClick={() => scrollToSection("Catogrie")}>Category</li>
          <li>Become a Provider</li>
          <li>Help</li>
        </ul>
        <div className={style.actionsContainer}>
          {isLogged ? (
            <>
              <button className={style.loginButton} onClick={LogOut}>
                LogOut
              </button>
              <ul className={style.navList}>
                <li>{userInfo.username}</li>
              </ul>
            </>
          ) : (
            <>
              <button
                className={style.loginButton}
                onClick={() => navigate("/login")}
              >
                LogIn
              </button>
              <button
                className={style.signupButton}
                onClick={() => navigate("/signup")}
              >
                SignUp
              </button>
            </>
          )}
        </div>
      </div>
      <div className={`${style.sideBar} ${style.close}`} id="sid">
        <SideBar isLogged={isLogged} LogOut={LogOut} name={userInfo.username} />
      </div>
    </>
  );
};

export default Navbar;
