import Home from "../components/Home/Home";
import Login from "../components/logIn/Login";
import Navbar from "../components/navbar/Navbar";
import ProfileInfo from "../components/ProfileInfo/ProfileInfo";
import SignUp from "../components/SignUp/SignUp";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/profile" element={<ProfileInfo />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
