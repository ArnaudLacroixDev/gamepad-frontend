import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const Games = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [reviews, setReviews] = useState();

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://gamepad-backend-project.herokuapp.com/games/${id}`
        );

        const reviews = await axios.get(
          `https://gamepad-backend-project.herokuapp.com/games/reviews/${id}`
        );

        setReviews(reviews.data);
        console.log("console.log de reviews dans le useEffect ===>", reviews);
        setData(response.data);

        setIsLoading(false);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchData();
  }, [id]);

  return isLoading ? (
    <p className="home-loader">En cours de chargement..</p>
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
          <div className="collection-and-review-div">
            <input
              className="save-collection-button"
              type="button"
              value="Save to collection"
            />
            <Link to={`/${id}/review`} className="add-review-button">
              Add a review
            </Link>
          </div>
          <div className="table-categories">
            <div className="category-section">
              <p className="game-desc-grey">Plateforms</p>
              <p>TBD</p>
            </div>
            <div className="category-section">
              <p className="game-desc-grey">Genre</p>
              <p>{data.genres[0].name}</p>
            </div>
            <div className="category-section">
              <p className="game-desc-grey">Release date</p>
              <p>{data.released}</p>
            </div>
            <div className="category-section">
              <p className="game-desc-grey">Developer</p>
              <p>{data.developers[0].name}</p>
            </div>
            <div className="category-section">
              <p className="game-desc-grey">Publisher</p>
              <p>{data.publishers[0].name}</p>
            </div>
            <div className="category-section">
              <p className="game-desc-grey">Age rating</p>
              <p>{data.esrb_rating.id}</p>
            </div>
            <div>
              <p className="game-desc-grey">About</p>
              <p className="about-game">{data.description}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="games-like">
        <h4>Games like {data.name}</h4>
        <p>Display to be added soon...</p>
      </div>
      <div className="reviews-div">
        <h4>Reviews</h4>
        <div>
          {reviews.length > 0 ? (
            reviews.map((review, index) => {
              return (
                <div key={index}>
                  <div key={review.id} className="review">
                    <h5>{review.title}</h5>
                    <p className="review-text">{review.text}</p>
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
