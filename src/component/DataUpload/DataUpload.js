import React from "react";
import fakeData from "../../fakeData";

function DataUpload() {
  const handleDataUpload = () => {
    console.log(fakeData);
    fetch("http://localhost:4200/foodProduct", {
      method: "POST",
      body: JSON.stringify(fakeData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-2">
          <h1>Database Foods data Upload</h1>
          <button onClick={handleDataUpload}>Upload</button>
        </div>
      </div>
    </div>
  );
}

export default DataUpload;
