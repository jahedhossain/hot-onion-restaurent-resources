import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Product from "../Product/Product";
import fackData from "../../fakeData";
import { getDatabaseCart } from "../../utilities/databaseManager";
import "./Shop.css";
import Category from "../Category/Category";

function Shop() {
  const [products, setProduct] = useState([]);
  const [addClass, setAddClass] = useState({
    lunchActive: false,
    dinnerActive: true,
    breakfastActive: false
  });
  const [count, setCount] = useState(0);

  useEffect(() => {
    const brackfirst = fackData.filter((a, b) => {
      return a.category === "breakfast";
    });
    setProduct(brackfirst);
  }, []);

  const hendleBreakfast = () => {
    const brackfirst = fackData.filter((a, b) => {
      return a.category === "breakfast";
    });
    setProduct(brackfirst);
    setAddClass({
      lunchActive: false,
      dinnerActive: false,
      breakfastActive: true
    });
  };
  const hendleLunch = () => {
    const brackfirst = fackData.filter((a, b) => {
      return a.category === "lunch";
    });
    setProduct(brackfirst);
    setAddClass({
      lunchActive: true,
      dinnerActive: false,
      breakfastActive: false
    });
  };
  const hendleDiner = () => {
    const brackfirst = fackData.filter((a, b) => {
      return a.category === "dinner";
    });
    setProduct(brackfirst);
    setAddClass({
      lunchActive: false,
      dinnerActive: true,
      breakfastActive: false
    });
  };
  useEffect(() => {
    const savedCart = getDatabaseCart();
    const productKeys = Object.keys(savedCart);
    setCount(productKeys.length);
  }, []);

  return (
    <div>
      <Category
        hendleBreakfast={hendleBreakfast}
        addClass={addClass}
        hendleLunch={hendleLunch}
        hendleDiner={hendleDiner}
      ></Category>
      <div className="container">
        <div className="row">
          {products.map(product => (
            <Product product={product} key={product.key}></Product>
          ))}
          <div className="col-12 text-center">
            <Link
              to="/signup"
              className={
                count ? "btn btn-outline-dark" : "btn btn-outline-dark disabled"
              }
            >
              CheckOut your Food
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Shop;
