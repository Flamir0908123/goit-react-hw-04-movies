import React, { useState, useEffect } from "react";
import * as movieAPI from "../services/services";
import PropTypes from "prop-types";
import Loader from "react-loader-spinner";

export default function ReviewsView({ id }) {
  const [reviews, setReviews] = useState(null);
  useEffect(() => {
    movieAPI.fetchReviews(id).then((r) => setReviews(r.results));
  }, [id]);
  if (reviews) {
    if (reviews.length === 0) {
      return <h3>no reviews</h3>;
    }
    return (
      <ul>
        {reviews.map(({ author, content, id }) => (
          <li key={id}>
            <h3>{author}</h3>
            <p>{content}</p>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <Loader
      type="Puff"
      color="black"
      height={100}
      width={100}
      timeout={1000} //3 secs
    />
  );
}
ReviewsView.propTypes = {
  id: PropTypes.number.isRequired,
};
