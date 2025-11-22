import React from "react";
import "./search.css";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { postSearch } from "../../src/service/fetching";
import { useNavigate } from "react-router-dom";

import { useState } from "react";
const Search = () => {
  const { ser } = useParams();
  const navigate = useNavigate();
  const [searchingInfo, setSearchingInfo] = useState([]);
  useEffect(() => {
    // console.log(ser);
    postSearch(ser).then((res) => {
      // console.log(res);
      setSearchingInfo(res.searching);
    });
  }, []);
  return (
    <>
      <div className="OuterSearch">
        <h2>{ser}</h2>
        <div className="outerSearchCard">
          {searchingInfo.length != 0 ? (
            searchingInfo.map((ele) => {
              const selfie = ele.urls.find(
                (url) => url.fieldName === "live_selfie"
              );
              return (
                <div
                  className="cardSearch"
                  onClick={() => navigate(`/userDetails/${ele._id}`)}
                >
                  <img src={selfie?.url} alt="" />
                  <h4>{ele.details.full_name}</h4>
                  <h4>{ele.details.primary_service}</h4>
                  <strong className="starSearch">
                    {"★".repeat(Math.floor(ele.avgStar)) +
                      "☆".repeat(5 - Math.floor(ele.avgStar))}{" "}
                    {ele.avgStar}
                  </strong>
                </div>
              );
            })
          ) : (
            <>
              <h4 className="onResult">
                Oops! No results found for your search.
              </h4>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Search;
