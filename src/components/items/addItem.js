import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { addItem, getItems } from "../../utils/api";
import { receiveItems } from "../../actions/items";
import { Route, Navigate, Routes } from "react-router-dom";

const AddItem = (props) => {
  const [Name, setName] = useState("");
  const [Price, setPrice] = useState("");
  const [Category, setCategory] = useState("");
  const [ItemCount, setItemCount] = useState("");
  const [imgPath, setImgPath] = useState("");

  function extractFilename(path) {
    if (path.substr(0, 12) == "C:\\fakepath\\")
      return path.substr(12); // modern browser
    var x;
    x = path.lastIndexOf('/');
    if (x >= 0) // Unix-based path
      return path.substr(x+1);
    x = path.lastIndexOf('\\');
    if (x >= 0) // Windows-based path
      return path.substr(x+1);
    return path; // just the filename
  }

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
      img:`/images/${extractFilename(imgPath)}`,
    };

    addItem(bluePrint);
    getItems().then((res) => {
      props.dispatch(receiveItems(res));
    });
  };

  return (
    < >
      {props.authedUser == null ? (
        <Routes>
          <Route path="*" element={<Navigate to="/signin" />} />
        </Routes>
      ) : props.authedUser.owner ? 
        <div className="add-item-page">
          <div style={{marginTop:"50px"}}>
          <input
            type="input"
            className="sign-in-input"
            placeholder="Item Name"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <br />
          <br />
          <input
            type="number"
            className="sign-in-input"
            placeholder="Item Price"
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          />
          <br />
          <br />
          <input
            type="number"
            className="sign-in-input"
            placeholder="Item Count"
            onChange={(e) => {
              setItemCount(e.target.value);
            }}
          /> 
          <br />
          <br />
          <input
            type="file"
            className="custom-file-input"
            placeholder="Item Count"
            onChange={(e) => {
              setImgPath(e.target.value);
            }}
          /> 
          </div>
          <br />
          <br />
          <div style={{ textAlign: "left", marginLeft: "25%" }}>
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
          <button className="add-to-cart-btn"
            onClick={() => {
              if (window.confirm("are you sure you all the information are correct")) {
                handleAddItem();}
              window.alert("Item Added Successfuly")
            }}
          >
            Add item
          </button>{" "}
        </div>
      : (
        <Routes>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      )}
    </>
  );
};

function mapStateToProps({ authedUser }) {
  return {
    authedUser,
  };
}

export default connect(mapStateToProps)(AddItem);
