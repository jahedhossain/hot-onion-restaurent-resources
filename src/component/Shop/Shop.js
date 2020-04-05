import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Product from "../Product/Product";
import { getDatabaseCart } from "../../utilities/databaseManager";
import "./Shop.css";
import Category from "../Category/Category";

function Shop() {
  const [allfoods, setAllfoods] = useState([]);
  const [products, setProduct] = useState([]);
  const [addClass, setAddClass] = useState({
    lunchActive: false,
    dinnerActive: true,
    breakfastActive: false,
  });
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetch("http://localhost:4200/foodProduct")
      .then((res) => res.json())
      .then((data) => setAllfoods(data))
      .catch((err) => console.log(err));
  }, []);

  // default dinner foods show
  useEffect(() => {
    filterFoods("dinner");
    const lunch = filterFoods("lunch");
    setProduct(lunch);
  }, [allfoods]);

  // breakfast button handle
  const hendleBreakfast = () => {
    const brackfirst = filterFoods("breakfast");
    setProduct(brackfirst);
    setAddClass({
      lunchActive: false,
      dinnerActive: false,
      breakfastActive: true,
    });
  };

  // lunch button handle
  const hendleLunch = () => {
    const lunch = filterFoods("lunch");
    setProduct(lunch);
    setAddClass({
      lunchActive: true,
      dinnerActive: false,
      breakfastActive: false,
    });
  };

  // dinner button handle
  const hendleDiner = () => {
    const brackfirst = filterFoods("dinner");
    setProduct(brackfirst);
    setAddClass({
      lunchActive: false,
      dinnerActive: true,
      breakfastActive: false,
    });
  };
  // all Foods filter category
  const filterFoods = (categoryName) => {
    const category = allfoods.filter((a, b) => {
      if (a.category === categoryName) {
        return a.category === categoryName;
      }
    });
    return category;
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
          {allfoods.length ? (
            products.map((product) => (
              <Product product={product} key={product.key}></Product>
            ))
          ) : (
            <div className="col">
              <p className="mt-5 text-center"> Loading please wait</p>
            </div>
          )}

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
