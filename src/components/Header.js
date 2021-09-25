import { Link, useHistory } from "react-router-dom";
import Logo from "../assets/img/gamepad-logo.svg";

const Header = ({ userToken, setUser }) => {
  let history = useHistory();

  const disconnect = () => {
    setUser(null);
    history.push("/");
  };

  return userToken ? (
    <header>
      <Link to="/" className="left-header">
        <img src={Logo} alt="Logo" className="header-logo" />
        <h1>Gamepad</h1>
      </Link>
      <div className="right-header">
        <Link to="/collection" className="collection-button">
          My Collection
        </Link>
        <input
          className="disconnect-button"
          type="button"
          value="Se déconnecter"
          onClick={disconnect}
        />
      </div>
    </header>
  ) : (
    <header>
      <Link to="/" className="left-header">
        <img src={Logo} alt="Logo" className="header-logo" />
        <h1>Gamepad</h1>
      </Link>
      <div className="right-header">
        <Link to="/collection" className="collection-button">
          My Collection
        </Link>
        <Link to="/login" className="login-button">
          Login
        </Link>
      </div>
    </header>
  );
};

export default Header;
