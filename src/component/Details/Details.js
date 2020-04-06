import React, { useState, useEffect } from "react";
import "./Details.css";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import {
  addToDatabaseCart,
  getDatabaseCart,
} from "../../utilities/databaseManager";

function Details() {
  const [count, setCount] = useState(1);
  const [foodProduct, setFoodProduct] = useState({});
  const [loading, setLoading] = useState(false);

  const { productKey } = useParams();

  useEffect(() => {
    fetch(
      "https://sheltered-lake-15300.herokuapp.com/foodProduct/" + productKey
    )
      .then((res) => res.json())
      .then((data) => {
        setFoodProduct(data);
        setLoading(true);
      });
  }, [productKey]);

  const handleIncrement = () => {
    const currentCount = count + 1;
    setCount(currentCount);
  };

  const handleDecrement = () => {
    if (count >= 2) {
      const currentCount = count - 1;
      setCount(currentCount);
    } else {
      return;
    }
  };
  const clickHendelar = () => {
    addToDatabaseCart(foodProduct.key, count);
  };

  return (
    <div className="details">
      <div className="container">
        <div className="row">
          <div className="col">
            <ul className="d-flex justify-content-center ">
              <li>Breakfast</li>
              <li>Dinner</li>
              <li>Lunch</li>
            </ul>
          </div>
        </div>
        {loading ? (
          <div className="row">
            <div className="col-md-6">
              <h1>{foodProduct.title}</h1>
              <p>{foodProduct.description}</p>
              <p>
                <strong className="price">${foodProduct.price}</strong>
                <span className="incrementDecrement">
                  <strong onClick={handleDecrement}>-</strong>
                  <b>{count}</b>
                  <strong onClick={handleIncrement}>+</strong>
                </span>
              </p>
              <button className="btn btn-danger" onClick={clickHendelar}>
                <FontAwesomeIcon icon={faShoppingCart} /> Add Cart
              </button>
              <div className="multiple_details_img">
                <img src={foodProduct.image} alt="" />
                <img src={foodProduct.image} alt="" />
              </div>
            </div>
            <div className="col-md-6">
              <img src={foodProduct.image} alt="" />
            </div>
          </div>
        ) : (
          <p className="mt-5 text-center"> Loading please wait</p>
        )}
      </div>
    </div>
  );
}

export default Details;
