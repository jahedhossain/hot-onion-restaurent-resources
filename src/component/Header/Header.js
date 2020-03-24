import React from "react";
import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import logo from "../../assets/image/logo.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="d-flex justify-content-between header-top">
            <div className="logo ">
              <Link to="/">
                <img src={logo} alt="" />
              </Link>
            </div>
            <div className="right_side">
              <ul className="d-flex justify-content-center align-items-center">
                <li>
                  <FontAwesomeIcon icon={faShoppingCart} />{" "}
                  <b className="itemCount">0</b>
                </li>
                <li>
                  <Link to="login" className="btn btn-outline-success">
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="signup" className="btn btn-outline-success">
                    Sing Up
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
