import { connect } from "react-redux";
import { Link } from "react-router-dom";
const ItemCard = (props) => {
  return (
    <Link to={`/item/${props.id}`}>
      <div>
        <h1>{props.items.name}</h1>
        <button>view more info</button>
      </div>
      </Link>
  );
};
export default connect()(ItemCard);