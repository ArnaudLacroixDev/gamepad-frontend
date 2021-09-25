import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

import HowItWorks from "../components/HowItWorks";

const Signup = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [avatar, setAvatar] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const history = useHistory();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
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
    } catch (error) {
      console.log(error.message);

      if (error.response.status === 409) {
        setErrorMessage("Cet email est déjà utilisé !");
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
            <input
              className="signup-inputs"
              type="email"
              placeholder="Email..."
              onChange={(event) => setEmail(event.target.value)}
            />
            <p className="email-already-used">{errorMessage}</p>
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

            <input
              type="file"
              onChange={(event) => {
                setAvatar(event.target.files[0]);
              }}
            />
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
