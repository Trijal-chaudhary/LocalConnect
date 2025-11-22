import React from "react";
import style from "./SideBar.module.css";
const SideBar = () => {
  return (
    <>
      <ul class={style.sidebarNavMain}>
        <li>Category</li>
        <li>About Us</li>
        <li>Contact Us</li>
        <li>Help</li>
      </ul>
      <div class={style.sidebarActions}>
        <button class={`${style.sidebarBtn} ${style.providerBtn}`}>
          Become a Provider
        </button>
        <button class={`${style.sidebarBtn} ${style.loginBtn}`}>Login</button>
        <button class={`${style.sidebarBtn} ${style.logoutBtn}`}>SignUp</button>
      </div>
    </>
  );
};

export default SideBar;
