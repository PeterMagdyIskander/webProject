import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { addItem, getItems } from "../../utils/api";
import { receiveItems } from "../../actions/items";
import { Route,Navigate,Routes} from "react-router-dom";
const AddItem = (props) => {
  const [Name, setName] = useState("");
  const [Price, setPrice] = useState("");
  const [Category, setCategory] = useState("");
  const [ItemCount, setItemCount] = useState("");
  const [signedIn,setSignedIn]=useState(false);
  const [isOwner,setIsOwner]=useState(false);
  function generateItemId() {
    return Math.random().toString(36).substring(2, 15);
  }

  const handleAddItem = () => {
    console.log(props.authedUser);
    let id = generateItemId();
    let bluePrint = {
      owner: props.authedUser.id,
      id: id,
      name: Name,
      category: Category,
      price: Price,
      itemsCount: ItemCount,
    };
    addItem(bluePrint);
    getItems().then((res) => {
      props.dispatch(receiveItems(res));
    });
  };

  useEffect(()=>{
    if(props.authedUser !=null){
      setSignedIn(true);
      if(props.authedUser.owner){
        setIsOwner(true);
      }
    }
    
    console.log(signedIn,isOwner);
  },[props.authedUser, signedIn, isOwner])
  return (
    <div className="container-centered">
      { !signedIn ? <Routes>
        <Route
        path="*"
        element={<Navigate to="/signin" />}
    />
      </Routes>
       : isOwner ?  (
        <div>
          <input
            type="input"
            placeholder="Item Name"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <br />
          <input
            type="number"
            placeholder="Item Price"
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          />
          <br />
          <input
            type="number"
            placeholder="Item Count"
            onChange={(e) => {
              setItemCount(e.target.value);
            }}
          />
          <br />
          <div style={{ textAlign: "left", marginLeft: "32%" }}>
            <input
              type="radio"
              name="category"
              value="Electronics"
              onChange={(e) => {
                setCategory("Electronics");
              }}
            />
            Electronics
            <br />
            <input
              type="radio"
              name="category"
              value="Accessories"
              onChange={(e) => {
                setCategory("Accessories");
              }}
            />
            Accessories
          </div>
          <br />
          <button
            onClick={() => {
              handleAddItem();
            }}
          >
            Add item
          </button>{" "}
        </div>
      ):(
        <Routes>
        <Route
        path="*"
        element={<Navigate to="/" />}
    />
        </Routes>
      )}
    </div>
  );
};

function mapStateToProps({ authedUser }) {
  return {
    authedUser,
  };
}

export default connect(mapStateToProps)(AddItem);
