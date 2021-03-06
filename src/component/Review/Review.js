import React, { useEffect, useState } from "react";
import "./Review.css";
import { useForm } from "react-hook-form";
import "firebase/auth";
import "firebase/firestore";
import {
  getDatabaseCart,
  addToDatabaseCart,
  processOrder,
} from "../../utilities/databaseManager";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../CheckoutForm/CheckoutForm";

function Review() {
  const [shipment, setShipment] = useState(null);
  const [shipmentSubmit, setShipmentSubmit] = useState(false);
  const [ordercomplete, setOrdercomplete] = useState(false);
  console.log(shipmentSubmit);

  const stripePromise = loadStripe(
    "pk_test_CCTVlzili93AXMTeFygvz2ls00ONxhFAcj"
  );

  const [products, setProducts] = useState([]);
  const [price, setPrice] = useState({
    price: "",
    tex: "",
    delivery: "",
    totalPrice: "",
    quantity: "",
  });

  // console.log(products);

  // card data store
  useEffect(() => {
    const savedCart = getDatabaseCart();
    const productKeys = Object.keys(savedCart);

    fetch("https://sheltered-lake-15300.herokuapp.com/foodProductKeys", {
      method: "POST",
      body: JSON.stringify(productKeys),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const cartProducts = productKeys.map((key) => {
          const product = data.find((pd) => pd.key === key);
          product.quantity = savedCart[key];
          return product;
        });
        setProducts(cartProducts);
      })
      .catch((err) => console.log(err));
  }, []);

  // + button click increment
  const handleIncrement = (storeProducts) => {
    const update = [...products];
    const cartproduct = update.find(
      (product) => product.key === storeProducts.key
    );
    cartproduct.quantity = cartproduct.quantity + 1;
    setProducts(update);
    addToDatabaseCart(cartproduct.key, cartproduct.quantity);
  };

  // - button click decrement
  const handleDecrement = (storeProducts) => {
    const update = [...products];
    const cartproduct = update.find(
      (product) => product.key === storeProducts.key
    );
    cartproduct.quantity = cartproduct.quantity - 1;
    setProducts(update);
    addToDatabaseCart(cartproduct.key, cartproduct.quantity);
  };

  useEffect(() => {
    // price
    const allPrice = products.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
    // Quantity
    const quantity = products.reduce(
      (total, product) => total + product.quantity,
      0
    );
    // Tex
    const tex = (allPrice / 100) * 15;
    // Delivery
    const delivery = 2;
    // Total_Price
    const totalPrice = tex + delivery + allPrice;

    const newPrice = {
      ...price,
      price: allPrice.toFixed(2),
      tex: tex.toFixed(2),
      delivery: delivery.toFixed(2),
      totalPrice: totalPrice.toFixed(2),
      quantity: quantity,
    };
    setPrice(newPrice);
  }, [products]);

  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => {
    setShipment(data);
    setShipmentSubmit(true);
  };
  const completeOrder = (paymentData) => {
    const order = {
      ...shipment,
      paymentData: paymentData,
    };

    fetch("https://sheltered-lake-15300.herokuapp.com/foodOrder", {
      method: "POST",
      body: JSON.stringify(order),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setOrdercomplete(data);
        processOrder();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container delivery">
      <div className="row">
        <div className="col">
          <ul className="d-flex justify-content-center ">
            <li>Breakfast</li>
            <li>Dinner</li>
            <li>Lunch</li>
          </ul>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-md-4" style={{ display: ordercomplete && "none" }}>
          <h2>Edit Delivery Deatails</h2>
          <form className="form-group" onSubmit={handleSubmit(onSubmit)}>
            <input
              className="form-control"
              name="dor"
              placeholder="Deliver to door"
              type="text"
              ref={register({ required: true })}
            />
            {errors.dor && <span>Deliver to door name field is required</span>}
            <input
              className="form-control"
              name="road"
              placeholder="107 RD NO 8"
              type="text"
              ref={register({ required: true })}
            />
            {errors.road && <span>road name field is required</span>}
            <input
              className="form-control"
              name="floor"
              placeholder="Flat, Suite or floor"
              type="text"
              ref={register({ required: true })}
            />
            {errors.floor && <span>floor name field is required</span>}
            <input
              className="form-control"
              name="business"
              placeholder="Business Name"
              type="text"
              ref={register({ required: true })}
            />
            {errors.business && <span>business name field is required</span>}

            <textarea
              className="form-control"
              name="instructor"
              placeholder="Add delivery instructor"
              id=""
              cols="30"
              rows="5"
              ref={register({ required: true })}
            ></textarea>

            {errors.instructor && (
              <span>instructor name field is required</span>
            )}

            <input type="submit" className="submit bg-danger btn" />
          </form>
        </div>
        <div className="col-md-4 offset-md-4">
          <div
            className="card-info"
            style={{ display: shipmentSubmit ? "none" : "block" }}
          >
            <div className="restaurant_info">
              <p>
                From: <strong>Gulshan Plaza Restaurant GPR</strong>
              </p>
              <p>Arriving in 20-30 min</p>
              107 Rd No 8
            </div>
            {products.length ? (
              products.map((product) => (
                <div className="product_list" key={product.key}>
                  <img src={product.image} alt="" />
                  <div className="content">
                    <h5>{product.title}</h5>
                    <h4>${product.price}</h4>
                    <p>Delivery fee</p>
                  </div>
                  <div className="quntati">
                    <span className="incrementDecrement">
                      <strong onClick={() => handleDecrement(product)}>
                        -
                      </strong>
                      <b>{product.quantity}</b>
                      <strong onClick={() => handleIncrement(product)}>
                        +
                      </strong>
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="mt-5 text-center"> Loading please wait</p>
            )}

            <div className="price_table">
              <div className="table">
                <p>Subtotal: {price.quantity} item</p>
                <p>${price.price}</p>
              </div>
              <div className="table">
                <p>Tex (15%)</p>
                <p>${price.tex}</p>
              </div>
              <div className="table">
                <p>Delivery fee</p>
                <p>${price.delivery}</p>
              </div>
              <div className="table">
                <h4>Total </h4>
                <p> ${price.totalPrice}</p>
              </div>
            </div>

            <button className="btn btn-outline-dark" disabled>
              Place Order
            </button>
          </div>
          <div
            className="checkoutFrom"
            style={{ display: shipmentSubmit ? "block" : "none" }}
          >
            <div className="form" style={{ display: ordercomplete && "none" }}>
              <Elements stripe={stripePromise}>
                <CheckoutForm completeOrder={completeOrder}></CheckoutForm>
              </Elements>
            </div>
          </div>
        </div>
        {ordercomplete && (
          <div>
            <h1> Your order complete</h1>
            <p>Your order Id: {ordercomplete.paymentData.id}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Review;
