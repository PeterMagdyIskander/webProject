import { getCart } from "../../utils/api";
import { connect } from "react-redux";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { receiveItems } from "../../actions/items";
import CartItem from "./CartItem";

const Cart = (props) => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const getTheCart = () => {
      let cart = getCart();
      cart.then((res) => {
        setCartItems(res);
      });
    };
    getTheCart();
  }, [cartItems]);

  useEffect(() => {
    const calculateTotal = () => {
      let sum = 0;
      cartItems.forEach((item) => {
        sum += +item.item.price * +item.boughtCount;
      });
      setTotal(sum);
    };
    calculateTotal();
  }, [cartItems, total]);

  const handleCheckOut = () => {
    let allItems = props.items;

    cartItems.forEach((item) => {
      for (let i = 0; i < props.itemsIds.length; i++) {
        if (allItems[props.itemsIds[i]].name === item.item.name) {
          allItems[props.itemsIds[i]].itemsCount -= item.boughtCount;
          console.log("item after update", allItems[props.itemsIds[i]]);
        }
      }
    });

    return props.dispatch(receiveItems(allItems));
  };

  return (
    <div className="container-centered">
      {props.authedUser == null ? (
        <Link to="/signup" />
      ) : (
        <div className="cart-cards">
          <button className="cart-button"
            disabled={index <= 0}
            onClick={() => {
              setIndex(index - 1);
            }}
          >
            prev item
          </button>
          <CartItem
            cart={cartItems}
            index={index}
          />
          <button className="cart-button"
            disabled={index >= cartItems.length-1}
            onClick={() => {
              setIndex(index + 1);
            }}
          >
            next item
          </button>
        </div>
      )}
      <p>total: {total}</p>
      <button
        
        disabled={cartItems.length === 0}
      >
        {" "}
       <Link onClick={() => {
          handleCheckOut();
        }} to='/'> checkOut</Link>
      </button>
      {cartItems.length === 0 ? (
        <p style={{ color: "red" }}> PLEASE BUY AN ITEM FIRST </p>
      ) : (
        <br />
      )}
    </div>
  );
};

function mapStateToProps({ authedUser, items }) {
  let itemsIds = Object.keys(items);
  return {
    authedUser,
    items,
    itemsIds,
  };
}
export default connect(mapStateToProps)(Cart);
