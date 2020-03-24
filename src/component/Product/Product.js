import React from "react";
import "./Product.css";
import { Link } from "react-router-dom";
function Product(props) {
  const { image, title, shortDescription, price, key } = props.product;
  return (
    <div className="single_product col-md-4">
      <Link to={"product/" + key}>
        <div className="item">
          <img src={image} alt="" />
          <h2>{title}</h2>
          <p>{shortDescription}</p>
          <b>$ {price}</b>
        </div>
      </Link>
    </div>
  );
}

export default Product;
