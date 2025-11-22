import React from "react";
import "./Home.css";
import Navbar from "../navbar/Navbar";
import { useEffect } from "react";
import {
  ApprovedDetails,
  isloggedAdmin,
  logOutAdmin,
  pendingDetails,
  RejectedDetails,
} from "../../public/service/fetching";
import { useNavigate } from "react-router-dom";

import { useState } from "react";
const Home = () => {
  const navigate = useNavigate();
  const [isLogged, setIsLogged] = useState(false);
  const [pendingDetailState, setPendingDetails] = useState();
  const [ApprovedDetailState, setApprovedDetails] = useState();
  const [RejectedDetailState, setRejectedDetails] = useState();

  useEffect(() => {
    isloggedAdmin().then((response) => {
      if (response.user === "found") {
        setIsLogged(true);
      } else {
        navigate("/login");
      }
    });
  }, []);
  const logOut = () => {
    logOutAdmin().then(() => {
      navigate("/login");
      setIsLogged(false);
    });
  };
  useEffect(() => {
    ApprovedDetails().then((response) => {
      setApprovedDetails(response.pendingDetails);
      console.log(response.pendingDetails);
    });
    RejectedDetails().then((response) => {
      setRejectedDetails(response.pendingDetails);
    });
    pendingDetails().then((response) => {
      console.log(response.pendingDetails.length);
      setPendingDetails(response.pendingDetails);
    });
  }, []);
  return (
    <>
      <Navbar isLogged={isLogged} logOut={logOut} />
      <div className="home">
        {pendingDetailState?.length !== 0 && (
          <>
            <div className="service">
              <h2>Service provider profiles awaiting verification</h2>
              <div className="cardContainer ">
                {pendingDetailState?.map((ele) => {
                  const selfie = ele.urls.find(
                    (url) => url.fieldName === "live_selfie"
                  );
                  return (
                    <div
                      className="hidden"
                      onClick={() =>
                        navigate(`/userDetails/${ele._id}/pending`)
                      }
                    >
                      <img src={selfie?.url} alt="" />
                      <h4 className="loc">{ele.details.full_name}</h4>
                      <h4 className="time">{ele.details.service_area}</h4>
                      <h4 className="loc">{ele.details.primary_service}</h4>
                      <h4 className="status">{ele.status}</h4>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}

        {ApprovedDetailState?.length !== 0 && (
          <>
            <div className="service">
              <h2>Service provider profiles verified</h2>
              <div className="cardContainer ">
                {ApprovedDetailState?.map((ele) => {
                  const selfie = ele.urls.find(
                    (url) => url.fieldName === "live_selfie"
                  );
                  return (
                    <div
                      className="hidden"
                      onClick={() =>
                        navigate(`/userDetails/${ele._id}/verified`)
                      }
                    >
                      <img src={selfie?.url} alt="" />
                      <h4 className="loc">{ele.details.full_name}</h4>
                      <h4 className="time">{ele.details.service_area}</h4>
                      <h4 className="loc">{ele.details.primary_service}</h4>
                      <h4 className="status">{ele.status}</h4>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}
        {RejectedDetailState?.length !== 0 && (
          <>
            <div className="service">
              <h2>Rejected service provider profiles</h2>
              <div className="cardContainer ">
                {RejectedDetailState?.map((ele) => {
                  const selfie = ele.urls.find(
                    (url) => url.fieldName === "live_selfie"
                  );
                  return (
                    <div
                      className="hidden"
                      onClick={() =>
                        navigate(`/userDetails/${ele._id}/approved`)
                      }
                    >
                      <img src={selfie?.url} alt="" />
                      <h4 className="loc">{ele.details.full_name}</h4>
                      <h4 className="time">{ele.details.service_area}</h4>
                      <h4 className="loc">{ele.details.primary_service}</h4>
                      <h4 className="status">{ele.status}</h4>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Home;
