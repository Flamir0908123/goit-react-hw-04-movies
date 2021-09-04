import React, { useState, useEffect } from "react";
import * as movieAPI from "../services/services";
import { Link, useLocation } from "react-router-dom";

export default function TrendMovieView() {
  const [trends, setTrends] = useState([]);
  const location = useLocation();
  useEffect(() => {
    movieAPI.fetchTrend().then((r) => setTrends(r.results));
  }, []);
  return (
    <>
      <h2>Trending today</h2>
      <ul>
        {trends &&
          trends.map(({ id, original_title, original_name }) => (
            <li key={id}>
              <Link
                to={{
                  pathname: `/movies/${id}`,
                  state: {
                    from: location,
                  },
                }}
              >
                {original_title ? original_title : original_name}
              </Link>
            </li>
          ))}
      </ul>
    </>
  );
}
