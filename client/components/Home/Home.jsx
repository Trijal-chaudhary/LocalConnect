import React, { useEffect, useState } from "react";
import styles from "./Home.module.css";
import {
  CompletedComfr,
  isLoggedClient,
  logOutClient,
  postReview,
  previousProvider,
  providerDetails,
} from "../../src/service/fetching";
import { useNavigate } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Pincode from "../Pincode/Pincode";
import "./auth.css";
import CompleteConf from "../CompleteConf/CompleteConf";
import RatingReview from "../RatingReview/RatingReview";
import Chat from "../chat/Chat";
import { useRef } from "react";
// import { postReview } from "../../../backend/Controller/client";
const Home = () => {
  const searchRef = useRef();
  const navigate = useNavigate();
  const [renderPin, setRenderPin] = useState(false);
  const [currImg, setCurrImg] = useState(0);
  const [placeHolder, setPlaceHolder] = useState("");
  const [pincode, setPincode] = useState();
  const [Electrician, setElectrician] = useState([]);
  const [Carpenter, setCarpenter] = useState([]);
  const [Education, setEducation] = useState([]);
  const [Baker, setBaker] = useState([]);
  const [Cleaning, setCleaning] = useState([]);
  const [Tailor, setTailor] = useState([]);
  const [Painter, setPainter] = useState([]);
  const [Plumber, setPlumber] = useState([]);
  const [Tiffin, setTiffin] = useState([]);
  const [isLogged, setIsLogged] = useState(false);
  const [userInfo, setUserInfo] = useState();
  const [otp, setOtp] = useState(null);
  const [bookedId, setBookedid] = useState(null);
  const [bookedProveder, setBookProvider] = useState(null);
  const [Providers, setProvider] = useState();
  const [previousProviderState, setPreviousProvider] = useState([]);
  const [reviewState, setReview] = useState(null);
  const [userID, setUserId] = useState(null);
  const [chat, setChat] = useState(null);
  const imgUrl = [
    { url: "assets/0.jpeg", name: "Tutor" },
    { url: "assets/1.webp", name: "Electrician" },
    { url: "assets/2.webp", name: "Plumber" },
    { url: "assets/3.webp", name: "Home Repair & Installation" },
    { url: "assets/4.jpg", name: "Home Cleaning" },
    { url: "assets/6.jpg", name: "Appliance Installation & Repair" },
    { url: "assets/7.jpg", name: "Pest Control" },
    { url: "assets/8.jpg", name: "Makeup Artist" },
    { url: "assets/10.jpg", name: "Photographer" },
  ];
  const serviceDetails = [
    { url: "Electrician.jpg", name: "Electrician" },
    { url: "Carpenter.jpg", name: "Carpenter" },
    { url: "Education.jpg", name: "Education & Skills" },
    { url: "Home Bakers.jpg", name: "Home Bakers" },
    { url: "Home Cleaning.jpg", name: "Home Cleaning" },
    { url: "Local Tailor.jpg", name: "Local Tailor" },
    { url: "Painter.jpg", name: "Painter" },
    { url: "Pest Control.jpg", name: "Pest Control" },
    { url: "Plumber.jpg", name: "Plumber" },
    { url: "Tiffin Service.jpg", name: "Tiffin Service" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrImg((prev) => (prev + 1) % imgUrl.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);
  useEffect(() => {
    const fullText = imgUrl[currImg].name;
    let idx = 0;
    // setPlaceHolder("");
    setPlaceHolder(fullText[idx]);
    const typing = setInterval(() => {
      if (idx < fullText.length - 1) {
        setPlaceHolder((prev) => prev + fullText[idx]);
        idx++;
      } else {
        clearInterval(typing);
      }
    }, 100);
    return () => clearInterval(typing);
  }, [currImg]);
  useEffect(() => {
    isLoggedClient().then((res) => {
      if (res.message === "found") {
        setIsLogged(true);
        setUserInfo(res.details.details);
        setUserId(res.details._id);
        // console.log(res.details);
        // console.log(res.details);
        if (res.details.prevProvider) {
          setPreviousProvider([]);
          res.details.prevProvider.forEach((ele) => {
            // console.log(res.details);
            previousProvider(ele.id).then((ele2) => {
              // console.log(ele.completedAt);
              const dateObj = new Date(ele.completedAt);
              const dateTime = `${dateObj.toISOString().split("T")[0]} (${
                dateObj.toISOString().split("T")[1].split(".")[0]
              })`;
              setPreviousProvider((prev) => [
                ...prev,
                { provider: ele2.prev, time: dateTime },
              ]);
              // console.log(ele2.prev);
            });
          });
        }

        setPincode(res.details.details.pincode);
        if (res.details.otp) {
          setOtp(res.details.otp);
          setBookedid(res.details.providerId);
        }
        // console.log(res.details.details.pincode);
      } else {
        setIsLogged(false);
      }
    });
  }, []);
  const LogOut = () => {
    logOutClient().then(() => {
      setIsLogged(false);
    });
  };
  const searchClick = (e) => {
    // e.preventDefault();
    console.log(searchRef.current.value);
    navigate(`search/${searchRef.current.value}`);
  };
  useEffect(() => {
    providerDetails(pincode).then((res) => {
      setProvider(res.provider);
      setElectrician([]);
      setCarpenter([]);
      setEducation([]);
      setBaker([]);
      setCleaning([]);
      setTailor([]);
      setPainter([]);
      setPlumber([]);
      setTiffin([]);
      // console.log(bookedId);

      res.provider.forEach((ele) => {
        // console.log(ele._id.toString());
        const service = ele?.details?.primary_service?.toLowerCase()?.trim();
        if (bookedId && bookedId === ele._id.toString()) {
          setBookProvider(ele);
          // console.log(ele);
        }
        if (!service) return;
        switch (service) {
          case "electrician":
            setElectrician((prev) => [...prev, ele]);
            break;
          case "carpenter":
            setCarpenter((prev) => [...prev, ele]);
            break;
          case "tutor / education":
          case "tutor":
            setEducation((prev) => [...prev, ele]);
            break;
          case "home baker":
            setBaker((prev) => [...prev, ele]);
            break;
          case "home cleaning":
            setCleaning((prev) => [...prev, ele]);
            break;
          case "local tailor":
            setTailor((prev) => [...prev, ele]);
            break;
          case "painter":
            setPainter((prev) => [...prev, ele]);
            break;
          case "plumber":
            setPlumber((prev) => [...prev, ele]);
            break;
          case "tiffin service":
            setTiffin((prev) => [...prev, ele]);
            break;
        }
      });
      // console.log(res.provider);
    });
  }, [pincode]);
  const handelReview = async (star, review) => {
    const res = await postReview(star, review, reviewState);
    console.log(res);
  };
  useEffect(() => {
    if (!bookedId || !Providers) return;
    const match = Providers.find((p) => p._id.toString() === bookedId);
    if (match) setBookProvider(match);
  }, [bookedId, Providers]);
  const setPin = (pin) => {
    setPincode(pin);
    setRenderPin(false);
  };
  const comf = () => {
    CompletedComfr().then(() => {
      setOtp("completed");
    });
  };
  const scrollToSection = (id) => {
    const element = document.getElementById(id.toLowerCase());
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <>
      <Navbar
        isLogged={isLogged}
        userInfo={userInfo}
        LogOut={LogOut}
        pincode={pincode}
        setRenderPin={setRenderPin}
        scrollToSection={scrollToSection}
      />
      {renderPin && (
        <div className={styles.pincode}>
          <Pincode setRenderPin={setRenderPin} setPin={setPin} />
        </div>
      )}
      {otp === "Complete" && bookedProveder && (
        <CompleteConf bookedProveder={bookedProveder} comf={comf} />
      )}
      {reviewState && (
        <RatingReview setReview={setReview} handelReview={handelReview} />
      )}
      {chat && <Chat setChat={setChat} chat={chat} />}

      <div className={styles.cont}>
        <div className={styles.heroImg}>
          <img src={imgUrl[currImg].url} alt="" />
        </div>
        <div class={styles.heroTextContainer}>
          <h1>One Platform for Every Local Need.</h1>
          <p>
            From plumbers to tutors, LocalConnect brings all your community's
            skilled professionals to your fingertips.
          </p>
          <div class={styles.searchBar}>
            <input
              type="text"
              placeholder={`Search For ${placeHolder}`}
              ref={searchRef}
              onKeyDown={(e) => {
                if (e.key === "Enter") searchClick();
              }}
            />
            <button onClick={searchClick}>Search</button>
          </div>
        </div>
      </div>
      <div className={styles.outerCont}>
        <div className={styles.UspCont}>
          <h1>Why LocalConnect?</h1>
          <div className={styles.cardUSPCont}>
            <div>
              <h2>Multi-Layer Verification</h2>
              <p>
                Your safety is our priority. We conduct Police checks, Skill
                validation, and Character verification for all providers.
              </p>
            </div>
            <div>
              <h2>Empower Local Talent</h2>
              <p>
                We're not a big corporation. We're a platform that connects you
                directly with independent, local professionals, helping them
                grow their businesses.
              </p>
            </div>
            <div>
              <h2>Mentorship & Quality</h2>
              <p>
                We're the only platform that helps 'freshers' gain experience by
                pairing them with experts, ensuring a future of high-quality
                service.
              </p>
            </div>
          </div>
        </div>
        {isLogged ? (
          <>
            {(bookedProveder || previousProviderState.length !== 0) && (
              <div className={styles.service}>
                <h1>Your Bookings</h1>

                <div className={`${styles.cardContainer5} ${styles.preffCont}`}>
                  {bookedProveder && (
                    <>
                      <div key={bookedProveder?._id} className={styles.hidden}>
                        <img
                          src={
                            bookedProveder?.urls?.find(
                              (url) => url?.fieldName === "live_selfie"
                            )?.url
                          }
                          className={styles.prof}
                          alt={bookedProveder?.details?.full_name}
                        />

                        <h4 className="loc">
                          {bookedProveder?.details?.full_name}
                        </h4>
                        <h4 className="loc">
                          {bookedProveder?.details?.primary_service}
                        </h4>
                        {otp === "Started" ? (
                          <p className="loc">
                            The service provider has started the job.
                          </p>
                        ) : (
                          <h4 className="loc">OTP: {otp}</h4>
                        )}
                        <button onClick={() => setChat(bookedProveder)}>
                          Chat
                        </button>
                      </div>
                    </>
                  )}

                  {previousProviderState && (
                    <>
                      {previousProviderState.map((ele) => (
                        <>
                          <div
                            key={bookedProveder?._id}
                            className={styles.hidden}
                          >
                            <img
                              src={
                                ele?.provider?.urls?.find(
                                  (url) => url.fieldName === "live_selfie"
                                )?.url
                              }
                              className={styles.prof}
                              alt={ele?.provider?.details?.full_name}
                            />

                            <h4 className="loc">
                              {ele?.provider?.details?.full_name}
                            </h4>
                            <h4 className="loc">
                              {ele?.provider?.details?.primary_service}
                            </h4>
                            <h4>Completed</h4>

                            {ele.provider.PrevClient.find(
                              (ele) => ele.id.toString() === userID
                            )?.review ? (
                              ""
                            ) : (
                              <button
                                onClick={() => setReview(ele.provider._id)}
                              >
                                Leave a Review
                              </button>
                            )}
                          </div>
                        </>
                      ))}
                    </>
                  )}
                </div>
              </div>
            )}
            <section id="catogrie">
              <div className={styles.service}>
                <h1>What service do you need today?</h1>
                <div className={`${styles.cardContainer} ${styles.padBot}`}>
                  {serviceDetails.map((ele) => (
                    <>
                      <div
                        className={styles.hidden}
                        onClick={() => scrollToSection(ele.name)}
                      >
                        <img
                          src={`assets/services/${ele.url}`}
                          alt={ele.name}
                        />
                        <h4>{ele.name}</h4>
                      </div>
                    </>
                  ))}
                </div>
              </div>
            </section>

            <div className={styles.service}>
              <h1>Meet Your Local Professionals</h1>
              <div className={`${styles.cardContainer2} ${styles.preffCont}`}>
                {Providers?.map((ele) => {
                  const selfie = ele?.urls?.find(
                    (url) => url.fieldName === "live_selfie"
                  );
                  return (
                    <div
                      className={styles.hidden}
                      onClick={() => navigate(`/userDetails/${ele._id}`)}
                    >
                      <img src={selfie?.url} className={styles.prof} alt="" />
                      <h4 className="loc">{ele.details.full_name}</h4>
                      <h4 className="loc">{ele.details.primary_service}</h4>
                      <strong className={styles.reviewRating}>
                        {"★".repeat(Math.floor(ele.avgStar)) +
                          "☆".repeat(5 - Math.floor(ele.avgStar))}{" "}
                        {ele.avgStar}
                      </strong>
                    </div>
                  );
                })}
              </div>
            </div>
            {Electrician.length !== 0 && (
              <>
                <section id="electrician">
                  <div className={styles.service}>
                    <h1>Electrician</h1>
                    <div
                      className={`${styles.cardContainer2} ${styles.preffCont}`}
                    >
                      {Electrician?.map((ele) => {
                        const selfie = ele.urls.find(
                          (url) => url.fieldName === "live_selfie"
                        );
                        return (
                          <div
                            className={styles.hidden}
                            onClick={() => navigate(`/userDetails/${ele._id}`)}
                          >
                            <img
                              src={selfie?.url}
                              className={styles.prof}
                              alt=""
                            />
                            <h4 className="loc">{ele.details.full_name}</h4>
                            <h4 className="loc">
                              {ele.details.primary_service}
                            </h4>
                            <strong className={styles.reviewRating}>
                              {"★".repeat(Math.floor(ele.avgStar)) +
                                "☆".repeat(5 - Math.floor(ele.avgStar))}{" "}
                              {ele.avgStar}
                            </strong>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </section>
              </>
            )}
            {Carpenter.length !== 0 && (
              <>
                <section id="carpenter">
                  <div className={styles.service}>
                    <h1>Carpenter</h1>
                    <div
                      className={`${styles.cardContainer2} ${styles.preffCont}`}
                    >
                      {Carpenter?.map((ele) => {
                        const selfie = ele.urls.find(
                          (url) => url.fieldName === "live_selfie"
                        );
                        return (
                          <div
                            className={styles.hidden}
                            onClick={() => navigate(`/userDetails/${ele._id}`)}
                          >
                            <img
                              src={selfie?.url}
                              className={styles.prof}
                              alt=""
                            />
                            <h4 className="loc">{ele.details.full_name}</h4>
                            <h4 className="loc">
                              {ele.details.primary_service}
                            </h4>
                            <strong className={styles.reviewRating}>
                              {"★".repeat(Math.floor(ele.avgStar)) +
                                "☆".repeat(5 - Math.floor(ele.avgStar))}{" "}
                              {ele.avgStar}
                            </strong>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </section>
              </>
            )}
            <section id="education & skills">
              {Education.length !== 0 && (
                <>
                  <div className={styles.service}>
                    <h1>Education & Skills</h1>
                    <div
                      className={`${styles.cardContainer2} ${styles.preffCont}`}
                    >
                      {Education?.map((ele) => {
                        const selfie = ele.urls.find(
                          (url) => url.fieldName === "live_selfie"
                        );
                        return (
                          <div
                            className={styles.hidden}
                            onClick={() => navigate(`/userDetails/${ele._id}`)}
                          >
                            <img
                              src={selfie?.url}
                              className={styles.prof}
                              alt=""
                            />
                            <h4 className="loc">{ele.details.full_name}</h4>
                            <h4 className="loc">
                              {ele.details.primary_service}
                            </h4>
                            <strong className={styles.reviewRating}>
                              {"★".repeat(Math.floor(ele.avgStar)) +
                                "☆".repeat(5 - Math.floor(ele.avgStar))}{" "}
                              {ele.avgStar}
                            </strong>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </>
              )}
            </section>
            {Baker.length !== 0 && (
              <>
                <section id="home bakers">
                  <div className={styles.service}>
                    <h1>Home Bakers</h1>
                    <div
                      className={`${styles.cardContainer2} ${styles.preffCont}`}
                    >
                      {Baker?.map((ele) => {
                        const selfie = ele.urls.find(
                          (url) => url.fieldName === "live_selfie"
                        );
                        return (
                          <div
                            className={styles.hidden}
                            onClick={() => navigate(`/userDetails/${ele._id}`)}
                          >
                            <img
                              src={selfie?.url}
                              className={styles.prof}
                              alt=""
                            />
                            <h4 className="loc">{ele.details.full_name}</h4>
                            <h4 className="loc">
                              {ele.details.primary_service}
                            </h4>
                            <strong className={styles.reviewRating}>
                              {"★".repeat(Math.floor(ele.avgStar)) +
                                "☆".repeat(5 - Math.floor(ele.avgStar))}{" "}
                              {ele.avgStar}
                            </strong>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </section>
              </>
            )}
            {Cleaning.length !== 0 && (
              <>
                <section id="home cleaning">
                  <div className={styles.service}>
                    <h1>Home Cleaning</h1>
                    <div
                      className={`${styles.cardContainer2} ${styles.preffCont}`}
                    >
                      {Cleaning?.map((ele) => {
                        const selfie = ele.urls.find(
                          (url) => url.fieldName === "live_selfie"
                        );
                        return (
                          <div
                            className={styles.hidden}
                            onClick={() => navigate(`/userDetails/${ele._id}`)}
                          >
                            <img
                              src={selfie?.url}
                              className={styles.prof}
                              alt=""
                            />
                            <h4 className="loc">{ele.details.full_name}</h4>
                            <h4 className="loc">
                              {ele.details.primary_service}
                            </h4>
                            <strong className={styles.reviewRating}>
                              {"★".repeat(Math.floor(ele.avgStar)) +
                                "☆".repeat(5 - Math.floor(ele.avgStar))}{" "}
                              {ele.avgStar}
                            </strong>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </section>
              </>
            )}
            {Tailor.length !== 0 && (
              <>
                <section id="local tailor">
                  <div className={styles.service}>
                    <h1>Local Tailor</h1>
                    <div
                      className={`${styles.cardContainer2} ${styles.preffCont}`}
                    >
                      {Tailor?.map((ele) => {
                        const selfie = ele.urls.find(
                          (url) => url.fieldName === "live_selfie"
                        );
                        return (
                          <div
                            className={styles.hidden}
                            onClick={() => navigate(`/userDetails/${ele._id}`)}
                          >
                            <img
                              src={selfie?.url}
                              className={styles.prof}
                              alt=""
                            />
                            <h4 className="loc">{ele.details.full_name}</h4>
                            <h4 className="loc">
                              {ele.details.primary_service}
                            </h4>
                            <strong className={styles.reviewRating}>
                              {"★".repeat(Math.floor(ele.avgStar)) +
                                "☆".repeat(5 - Math.floor(ele.avgStar))}{" "}
                              {ele.avgStar}
                            </strong>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </section>
              </>
            )}
            {Painter.length !== 0 && (
              <>
                <section id="painter">
                  <div className={styles.service}>
                    <h1>Painter</h1>
                    <div
                      className={`${styles.cardContainer2} ${styles.preffCont}`}
                    >
                      {Painter?.map((ele) => {
                        const selfie = ele.urls.find(
                          (url) => url.fieldName === "live_selfie"
                        );
                        return (
                          <div
                            className={styles.hidden}
                            onClick={() => navigate(`/userDetails/${ele._id}`)}
                          >
                            <img
                              src={selfie?.url}
                              className={styles.prof}
                              alt=""
                            />
                            <h4 className="loc">{ele.details.full_name}</h4>
                            <h4 className="loc">
                              {ele.details.primary_service}
                            </h4>
                            <strong className={styles.reviewRating}>
                              {"★".repeat(Math.floor(ele.avgStar)) +
                                "☆".repeat(5 - Math.floor(ele.avgStar))}{" "}
                              {ele.avgStar}
                            </strong>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </section>
              </>
            )}
            {Plumber.length !== 0 && (
              <>
                <section id="plumber">
                  <div className={styles.service}>
                    <h1>Plumber</h1>
                    <div
                      className={`${styles.cardContainer2} ${styles.preffCont}`}
                    >
                      {Plumber?.map((ele) => {
                        const selfie = ele.urls.find(
                          (url) => url.fieldName === "live_selfie"
                        );
                        return (
                          <div
                            className={styles.hidden}
                            onClick={() => navigate(`/userDetails/${ele._id}`)}
                          >
                            <img
                              src={selfie?.url}
                              className={styles.prof}
                              alt=""
                            />
                            <h4 className="loc">{ele.details.full_name}</h4>
                            <h4 className="loc">
                              {ele.details.primary_service}
                            </h4>
                            <strong className={styles.reviewRating}>
                              {"★".repeat(Math.floor(ele.avgStar)) +
                                "☆".repeat(5 - Math.floor(ele.avgStar))}{" "}
                              {ele.avgStar}
                            </strong>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </section>
              </>
            )}
            {Tiffin.length !== 0 && (
              <>
                <section id="Tiffin Service">
                  <div className={styles.service}>
                    <h1>Tiffin Service</h1>
                    <div
                      className={`${styles.cardContainer2} ${styles.preffCont}`}
                    >
                      {Tiffin?.map((ele) => {
                        const selfie = ele.urls.find(
                          (url) => url.fieldName === "live_selfie"
                        );
                        return (
                          <div
                            className={styles.hidden}
                            onClick={() => navigate(`/userDetails/${ele._id}`)}
                          >
                            <img
                              src={selfie?.url}
                              className={styles.prof}
                              alt=""
                            />
                            <h4 className="loc">{ele.details.full_name}</h4>
                            <h4 className="loc">
                              {ele.details.primary_service}
                            </h4>
                            <strong className={styles.reviewRating}>
                              {"★".repeat(Math.floor(ele.avgStar)) +
                                "☆".repeat(5 - Math.floor(ele.avgStar))}{" "}
                              {ele.avgStar}
                            </strong>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </section>
              </>
            )}
          </>
        ) : (
          <div class="auth-banner">
            <p>Please log in to view service providers.</p>
            <a href="/login" class="auth-btn">
              Log In
            </a>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
