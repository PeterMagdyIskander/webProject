import { connect } from "react-redux";
import { Link } from "react-router-dom";
import OwnerNavBar from "./OwnerNavbar";
import UserNavBar from "./UserNavbar";
const NavBar = (props) => {
  return (
    <div>
      {props.authedUser == null ? (
        <div >
          <p> [OUR LOGO] Happy Shopping </p>{" "}
          <Link to="/signin" activeclassname="active">
            <button >Sign in</button>
          </Link>
        </div>
      ) : props.authedUser.owner ? (
        <OwnerNavBar />
      ) : (
        <UserNavBar />
      )}
    </div>
  );
};

function mapStateToProps({ authedUser }) {
  return {
    authedUser,
  };
}
export default connect(mapStateToProps)(NavBar);
