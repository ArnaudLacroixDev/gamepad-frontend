import "./Home.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/img/gamepad-logo.svg";

import Loader from "../components/Loader";

const Home = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [count, setCount] = useState();

  const pagination = (count, page) => {
    let tab = [];
    if (page === 1) {
      tab.push(1, 2, 3, Math.ceil(count / 20));
    } else if (page === 2) {
      tab.push(1, 2, 3, 4, Math.ceil(count / 20));
    } else if (page === 3) {
      tab.push(1, 2, 3, 4, 5, Math.ceil(count / 20));
    } else if (page === 4) {
      tab.push(1, 2, 3, 4, 5, 6, Math.ceil(count / 20));
    } else if (page === 5) {
      tab.push(1, 3, 4, 5, 6, 7, Math.ceil(count / 20));
    } else if (page === Math.ceil(count / 20) - 1) {
      tab.push(1, page - 2, page - 1, page, page + 1);
    } else if (page === Math.ceil(count / 20)) {
      tab.push(1, page - 2, page - 1, page);
    } else if (page === Math.ceil(count / 20) - 2) {
      tab.push(1, page - 2, page - 1, page, page + 1, page + 2);
    } else {
      tab.push(
        1,
        page - 2,
        page - 1,
        page,
        page + 1,
        page + 2,
        Math.ceil(count / 20)
      );
    }

    return tab;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://gamepad-backend-project.herokuapp.com/?search=${search}&page=${page}`
        );
        setData(response.data);
        setCount(response.data.count);
        setIsLoading(false);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchData();
  }, [page, search]);

  return isLoading ? (
    <Loader />
  ) : (
    <main>
      <div className="home-search-div">
        <div className="home-title">
          <img src={Logo} alt="Logo" />
          <h2>Gamepad</h2>
        </div>
        <div className="home-searchbar-div">
          <input
            className="home-searchbar"
            type="search"
            placeholder="Search for a game..."
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
        <p className="home-total-games">Search in the {data.count} games</p>
      </div>
      <div className="home-most-relevance-games-div">
        <h3>Most relevance games</h3>
        <div className="home-most-relevance-games-list">
          {data.results.map((game) => {
            return (
              <div key={game.id} className="home-game-card">
                <Link to={`/game/${game.id}`}>
                  <img
                    className="home-game-image"
                    src={game.background_image}
                    alt={game.name}
                  />
                  <p className="home-game-title">{game.name}</p>
                </Link>
              </div>
            );
          })}
        </div>

        <div className="home-navigation">
          <input
            type="button"
            value="<"
            onClick={() => {
              setPage(page - 1);
            }}
            className="home-navigation-input home-inactive-page-button"
          />
          <div>
            {pagination(count, page).map((elem, index) => {
              return (
                <input
                  key={index}
                  type="button"
                  value={elem}
                  onClick={() => {
                    setPage(elem);
                  }}
                  className={
                    elem !== page
                      ? "home-navigation-input"
                      : "home-navigation-input home-active-page-button"
                  }
                />
              );
            })}
          </div>
          <input
            type="button"
            value=">"
            onClick={() => {
              setPage(page + 1);
            }}
            className="home-navigation-input home-inactive-page-button"
          />
        </div>
      </div>
    </main>
  );
};

export default Home;
