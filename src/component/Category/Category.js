import React from "react";
import "./Category.css";
export default function Category(props) {
  return (
    <div>
      <div className="product_category">
        <div className="container">
          <div className="row">
            <div className="col d-flex justify-content-center align-items-center">
              <button
                onClick={props.hendleBreakfast}
                className={
                  props.addClass.breakfastActive
                    ? "btn btn-outline-dark active"
                    : " btn btn-outline-dark"
                }
              >
                Breakfast
              </button>
              <button
                onClick={props.hendleDiner}
                className={
                  props.addClass.dinnerActive
                    ? "btn btn-outline-dark active"
                    : " btn btn-outline-dark"
                }
              >
                Dinner
              </button>
              <button
                onClick={props.hendleLunch}
                className={
                  props.addClass.lunchActive
                    ? "btn btn-outline-dark active"
                    : " btn btn-outline-dark"
                }
              >
                Lunch
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
