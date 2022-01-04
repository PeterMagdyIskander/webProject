import { getCart, handleCheckOut, getItems } from "../../utils/api";
import { connect } from "react-redux";
import { useState, useEffect } from "react";
import { receiveItems } from "../../actions/items";
import CartItem from "./CartItem";
import { Route, Navigate, Routes } from "react-router-dom";
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";
const Cart = (props) => {
  const [cartItems, setCartItems] = useState([]);
  const [allItems, setAllItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [index, setIndex] = useState(0);
  const [checkedOut, setCheckOut] = useState(false);

  useEffect(() => {
    const getTheCart = () => {
      let cart = getCart(props.authedUser.id);
      cart
        .then((res) => {
          console.log(res);
          setCartItems(res.cart);
          setTotal(res.total);
        })
        .catch((res) => console.log(res));
    };

    if (props.authedUser != null) {
      getTheCart();
    }
  }, [cartItems]);

  const CheckOut = () => {
    let response = handleCheckOut(props.authedUser.id, props.authedUser.cart);
    response.then((res) => {
      console.log(res);
    });

    let allItemsRes = getItems();
    allItemsRes.then((res) => {
      setAllItems(res);
    });
    props.dispatch(receiveItems(allItems));
    setCheckOut(true);
    setCartItems([]);
    setTotal(0);
  };

  return (
    <>
      {
        props.authedUser === null ? (<Routes><Route path="*" element={<Navigate to="/signin" />} /></Routes>) :(<div className="container-centered">
        <div className="cart-cards">
          <button
            className="cart-button"
            disabled={index <= 0}
            onClick={() => {
              setIndex(index - 1);
            }}
          >
            <AiOutlineDoubleLeft size={28} />
          </button>
          <CartItem cart={cartItems} index={index} />
          <button
            className="cart-button"
            disabled={index >= cartItems.length - 1}
            onClick={() => {
              setIndex(index + 1);
            }}
          >
            <AiOutlineDoubleRight size={28} />
          </button>
      </div>
      <p>total: {total}</p>
      <button
        className="add-to-cart-btn"
        onClick={() => {
          if (window.confirm("are you sure you want to checkout")) {
            CheckOut();
          }
        }}
      >
        checkout
      </button>
      {cartItems.length === 0 ? (<p style={{ color: "red" }}> please add an item to cart </p>) : (null
      )}
        </div>)
      }
    </>
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
