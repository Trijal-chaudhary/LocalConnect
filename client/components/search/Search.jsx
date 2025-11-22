import React from "react";
import "./search.css";
const Search = () => {
  return (
    <>
      <div className="OuterSearch">
        <h2>Name Of search</h2>
        <div className="outerSearchCard">
          <div className="cardSearch">
            <img src="" alt="" />
            <h4>Name</h4>
            <h4>Service Type</h4>
            <strong className="starSearch">
              {"★".repeat(4) + "☆".repeat(5 - 4)}4
            </strong>
          </div>
          <div className="cardSearch">
            <img src="" alt="" />
            <h4>Name</h4>
            <h4>Service Type</h4>
            <strong className="starSearch">
              {"★".repeat(4) + "☆".repeat(5 - 4)}4
            </strong>
          </div>
          <div className="cardSearch">
            <img src="" alt="" />
            <h4>Name</h4>
            <h4>Service Type</h4>
            <strong className="starSearch">
              {"★".repeat(4) + "☆".repeat(5 - 4)}4
            </strong>
          </div>
          <div className="cardSearch">
            <img src="" alt="" />
            <h4>Name</h4>
            <h4>Service Type</h4>
            <strong className="starSearch">
              {"★".repeat(4) + "☆".repeat(5 - 4)}4
            </strong>
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
