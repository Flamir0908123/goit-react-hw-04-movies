import { useState } from "react";

import { toast } from "react-toastify";

import s from "./Searchbar.module.css";
import Button from "../Button/Button";

const Searchbar = ({ onSubmit }) => {
  const [searchValue, setSearchValue] = useState("");

  const onChange = (e) => {
    setSearchValue(e.currentTarget.value.toLowerCase());
  };

  const onInputSubmit = (e) => {
    e.preventDefault();
    if (searchValue.trim() === "") {
      setSearchValue("");
      toast("Please type something to find movie you want");
      return;
    }
    onSubmit(searchValue);
    setSearchValue("");
  };

  return (
    <header className={s.searchbar}>
      <form className={s.searchForm} onSubmit={onInputSubmit}>
        <input
          className={s.searchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search movie"
          value={searchValue}
          onChange={onChange}
        />
        <Button type="submit">Search</Button>
      </form>
    </header>
  );
};

export default Searchbar;
