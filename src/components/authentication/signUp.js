import { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { setAuthedUser } from "../../actions/authedUser";
import { signUp } from "../../utils/api";

const SignUp = (props) => {
  const { dispatch } = props;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [owner, setOwner] = useState(false);
  const handleSignUp = () => {
    let signup = signUp(username, name, password, owner);
    signup.then((res) => {
      console.log(res);
      dispatch(setAuthedUser(res));
    });
  };
  return (
    <div className="container-centered">
      <input
        type="input"
        onChange={(e) => {
          setUsername(e.target.value);
        }}
        placeholder="Please Enter You Username"
      />
      <br />
      <input
        type="input"
        onChange={(e) => {
          setName(e.target.value);
        }}
        placeholder="Please Enter You Fullname"
      />
      <br />
      <input
        type="password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        placeholder="Please Enter You Password"
      />
      <br />
      <input
        type="radio"
        id="owner"
        name="owner"
        value="owner"
        onChange={(e) => {
          setOwner(true);
        }}
      />
      <label htmlFor="owner">Owner</label>
      <br />
      <input
        type="radio"
        id="user"
        name="owner"
        value="user"
        onChange={(e) => {
          setOwner(false);
        }}
      />
      <label htmlFor="user">Normal User</label>
      <br />
      <button
        onClick={() => {
          handleSignUp();
        }}
      >
        <Link to='/'>
        Sign Up
        </Link>
      </button>
    </div>
  );
};
export default connect()(SignUp);
