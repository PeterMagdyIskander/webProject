import { connect } from "react-redux";
import { useState } from "react";
import { addItem,getItems } from "../../utils/api";
import { receiveItems } from "../../actions/items";
import { Link } from "react-router-dom";
const AddItem = (props) => {
  const [Name, setName] = useState("");
  const [Price, setPrice] = useState("");
  const [Category, setCategory] = useState("");
  const [ItemCount, setItemCount] = useState("");

  function generateItemId() {
    return Math.random().toString(36).substring(2, 15);
  }

  const handleAddItem=()=>{
    console.log(props.authedUser)
    let id=generateItemId();
    let bluePrint={
        "owner":props.authedUser.id,
        "id":id,
        "name":Name,
        "category":Category,
        "price":Price,
        "itemsCount":ItemCount,
    }
    addItem(bluePrint);
    getItems().then((res)=>{props.dispatch(receiveItems(res))});
    
  }
  return (
      <div>
      { props.authedUser==null? <Link to="/signup"/>:<div><input type="input" placeholder="Item Name" onChange={(e)=>{setName(e.target.value)}}/>
        <br/>
        <input type="number" placeholder="Item Price" onChange={(e)=>{setPrice(e.target.value)}}/>
        <br/>
        <input type="number" placeholder="Item Count" onChange={(e)=>{setItemCount(e.target.value)}}/>
        <br/>
        <input
        type="radio"
        name="category"
        value="Electronics"
        onChange={(e) => {
            setCategory("Electronics");
        }}
      />
      <label htmlFor="Electronics">Electronics</label>
      <br />
      <input
        type="radio"
        name="category"
        value="Accessories"
        onChange={(e) => {
            setCategory("Accessories");
        }}
      />
      <label htmlFor="Accessories">Accessories</label>
      <br />
    <button onClick={()=>{handleAddItem()}}>Add item</button> </div>}
    </div>
  )
};

function mapStateToProps({ authedUser }) {
    return {
        authedUser,
    };
  }

export default connect(mapStateToProps)(AddItem);
