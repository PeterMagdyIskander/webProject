import { connect } from "react-redux";
import { Link } from "react-router-dom";

const ItemCard = (props) => {
  return (
    <Link to={`/item/${props.id}`}>
      <div>
        <img alt="iphone" src={props.items.img} width={"auto"} height={"200px"}/>
        <p>{props.items.name}</p>
      </div>
      </Link>
  );
};
export default connect()(ItemCard);