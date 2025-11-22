import React, { useEffect, useState } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import Status from "../status/Status";
import Navbar from "../navbar/Navbar";
import {
  completedWork,
  logOut,
  otpVerification,
  postislogged,
  previousClient,
} from "../../src/services/fetching";
import Otp from "../OTP/Otp";
import Complete from "../Comlete/Complete";
import socket from "../../src/services/socket";
import Chat from "../chat/Chat";
const Home = () => {
  const navigate = useNavigate();
  const [isLogged, setIsLogged] = useState(false);
  const [details, setDetails] = useState();
  const [status, setStatus] = useState();
  const [userDetail, setUserDetail] = useState();
  const [otp, setOtp] = useState();
  const [renderOtp, setRenderOtp] = useState(false);
  const [previousClientState, setPreviousClient] = useState([]);
  const [chatRender, setChatRender] = useState(false);
  const [chatIcon, setChatIcon] = useState(false);
  // const [renderComplete, setRenderComplete] = useState(false);
  useEffect(() => {
    postislogged().then((response) => {
      // console.log(response);
      // console.log(response.userDetail);
      setPreviousClient([]);
      setIsLogged(response.isLogged);
      setDetails(response.userDetail);
      if (
        response.userDetail &&
        response.userDetail.PrevClient &&
        response.userDetail.PrevClient.length !== 0
      ) {
        response.userDetail.PrevClient.forEach((ele) => {
          previousClient(ele.id).then((res) => {
            // console.log(res.prev);
            const dateObj = new Date(ele.bookedAt);
            const dateTime = dateObj.toLocaleString("en-IN", {
              timeZone: "Asia/Kolkata",
            });
            setPreviousClient((prev) => [
              ...prev,
              { client: res.prev, time: dateTime },
            ]);
            console.log(res.prev, ele.bookedAt);
          });
        });
      }
      if (!response.isLogged) {
        navigate("/login");
      }
      if (response.userDetail.clientId) {
        setUserDetail(response.detailOfUser);
        setChatIcon(true);
        setOtp(response.detailOfUser.otp);
        socket.emit("JOIN", { id: response.detailOfUser.providerId });
        console.log(response.detailOfUser.providerId);
      }
      setStatus(response.userDetail.status);
    });
  }, []);
  const loggOut = async () => {
    await logOut();
    navigate("/login");
    setIsLogged(false);
  };
  const otpSubmit = (otp) => {
    if (otp === userDetail.otp) {
      otpVerification(otp).then(() => {
        setRenderOtp("false");
        setOtp("Started");
      });
    } else {
      alert("Invalid OTP");
    }
  };
  const complte = () => {
    completedWork().then(() => {
      setRenderOtp(false);
      setOtp("Complete");
    });
  };
  return (
    <>
      <Navbar isLogged={isLogged} details={details} loggOut={loggOut} />
      {chatRender && (
        <Chat userDetail={userDetail} setChatRender={setChatRender} />
      )}
      {chatIcon && (
        <img
          src="assets/Chat.png"
          alt="Chat"
          className="ChatPng"
          onClick={() => setChatRender(true)}
        />
      )}

      <div className="home">
        {status !== "Approved" && <Status status={status} />}

        {status === "Approved" && (
          <>
            <div className="service">
              <h2>Bookings</h2>

              <div className="cardContainer ">
                {userDetail ? (
                  <>
                    <div className="hidden" onClick={() => setRenderOtp(true)}>
                      <img src="/assets/profile.jpg" alt="" />
                      <h4 className="status">{userDetail.details.full_name}</h4>
                      <h4 className="loc">{userDetail.details.address}</h4>
                      <h4 className="time">{userDetail.details.pincode}</h4>
                      {otp === "Started" ? (
                        <p>Click if you completed the work</p>
                      ) : otp === "Complete" ? (
                        <p>Completion status under verification.</p>
                      ) : (
                        <p>Click to enter the OTP</p>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <p>No Bookings</p>
                  </>
                )}
              </div>
            </div>
            <div className="service">
              <h2>Previous Bookings</h2>

              <div className="cardContainer ">
                {previousClientState.length !== 0 ? (
                  <>
                    {previousClientState.map((ele) => (
                      <>
                        <div className="hidden">
                          <h4 className="status">{ele.time}</h4>
                          <img src="/assets/profile.jpg" alt="" />
                          <h4 className="status">
                            {ele.client.details.full_name}
                          </h4>
                          <h4 className="loc">{ele.client.details.address}</h4>
                          <h4 className="time">{ele.client.details.pincode}</h4>
                        </div>
                      </>
                    ))}
                  </>
                ) : (
                  <>
                    <p></p>
                  </>
                )}
              </div>
            </div>
          </>
        )}
      </div>
      {renderOtp && otp !== "Started" && otp !== "Complete" && (
        <Otp setRenderOtp={setRenderOtp} otpSubmit={otpSubmit} />
      )}
      {renderOtp && otp === "Started" && (
        <Complete setRenderOtp={setRenderOtp} complte={complte} />
      )}
    </>
  );
};

export default Home;
