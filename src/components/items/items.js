import { useEffect, useState } from "react";
import { connect } from "react-redux";
import ItemCard from "./itemCard";
const ItemsPage = (props) => {
  const { itemsIds, items } = props;
  const [minRange, setMinRange] = useState(0);
  const [maxRange, setMaxRange] = useState(99999);
  const [categories, setCategories] = useState([]);
  const [displayItemsIds, setDisplayItemsIds] = useState(itemsIds);

  const handleChangeForCategory = (e) => {
    if (!categories.includes(e.target.value) && e.target.checked) {
      setCategories([...categories, e.target.value]);
    } else if (categories.includes(e.target.value) && !e.target.checked) {
      let cats = categories.filter((cat) => {
        return cat !== e.target.value;
      });
      setCategories(cats);
    }
  };
  const checkCategory=(cat)=>{
    if(categories.length===0){
      return true;
    }else{
      return categories.includes(cat)
    }
  }
  const handleFilteration=()=>{
        let ids = itemsIds.filter((id) => {
        return +minRange <= +items[id].price && +maxRange >= +items[id].price&&checkCategory(items[id].category) ;
      });
      setDisplayItemsIds(ids);
      console.log(ids);
  }

  useEffect(() => {
    setDisplayItemsIds(itemsIds);
  }, [itemsIds]);
  return (
    <div style={{ display: "flex", height: "100%" }}>
      <div style={{ width: "20%" }}>
        <h1>Filter By Price</h1>
        <input
          type="number"
          placeholder="Minimum"
          onChange={(e) => {
            setMinRange(e.target.value);
          }}
        />
        <br />
        <input
          type="number"
          placeholder="Maximum"
          onChange={(e) => {
            setMaxRange(e.target.value);
          }}
        />
        <br/>
        <button
          onClick={() => {
            handleFilteration();
          }}
        >
          Confirm
        </button>
      </div>
      <div style={{ width: "80%" }}>
        <h1 style={{ textAlign: "center" }}>Items</h1>
        <ol>
          {displayItemsIds.map((id) => (
            <li key={id}>
              <ItemCard items={items[id]} id={items[id].id} />{" "}
            </li>
          ))}
        </ol>
      </div>
      <div style={{ width: "20%" }}>
        <h1>Filter By Category</h1>
        <input
          type="checkbox"
          id="Electronics"
          name="Electronics"
          value="Electronics"
          onChange={(e) => {
            handleChangeForCategory(e);
          }}
        />
        <label htmlFor="Electronics"> Electronics</label>
        <br />
        <input
          type="checkbox"
          id="Accessories"
          name="Accessories"
          value="Accessories"
          onChange={(e) => {
            handleChangeForCategory(e);
          }}
        />
        <label htmlFor="Accessories"> Accessories</label>
        <br />
        <button
          onClick={() => {
            handleFilteration();
          }}
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

function mapStateToProps({ items }) {
  let itemsIds = Object.keys(items);
  return {
    itemsIds,
    items,
  };
}
export default connect(mapStateToProps)(ItemsPage);
