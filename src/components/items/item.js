import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { addItemToCart, getItem } from "../../utils/api";
import { useParams } from "react-router-dom";
const Item = (props) => {
  const [item, setItem] = useState({});
  const [count, setCount] = useState(0);
  const { id } = useParams();
  const buyItem=()=>{
    const response =addItemToCart(id,count);
    response.then((res)=>{
      console.log(res);
    })
  }
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
    <div>
      <p>name {item.name}</p>
      <p>price {item.price}</p>
      <div style={{ display: "flex" }}>
        <button
          onClick={() => {
            setCount(count + 1);
          }}
        >
          +
        </button>
        <button
          onClick={() => {
            setCount(count - 1);
          }}
        >
          -
        </button>
      </div>
      {count}
      <button disabled={props.authedUser==null} onClick={buyItem}> Add to Cart </button>
    </div>
  );
};

function mapStateToProps({ items,authedUser }) {
  return {
    items,
    authedUser,
  };
}

export default connect(mapStateToProps)(Item);
