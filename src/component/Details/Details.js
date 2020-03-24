import React, { useState, useEffect } from "react";
import "./Details.css";
import fackData from "../../fakeData";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import {
  addToDatabaseCart,
  getDatabaseCart
} from "../../utilities/databaseManager";

function Details() {
  const [count, setCount] = useState(1);
  const { productKey } = useParams();
  const product = fackData.find(product => product.key === productKey);
  const { image, title, description, price, key } = product;

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
    addToDatabaseCart(key, count);
  };

  useEffect(() => {
    const savedCart = getDatabaseCart();
    const productKeys = Object.keys(savedCart);
    const previousCart = productKeys.map(existingKey => {
      const product = fackData.find(pd => pd.key === existingKey);
      product.quantity = savedCart[existingKey];
      return product;
    });
    const quantity = previousCart.find((a, b) => a.key === key);
    if (quantity) {
      setCount(quantity.quantity);
    }
  }, []);

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
        <div className="row">
          <div className="col-md-6">
            <h1>{title}</h1>
            <p>{description}</p>
            <p>
              <strong className="price">${price}</strong>
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
              <img src={image} alt="" />
              <img src={image} alt="" />
            </div>
          </div>
          <div className="col-md-6">
            <img src={image} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
