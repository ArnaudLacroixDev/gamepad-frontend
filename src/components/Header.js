import "./Header.css";
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
      <Link to="/" className="header-left">
        <img src={Logo} alt="Logo" className="header-logo" />
        <h1>Gamepad</h1>
      </Link>
      <div className="header-right">
        <Link to="/collection" className="header-collection-button">
          My Collection
        </Link>
        <input
          className="header-disconnect-button"
          type="button"
          value="Se déconnecter"
          onClick={disconnect}
        />
      </div>
    </header>
  ) : (
    <header>
      <Link to="/" className="header-left">
        <img src={Logo} alt="Logo" className="header-logo" />
        <h1>Gamepad</h1>
      </Link>
      <div className="header-right">
        <Link to="/collection" className="header-collection-button">
          My Collection
        </Link>
        <Link to="/login" className="header-login-button">
          Login
        </Link>
      </div>
    </header>
  );
};

export default Header;
