import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";
import { Redirect, useHistory, useParams } from "react-router-dom";

const Review = () => {
  const history = useHistory();
  const { id } = useParams();
  const userToken = Cookies.get("userToken");

  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewText, setReviewText] = useState("");

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const response = await axios.post(
        `https://gamepad-backend-project.herokuapp.com/${id}/review`,
        {
          title: reviewTitle,
          text: reviewText,
        }
      );
      console.log(response);
      history.push("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return userToken ? (
    <main>
      <div>
        <h4>Write a review</h4>
        <form onSubmit={handleSubmit}>
          <div>
            <p>Review title</p>
            <input
              type="text"
              onChange={(event) => setReviewTitle(event.target.value)}
            />
          </div>
          <div>
            <p>Review text</p>
            <input
              type="text"
              onChange={(event) => setReviewText(event.target.value)}
            />
          </div>
          <input type="submit" value="Publish" />
        </form>
      </div>
    </main>
  ) : (
    <Redirect to="/login" />
  );
};

export default Review;
