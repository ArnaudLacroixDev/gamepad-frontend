import "./LoginSignup.css";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

import HowItWorks from "../components/HowItWorks";

const Signup = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mailError, setMailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [usernameError, setUsernameError] = useState("");

  const history = useHistory();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();

      if (password === confirmPassword) {
        const response = await axios.post(
          "https://gamepad-backend-project.herokuapp.com/user/signup",
          {
            email: email,
            username: username,
            password: password,
          }
        );

        if (response.data.token) {
          setUser(response.data.token);
          history.push("/");
        }
      } else {
        setPasswordError("Passwords don't match !");
      }
    } catch (error) {
      if (error.response.status === 409) {
        setMailError("This email is already used !");
      } else if (error.response.status === 400) {
        setUsernameError("Please choose your username");
      }
    }
  };

  return (
    <main>
      <div className="global-signup-div">
        <HowItWorks />
        <div className="signup-div">
          <h3>Sign up</h3>
          <form onSubmit={handleSubmit}>
            <input
              className="signup-inputs"
              type="text"
              placeholder="Username..."
              onChange={(event) => setUsername(event.target.value)}
            />
            <p className="signup-login-errors">{usernameError}</p>
            <input
              className="signup-inputs"
              type="email"
              placeholder="Email..."
              onChange={(event) => setEmail(event.target.value)}
            />
            <p className="signup-login-errors">{mailError}</p>
            <div className="password-div">
              <input
                className="password-inputs"
                type="password"
                placeholder="Password..."
                onChange={(event) => setPassword(event.target.value)}
              />
              <input
                className="password-inputs"
                type="password"
                placeholder="Confirm password..."
                onChange={(event) => setConfirmPassword(event.target.value)}
              />
            </div>
            <p className="signup-login-errors">{passwordError}</p>
            <input
              className="signup-inputs signup-connexion-button"
              type="submit"
              value="S'inscrire"
            />
          </form>
          <Link to="/login">You already have an account ? Click here !</Link>
        </div>
      </div>
    </main>
  );
};

export default Signup;
