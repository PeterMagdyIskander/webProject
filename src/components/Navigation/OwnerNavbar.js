import { Link } from "react-router-dom";
import { setAuthedUser } from "../../actions/authedUser";
import { connect } from "react-redux";
const OwnerNavbar = (props) => {
  const {dispatch}=props;
  const signOut = () => {
    console.log("Successufully Signed out");
    dispatch(setAuthedUser(null));
  };
  return (
    <div>
      <nav>
        <ul style={{"display":"flex" ,justifyContent:"space-evenly"}}>
          <li>
            <Link to="/">Browser Items</Link>
          </li>
          <li>
            <Link to="/AddItem">Add Item</Link>
          </li>
          <li>
          <Link to="/myshoppingcart" >My Cart</Link>
          </li>
          <li>
          <Link to="/" onClick={signOut}>Sign out</Link>
          </li>
          
        </ul>
      </nav>
    </div>
  );
};
export default connect()(OwnerNavbar);
