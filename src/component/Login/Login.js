import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import logo from "../../assets/image/logo2.png";
import { useForm } from "react-hook-form";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

function Signup() {
  const [login, setLogin] = useState(true);
  const [matchP, setMatchP] = useState(false);
  const [error, setErrors] = useState();

  const { register, handleSubmit, errors } = useForm();
  const {
    register: register2,
    errors: errors2,
    handleSubmit: handleSubmit2
  } = useForm({ mode: "onBlur" });

  // signup from submit from handlebar
  const onSubmit = (data, e) => {
    // password match
    if (data.password === data.confirmPassword) {
      setMatchP(false);
      firebase
        .auth()
        .createUserWithEmailAndPassword(data.email, data.password)
        .then(data => {
          console.log(data);
          e.target.reset();
          setLogin(true);
        })
        .catch(function(error) {
          // Handle Errors here.

          setErrors(error.message);
          // ...
        });
    } else {
      setMatchP(true);
    }
  };

  // login from submit from handlebar
  const onSubmitLogin = data => {
    console.log(data);
    firebase
      .auth()
      .signInWithEmailAndPassword(data.email, data.password)
      .then(user => {
        console.log(user);
        window.location.pathname = "/delivery";
      })
      .catch(err => {
        console.log(err);
        setErrors(err.message);
      });
  };

  // condition toggle button login  and signup form
  const hendleToggle = () => {
    if (login) {
      setLogin(false);
    } else {
      setLogin(true);
    }
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="signup_from_signup d-flex flex-column justify-content-center align-items-center">
            <div className={login ? "signup d-none " : " signup text-center"}>
              <Link to="/">
                <img src={logo} alt="" />
              </Link>

              <form
                key={1}
                className="form-group "
                onSubmit={handleSubmit(onSubmit)}
              >
                {error && <span> {error}</span>}
                <input
                  className="form-control"
                  name="firstName"
                  placeholder="firstName"
                  type="text"
                  ref={register({ required: true })}
                />
                {errors.firstName && <span>First Name field is required</span>}
                <input
                  className="form-control"
                  name="email"
                  placeholder="email"
                  type="email"
                  ref={register({ required: true })}
                />
                {errors.email && <span>Email field is required</span>}
                <input
                  className="form-control"
                  name="password"
                  placeholder="password"
                  type="password"
                  ref={register({ required: true })}
                />
                {errors.password && <span>Password field is required</span>}
                <input
                  className="form-control"
                  name="confirmPassword"
                  placeholder="confirmPassword"
                  type="password"
                  ref={register({ required: true })}
                />
                {errors.confirmPassword && (
                  <span>confirmPassword field is required</span>
                )}
                {matchP && <span>your password not match</span>}
                <input type="submit" className="submit bg-danger btn" />
              </form>

              <button className="click_toggle" onClick={hendleToggle}>
                Already have an account
              </button>
            </div>
            <div className={login ? " signup text-center  " : "signup d-none"}>
              <Link to="/">
                <img src={logo} alt="" />
              </Link>
              <form
                key={2}
                className="form-group"
                onSubmit={handleSubmit2(onSubmitLogin)}
              >
                {error && <span> {error}</span>}
                <input
                  className="form-control"
                  name="email"
                  placeholder="email"
                  type="email"
                  ref={register2({ required: true })}
                />
                {errors2.email && <span>Email field is required</span>}
                <input
                  className="form-control"
                  name="password"
                  placeholder="password"
                  type="password"
                  ref={register2({ required: true })}
                />
                {errors2.password && <span>Password field is required</span>}

                <input type="submit" className="submit bg-danger btn" />
              </form>
              <button className="click_toggle" onClick={hendleToggle}>
                Create account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
