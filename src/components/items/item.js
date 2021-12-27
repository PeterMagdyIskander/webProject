import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { addItemToCart, getItem } from "../../utils/api";
import { useParams } from "react-router-dom";
import '../../styles/app.css'
const Item = (props) => {
  const [item, setItem] = useState({});
  const [count, setCount] = useState(0);
  const { id } = useParams();
  const buyItem = () => {
    const response = addItemToCart(id, count);
    response.then((res) => {
      console.log(res);
    });
  };
  useEffect(() => {
    const showItem = () => {
      let item = getItem(id);
      item.then((res) => {
        console.log(res);
        setItem(res);
      });
    };
    showItem();
  }, [id]);
  return (
    <div class="container-centered"
    >
      <p>{item.name}</p>
      <p>{item.price}</p>
      <img alt={item.name} src={item.img} className="item-img"/>
      <div style={{ display: "flex",justifyContent: "center" }}>
        <button
          disabled={count > item.itemsCount - 1}
          onClick={() => {
            setCount(count + 1);
          }}
        >
          +
        </button>
        <button
          disabled={count <= 0}
          onClick={() => {
            setCount(count - 1);
          }}
        >
          -
        </button>
      </div>
      <br />
      <button
        disabled={count === 0 || props.authedUser == null}
        onClick={buyItem}
      >
        {" "}
        Add to Cart{" "}
      </button>
      {item.itemsCount <= 0 ? (
        <p style={{ color: "red" }}>OUT OF STOCK</p>
      ) : (
        <br />
      )}
      
    </div>
  );
};

function mapStateToProps({ items, authedUser }) {
  return {
    items,
    authedUser,
  };
}

export default connect(mapStateToProps)(Item);
