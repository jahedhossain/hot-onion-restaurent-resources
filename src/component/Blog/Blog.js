import React from "react";
import "./Blog.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faArrowRight
} from "@fortawesome/free-solid-svg-icons";
import blog1 from "../../assets/image/Image/adult-blur-blurred-background-687824.png";
import blog2 from "../../assets/image/Image/chef-cook-food-33614.png";
import blog3 from "../../assets/image/Image/architecture-building-city-2047397.png";

function Blog() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <div className="title">
            <h1>Why you choose us</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe,
              aliquam!
            </p>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-4">
          <div className="blog">
            <img src={blog1} alt="" />
            <div className="row padding-top">
              <div className="col-2">
                <span className="blog_icon">
                  <FontAwesomeIcon icon={faShoppingCart} />
                </span>
              </div>
              <div className="col-10">
                <h4>Fast Delivery</h4>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Rerum sit itaque deserunt nulla odit doloremque voluptatibus.
                  Placeat nisi fuga fugit.
                </p>
                <a href=" ">
                  See more
                  <span className="arrow">
                    <FontAwesomeIcon icon={faArrowRight} />
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="blog">
            <img src={blog2} alt="" />
            <div className="row padding-top">
              <div className="col-2">
                <span className="blog_icon">
                  <FontAwesomeIcon icon={faShoppingCart} />
                </span>
              </div>
              <div className="col-10">
                <h4>Fast Delivery</h4>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Rerum sit itaque deserunt nulla odit doloremque voluptatibus.
                  Placeat nisi fuga fugit.
                </p>
                <a href=" ">
                  See more
                  <span className="arrow">
                    <FontAwesomeIcon icon={faArrowRight} />
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="blog">
            <img src={blog3} alt="" />
            <div className="row padding-top">
              <div className="col-2">
                <span className="blog_icon">
                  <FontAwesomeIcon icon={faShoppingCart} />
                </span>
              </div>
              <div className="col-10">
                <h4>Fast Delivery</h4>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Rerum sit itaque deserunt nulla odit doloremque voluptatibus.
                  Placeat nisi fuga fugit.
                </p>
                <a href=" ">
                  See more
                  <span className="arrow">
                    <FontAwesomeIcon icon={faArrowRight} />
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Blog;
