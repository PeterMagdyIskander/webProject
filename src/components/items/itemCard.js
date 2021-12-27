import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "../../styles/app.css"
const ItemCard = (props) => {
  return (
    <Link to={`/item/${props.id}`}>
      <div >
        <img alt="iphone" src={props.items.img} className="item-img"/>
        <div >{props.items.name}</div>
      </div>
      </Link>
  );
};
export default connect()(ItemCard);