import { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router,Route,Routes } from "react-router-dom";
import { handleInitialData } from "../actions/shared";
import Item from "./items/item";
import ItemsPage from "./items/items";
import Cart from "./shoppingCart/Cart";
function App(props) {
  useEffect(()=>{
    props.dispatch(handleInitialData());
  })
  return (
    <Router>
      <Fragment>
      <Routes>
        <Route  path="/items" element={<ItemsPage/>} />
        <Route  path="/item/:id" element={<Item/>} />
        <Route  path="/myshoppingcart" element={<Cart/>} />
      </Routes>
      </Fragment>
    </Router>
  );
}

export default connect()(App);
