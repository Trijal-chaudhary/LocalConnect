import React from "react";
import style from "./SideBar.module.css";
import { useNavigate } from "react-router-dom";
const SideBar = ({ isLogged, LogOut, name }) => {
  const navigate = useNavigate();
  return (
    <>
      <ul class={style.sidebarNavMain}>
        <li>About Us</li>
        <li>Contact Us</li>
        <li>Help</li>
      </ul>
      <div class={style.sidebarActions}>
        <button class={`${style.sidebarBtn} ${style.providerBtn}`}>
          Become a Provider
        </button>
        {isLogged ? (
          <>
            <button
              class={`${style.sidebarBtn} ${style.loginBtn}`}
              onClick={LogOut}
            >
              LogOut
            </button>
            <button class={`${style.sidebarBtn} ${style.loginBtn}`}>
              {name}
            </button>
          </>
        ) : (
          <>
            <button
              class={`${style.sidebarBtn} ${style.loginBtn}`}
              onClick={() => navigate("/login")}
            >
              Login
            </button>
            <button class={`${style.sidebarBtn} ${style.logoutBtn}`}>
              SignUp
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default SideBar;
