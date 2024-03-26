import React from "react";
import styles from "./SearchBar.module.css";
import searchIcon from "/images/icons8-search-30.png";

const SearchBar = ({ handleFilterChange, searchValue, name }) => {
  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder="Search Products"
        className={styles.search_input}
        onChange={handleFilterChange}
        value={searchValue}
        name={name}
      />
      <img className={styles.search_icon} src={searchIcon} alt="searchIcon" />
    </div>
  );
};

export default SearchBar;
