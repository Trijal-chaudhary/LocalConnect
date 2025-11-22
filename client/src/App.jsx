import Home from "../components/Home/Home";
import Login from "../components/logIn/Login";
import Navbar from "../components/navbar/Navbar";
import ProviderDetails from "../components/providerDetail/ProviderDetails";
import SignUp from "../components/SignUp/SignUp";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/userDetails/:id" element={<ProviderDetails />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
