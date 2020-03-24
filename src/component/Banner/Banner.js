import React from "react";
import "./Banner.css";

function Banner() {
  return (
    <div className="banner d-flex flex-column justify-content-center align-items-center">
      <h1>Best food waiting for your belly</h1>
      <div className="search_box ">
        <form className="form-inline">
          <div className="form-group mx-sm-3 mb-2 d-flex justify-content-center align-items-center">
            <input type="text" className="form-control" placeholder="Search" />
            <button type="submit" className="btn btn-primary">
              Search
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Banner;
