import axios from "axios";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import HowItWorks from "../components/HowItWorks";

const Login = ({ setUser }) => {
  let history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();

      const response = await axios.post(
        "https://gamepad-backend-project.herokuapp.com/user/login",
        {
          email: email,
          password: password,
        }
      );

      if (response.data.token) {
        setUser(response.data.token);
        history.push("/");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <main>
      <div className="global-login-div">
        <HowItWorks />
        <div className="login-div">
          <h3>Login</h3>
          <form onSubmit={handleSubmit}>
            <input
              className="login-inputs"
              type="text"
              placeholder="Email..."
              onChange={(event) => setEmail(event.target.value)}
            />
            <input
              className="login-inputs"
              type="password"
              placeholder="Password..."
              onChange={(event) => setPassword(event.target.value)}
            />
            <input
              className="login-inputs signup-connexion-button"
              type="submit"
              value="Se connecter"
            />
          </form>
          <Link to="/signup">Don't have an account yet ? Click here !</Link>
        </div>
      </div>
    </main>
  );
};

export default Login;
