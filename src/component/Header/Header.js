import React, { useEffect, useState } from "react";
import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import logo from "../../assets/image/logo.png";
import { Link } from "react-router-dom";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const Header = () => {
  const [login, setLogin] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        setLogin(true);
      } else {
        console.log("not found");
        setLogin(false);
      }
    });
  }, []);

  const hendleLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(function() {
        console.log("LogOut");
      })
      .catch(function(error) {
        console.log("LogOut error");
      });
  };

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
                  {login ? (
                    <button
                      className="btn btn-outline-success"
                      onClick={hendleLogout}
                    >
                      Logout
                    </button>
                  ) : (
                    <Link to="login" className="btn btn-outline-success">
                      Login
                    </Link>
                  )}
                </li>
                <li>
                  {login ? (
                    <p></p>
                  ) : (
                    <Link to="signup" className="btn btn-outline-success">
                      Sing Up
                    </Link>
                  )}
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
