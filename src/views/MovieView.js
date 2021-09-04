import React, { useState, useEffect } from "react";
import * as movieAPI from "../services/services";
import { lazy, Suspense } from "react";
import Loader from "react-loader-spinner";

import {
  useParams,
  Link,
  Route,
  useHistory,
  useLocation,
} from "react-router-dom";

import imgDefault from "../images/movieDefault.png";
const CastView = lazy(() =>
  import("./CastView" /*webpackChunkName: "CastView"*/)
);
const ReviewsView = lazy(() =>
  import("./ReviewsView" /*webpackChunkName: "ReviewsView"*/)
);
const BASE_IMG_URL = "https://image.tmdb.org/t/p/w500/";
export default function MovieView() {
  const params = useParams();
  const id = Number(params.moviesId);
  const [movie, setMovie] = useState(null);
  const location = useLocation();
  const history = useHistory();
  let locationValue = location.state;
  if (location.state) {
    locationValue = location.state.from;
  }
  const goBack = () => {
    console.log(location);

    if (!location.state) {
      history.push("/");
      return;
    }
    history.push(
      `${location.state.from.pathname}${location.state.from.search}`
    );
  };

  useEffect(() => {
    if (movieAPI.fetchMovies(id)) {
      movieAPI.fetchMovies(id).then(setMovie);
    }
  }, [id]);
  return (
    <div>
      {!movie && (
        <>
          <button onClick={goBack} type="button">
            Back
          </button>
          <h3>no movie</h3>
        </>
      )}
      {movie && (
        <>
          <button onClick={goBack} type="button">
            Back
          </button>
          <h3>
            {movie.original_title} {movie.release_date.slice(0, 4)}
          </h3>
          <p>User score {movie.vote_average}</p>
          {movie.backdrop_path ? (
            <img src={`${BASE_IMG_URL}${movie.backdrop_path}`} alt="" />
          ) : (
            <img src={imgDefault} alt="default" />
          )}
          <p>Overview: {movie.overview}</p>
          <h3>Genres</h3>
          <ul>
            {movie.genres.map((genre) => (
              <li key={genre.id}>{genre.name}</li>
            ))}
          </ul>
          <div>
            <h3>Additional information</h3>
            <ul>
              <li>
                <Link
                  to={{
                    pathname: `/movies/${id}/cast`,
                    state: {
                      from: locationValue,
                    },
                  }}
                >
                  Cast
                </Link>
              </li>
              <li>
                <Link
                  to={{
                    pathname: `/movies/${id}/reviews`,
                    state: {
                      from: locationValue,
                    },
                  }}
                >
                  Reviews
                </Link>
              </li>
            </ul>
          </div>
          <hr />
          <div>
            <Suspense
              fallback={
                <Loader
                  type="Puff"
                  color="black"
                  height={100}
                  width={100}
                  timeout={1000} //3 secs
                />
              }
            >
              <Route path={`/movies/${id}/cast`}>
                <CastView BASE_IMG_URL={BASE_IMG_URL} id={id} />
              </Route>
              <Route path={`/movies/${id}/reviews`}>
                <ReviewsView id={id} />
              </Route>
            </Suspense>
          </div>
        </>
      )}
    </div>
  );
}
