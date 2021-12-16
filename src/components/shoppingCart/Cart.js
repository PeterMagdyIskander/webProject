import { getCart} from "../../utils/api";
import { connect } from "react-redux";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const Cart = (props) => {
  const [cartItems, setCartItems] = useState([]);
    const [total,setTotal]=useState(0);
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
    const calculateTotal=()=>{
        let sum=0;
          cartItems.forEach(item=>{
              sum+=+item.item.price*+item.boughtCount;
            
          })
          setTotal(sum);
      }
      calculateTotal()
  }, [cartItems,total]);
  
  return (
    <div>
    {
      props.authedUser==null? <Link to="/signup"/>:
    <div><ul>
        {cartItems.map((item) => {
          return (
            <li key={item.item.id}>
              {" "}
              {item.item.name}
            </li>
          );
        })}
      </ul>
      <p>total : {total}</p> </div>
    }
    </div>
  );
};


function mapStateToProps({authedUser}){
  return {
    authedUser,
  }
}
export default connect(mapStateToProps)(Cart);
