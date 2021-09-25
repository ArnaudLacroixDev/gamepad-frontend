import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";

//components import
import Header from "./components/Header";
import Footer from "./components/Footer";
//Containers import
import Home from "./containers/Home";
import Games from "./containers/Games";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import Review from "./containers/Review";
import Collection from "./containers/Collection";

function App() {
  const [userToken, setUserToken] = useState(Cookies.get("userToken" || null));

  const setUser = (token) => {
    if (token) {
      Cookies.set("userToken", token, { expires: 7 });
      setUserToken(token);
    } else {
      Cookies.remove("userToken");
      setUserToken(null);
    }
  };

  return (
    <Router>
      <Header setUser={setUser} userToken={userToken} />
      <Switch>
        <Route path="/collection">
          <Collection />
        </Route>
        <Route path="/login">
          <Login setUser={setUser} />
        </Route>
        <Route path="/signup">
          <Signup setUser={setUser} />
        </Route>
        <Route path="/games/:id">
          <Games />
        </Route>
        <Route path="/:id/review">
          <Review />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
