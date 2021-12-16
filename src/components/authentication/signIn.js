import { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { signIn } from "../../utils/api";
import { setAuthedUser } from "../../actions/authedUser";
const SignIn = (props) => {
  const { dispatch } = props;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleOnClick = () => {
    let user = signIn(username, password);
    user.then((res) => {
        console.log(res)
        dispatch(setAuthedUser(res));
    });
  };
  return (
    <div>
      <input
        type="input"
        onChange={(e) => {
          setUsername(e.target.value);
        }}
        placeholder="Please Enter You Username"
      />
      <input
        type="password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        placeholder="Please Enter You Password"
      />
      <br />
      <br />
      <button
        onClick={() => {
          handleOnClick();
        }}
      >
        <Link to='/'>Login</Link>
      </button>
      <br />
      <br />
      <br />
      <button>
        <Link to="/signup">Don't Have an account?</Link>
      </button>
    </div>
  );
};
export default connect()(SignIn);
