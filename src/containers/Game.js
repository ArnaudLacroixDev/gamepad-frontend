import "./Game.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const Games = () => {
  const [data, setData] = useState();
  const [reviews, setReviews] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://gamepad-backend-project.herokuapp.com/game/${id}`
        );

        const reviews = await axios.get(
          `https://gamepad-backend-project.herokuapp.com/game/reviews/${id}`
        );

        setData(response.data);
        setReviews(reviews.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchData();
  }, [id]);

  return isLoading ? (
    <main className="loader-div">
      <div class="loader">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <p>Loading, please wait...</p>
    </main>
  ) : (
    <main>
      <h3 className="game-name">{data.name}</h3>
      <div className="game-div">
        <img
          className="game-picture"
          src={data.background_image}
          alt={data.name}
        />
        <div className="game-right-section">
          <div className="game-collection-and-review-div">
            <input
              className="game-save-collection-button"
              type="button"
              value="Save to collection"
            />
            <Link to={`/${id}/review`} className="game-add-review-button">
              Add a review
            </Link>
          </div>
          <div className="game-table-categories">
            <div className="game-category-section">
              <p className="game-desc-grey">Plateforms</p>
              <p>TBD</p>
            </div>
            <div className="game-category-section">
              <p className="game-desc-grey">Genre</p>
              <p>{data.genres[0].name}</p>
            </div>
            <div className="game-category-section">
              <p className="game-desc-grey">Release date</p>
              <p>{data.released}</p>
            </div>
            <div className="game-category-section">
              <p className="game-desc-grey">Developer</p>
              <p>{data.developers[0].name}</p>
            </div>
            <div className="game-category-section">
              <p className="game-desc-grey">Publisher</p>
              <p>{data.publishers[0].name}</p>
            </div>
            <div className="game-category-section">
              <p className="game-desc-grey">Age rating</p>
              <p>{data.esrb_rating.id}</p>
            </div>
            <div>
              <p className="game-desc-grey">About</p>
              <p className="game-about-game">{data.description}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="game-reviews-div">
        <h4>Reviews</h4>
        <div>
          {reviews.length > 0 ? (
            reviews.map((review, index) => {
              return (
                <div key={index}>
                  <div key={review.id} className="game-review">
                    <h5>{review.title}</h5>
                    <p className="game-review-text">{review.text}</p>
                  </div>
                </div>
              );
            })
          ) : (
            <div>There's no review for this game yet.</div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Games;
