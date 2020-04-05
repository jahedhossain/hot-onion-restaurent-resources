import React from "react";
import "./App.css";
import Header from "./component/Header/Header";
import Banner from "./component/Banner/Banner";
import Blog from "./component/Blog/Blog";
import Footer from "./component/Footer/Footer";
import Shop from "./component/Shop/Shop";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Details from "./component/Details/Details";
import NoMatch from "./component/NoMatch/NoMatch";

import Signup from "./component/Signup/Signup";
import Login from "./component/Login/Login";
import Delivery from "./component/Review/Review";
import PrivateRoute from "./PrivateRoute";
import DataUpload from "./component/DataUpload/DataUpload";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Header></Header>
            <Banner></Banner>
            <Shop></Shop>
            <Blog></Blog>
            <Footer></Footer>
          </Route>
          <Route path="/product/:productKey">
            <Header></Header>
            <Details></Details>
          </Route>
          <PrivateRoute path="/review">
            <Header></Header>
            <Delivery></Delivery>
          </PrivateRoute>
          <Route path="/signup">
            <Signup></Signup>
          </Route>
          <Route path="/login">
            <Login></Login>
          </Route>
          <Route path="/dataUpload">
            <DataUpload></DataUpload>
          </Route>
          <Route path="*">
            <NoMatch />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
