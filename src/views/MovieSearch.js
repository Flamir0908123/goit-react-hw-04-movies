import React, { useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import * as movieAPI from "../services/services";

export default function MovieSearch() {
  const [searchList, setSearchList] = useState(null);
  const [queryInput, setQueryInput] = useState("");
  const location = useLocation();
  const history = useHistory();
  const onQueryChange = (e) => {
    e.preventDefault();
    history.push({ ...location, search: `query=${queryInput}` });
    setQueryInput("");
  };
  const query = new URLSearchParams(location.search).get("query") ?? "";
  useEffect(() => {
    if (!query) {
      return;
    }
    movieAPI.fetchSearch(query).then((r) => setSearchList(r.results));
  }, [query]);
  return (
    <>
      <form onSubmit={onQueryChange}>
        <label>
          Search Input
          <input
            value={queryInput}
            onChange={(e) => setQueryInput(e.target.value)}
            type="text"
          />
        </label>
        <button type="submit">Search</button>
      </form>
      <ul>
        {searchList ? (
          searchList.length > 0 ? (
            searchList.map(({ id, original_title, original_name }) => {
              return (
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
              );
            })
          ) : (
            <h3>No Search</h3>
          )
        ) : (
          <h3>Search something</h3>
        )}
      </ul>
    </>
  );
}
