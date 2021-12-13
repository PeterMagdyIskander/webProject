
import { connect } from "react-redux";
import ItemCard from "./itemCard";
const ItemsPage = (props) => {
  const{itemsIds,items}=props;
  return (
        <div>
        <h1>all items</h1>
      <ol>
        {itemsIds.map((id) => (
          <li key={id}>
            <ItemCard items={items[id]} id={items[id].id} />{" "}
          </li>
        ))}
      </ol>
         </div>
     
  );
};

function mapStateToProps({items}){
  let itemsIds=Object.keys(items);
  return {
    itemsIds,
    items,
  }
}
export default connect(mapStateToProps)(ItemsPage);
