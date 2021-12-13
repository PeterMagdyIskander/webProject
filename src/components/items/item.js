import { useEffect, useState } from "react";
import { connect } from "react-redux";

import { useParams } from "react-router-dom";
const Item = (props) => {
  const [item, setItem] = useState({});
  const { id } = useParams();
  const getItem = (id) => {
    const itemsIds = Object.keys(props.items);
    for (let i = 0; i < itemsIds.length; i++) {
      if (props.items[itemsIds[i]].id === id) {
        setItem(props.items[itemsIds[i]]);
        console.log(item);
        break;
      }
    }
  };
  useEffect(()=>{
      getItem(id);
  })
  return (
    <div>
      <p>name {item.name}</p>
      <p>count {item.itemsCount}</p>
    </div>
  );
};

function mapStateToProps({ items }) {
  return {
    items,
  };
}

export default connect(mapStateToProps)(Item);
