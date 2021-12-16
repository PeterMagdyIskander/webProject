import { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { handleInitialData } from "../actions/shared";
import SignIn from "./authentication/signIn";
import SignUp from "./authentication/signUp";
import AddItem from "./items/addItem";
import Item from "./items/item";
import ItemsPage from "./items/items";
import NavBar from "./Navigation/navBar";
import Cart from "./shoppingCart/Cart";

function App(props) {
  useEffect(() => {
    props.dispatch(handleInitialData());
  });
  return (
    <Router>
      <Fragment>
        <NavBar />
        <Routes>
          <Route path="/" exact element={<ItemsPage />} />
          <Route path="/item/:id" element={<Item />} />
          <Route path="/myshoppingcart" element={<Cart />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/additem" element={<AddItem />} />
        </Routes>
      </Fragment>
    </Router>
  );
}

export default connect()(App);
