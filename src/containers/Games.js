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
        <div>
          <div>
            <input
              type="button"
              className="save-collection-button"
              value="Save to collection"
            />
            <Link to={`/${id}/review`} className="add-review-button">
              Add a review
            </Link>
          </div>
          <div>
            <div>
              <p className="game-desc-grey">Plateforms</p>
              <p>------------- TO BE DEFINED -------------</p>
            </div>
            <div>
              <p className="game-desc-grey">Genre</p>
              <p>{data.genres[0].name}</p>
            </div>
            <div>
              <p className="game-desc-grey">Release date</p>
              <p>{data.released}</p>
            </div>
            <div>
              <p className="game-desc-grey">Developer</p>
              <p>{data.developers[0].name}</p>
            </div>
            <div>
              <p className="game-desc-grey">Publisher</p>
              <p>{data.publishers[0].name}</p>
            </div>
            <div>
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
      <div>
        <h4>Games like {data.name}</h4>
      </div>
      <div className="reviews-div">
        <h4>Reviews</h4>
        <div>
          {reviews.length > 0 ? (
            reviews.map((review, index) => {
              return (
                <div key={index}>
                  <p>Most relevant reviews</p>
                  <div key={review.id} className="review">
                    <p>{review.title}</p>
                    <p>{review.text}</p>
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
