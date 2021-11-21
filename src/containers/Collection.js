import "./Collection.css";
import Cookies from "js-cookie";
import { Redirect } from "react-router-dom";

const Collection = () => {
  const userToken = Cookies.get("userToken");

  return userToken ? (
    <main>
      <div className="collection-div">
        <h3>My collection</h3>
        <p>This functionnality will be implemented soon.. Stay tuned !</p>
      </div>
    </main>
  ) : (
    <Redirect to="/login" />
  );
};

export default Collection;
