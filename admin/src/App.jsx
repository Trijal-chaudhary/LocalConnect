import Home from "../components/Home/Home";
import Login from "../components/logIn/Login";
import ProviderDetails from "../components/providerDetail/providerDetails";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route
          path="/userDetails/:id/:status"
          element={<ProviderDetails />}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
