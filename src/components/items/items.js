import { useEffect, useState } from "react";
import { connect } from "react-redux";
import ItemCard from "./itemCard";
const ItemsPage = (props) => {
  const { itemsIds, items } = props;
  const [minRange, setMinRange] = useState(0);
  const [maxRange, setMaxRange] = useState(35000);
  const [categories, setCategories] = useState([]);
  const [displayItemsIds, setDisplayItemsIds] = useState([]);

  const handleChangeForCategory = (e) => {
    if (!categories.includes(e.target.value) ) {
      setCategories([...categories, e.target.value]);
    } else if (categories.includes(e.target.value)) {
      let cats = categories.filter((cat) => {
        return cat !== e.target.value;
      });
      setCategories(cats);
    }
    
  };
  const checkCategory = (cat) => {
    if (categories.length === 0) {
      return true;
    } else {
      return categories.includes(cat);
    }
  };
  const handleFilteration = () => {
    console.log(categories)
    let ids = itemsIds.filter((id) => {
      return (
        +minRange <= +items[id].price &&
        +maxRange >= +items[id].price &&
        checkCategory(items[id].category)
      );
    });
    setDisplayItemsIds(ids);
    console.log(ids);
  };

  useEffect(() => {
    setDisplayItemsIds(itemsIds);
   const handleFilter=()=>{
    handleFilteration();
   }
   handleFilter();
  },[itemsIds,categories]);

  return (
    <div  className="items-page">
      <div className="filter">
        <h1 className="centered">Filter By <br/>Price</h1>
        <div style={{display:"flex"}}>
          <p>min</p>
          <input
          type="range"
          min="0" max="100000" value={minRange}
          onChange={(e) => {
            setMinRange(e.target.value);
            handleFilteration();
          }}
        />
        <p>{minRange}</p>
        </div>
        
        <br />
        <div style={{display:"flex"}}>
          <p>max</p>
          <input
         type="range"
          min="0" max="100000" value={maxRange}
          placeholder="Maximum"
          onChange={(e) => {
            setMaxRange(e.target.value);
            handleFilteration();
          }}
        />
        <p>
        {maxRange}
        </p>
        </div>
        
        <br />

        <h1 className="centered">Filter By Category</h1>
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
      </div>
      <div className="items">
        <h1 className="centered">Items</h1>
        <ul
          style={{
            display: "flex",
            flexWrap: "wrap",
            listStyle: "none",
            justifyContent: "space-evenly",
          }}
        >
          {displayItemsIds.length>0 ? displayItemsIds.map((id) => (
            <li
              style={{ width: "auto", margin: "10px", textAlign: "center" }}
              key={id}
            >
              <ItemCard items={items[id]} id={items[id].id} />{" "}
            </li>
          )) : <div>No Items For This Combination</div>}
        </ul>
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
