import { getCart} from "../../utils/api";
import { connect } from "react-redux";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { receiveItems } from "../../actions/items";
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
  
  const handleCheckOut=()=>{
    let allItems=props.items;
    
    cartItems.forEach((item)=>{
      for(let i=0;i<props.itemsIds.length;i++){
        
        if(allItems[props.itemsIds[i]].name===item.item.name){
          
          allItems[props.itemsIds[i]].itemsCount-=item.boughtCount;
          console.log("item after update",allItems[props.itemsIds[i]]);
        }
      }
    })
    
    return props.dispatch(receiveItems(allItems));
  }
  
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
    <button onClick={()=>{handleCheckOut()}}> checkOut</button>
    </div>
  );
};


function mapStateToProps({authedUser,items}){
  let itemsIds=Object.keys(items);
  return {
    authedUser,
    items,
    itemsIds,
  }
}
export default connect(mapStateToProps)(Cart);