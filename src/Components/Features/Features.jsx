import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Feature.module.css";

import { filterProducts } from "../../redux/Slices/productSlice";
import SearchBar from "../SeachBar/SearchBar";
import debounce from "../../utils/debounce";
/*----icons-----*/
import { BsFillGridFill, BsGrid } from "react-icons/bs";

import gridIcon from "/images/icons8-grid-50.png";
import gridIcon2 from "/images/icons8-grid-30.png";
import listIcon from "/images/icons8-list-100.png";
import listIcon2 from "/images/icons8-list-64.png";

const Features = ({ isListView, setIsListView }) => {
  const dispatch = useDispatch();
  const { isMobile } = useSelector((state) => state.ui);
  const [filters, setFilters] = useState({
    keyword: "",
    category: "",
    brand: "",
    color: "",
    priceRange: "",
    sort:""
  });

  const [sort, setSort] = useState({ sortBy: "title", order: "asc" });
  const debouncedFunction = debounce((data) => {
    dispatch(filterProducts(data));
  }, 1000);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
    const updatedFilters = { ...filters, [name]: value };

    // /////////////
    console.log("updatedFilters", updatedFilters);
    const sortOptions = {
      "price-lowest": { sortBy: "price", order: "asc" },
      "price-highest": { sortBy: "price", order: "desc" },
      "title-a-z": { sortBy: "productName", order: "asc" },
      "title-z-a": { sortBy: "productName", order: "desc" },
    };

    const newConfig = sortOptions[value] || { sortBy: "title", order: "asc" };

    setSort(value);
    debouncedFunction({ ...updatedFilters, ...newConfig });
  };

  return (
    <>
      <SearchBar
        handleFilterChange={handleFilterChange}
        searchValue={filters.keyword}
        name="keyword"
      />

      <div className={styles.container}>
        {!isMobile && (
          <div className={styles.view_options}>
            
            <img
              onClick={() => setIsListView(false)}
              src={isListView ? gridIcon : gridIcon2}
              alt="gridIcon"
            />
            <img
              src={isListView ? listIcon2 : listIcon}
              alt="listIcon"
              onClick={() => setIsListView(true)}
            />
          </div>
        )}
        <div className={styles.filters_options}>
          <div className={styles.select_type}>
            <select
              className={styles.select_filter}
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
            >
              <option value="">Headphone Type</option>
              <option value="in-ear headphone">in-ear headphone</option>
              <option value="on-ear headphone">on-ear headphone</option>
              <option value="over-ear headphone">over-ear headphone</option>
            </select>
            <select
              className={styles.select_filter}
              name="brand"
              value={filters.brand}
              onChange={handleFilterChange}
            >
              <option value="">Company</option>
              <option value="JBL">JBL</option>
              <option value="SONY">SONY</option>
              <option value="boAt">boAt</option>
              <option value="ZEBRONICS">ZEBRONICS</option>
              <option value="Marshall">Marshall</option>
              <option value="PTron">PTron</option>
            </select>
            <select
              className={styles.select_filter}
              name="color"
              value={filters.color}
              onChange={handleFilterChange}
            >
              <option value="">color</option>
              <option value="blue">Blue</option>
              <option value="black">Black</option>
              <option value="white">White</option>
              <option value="brown">Brown</option>
            </select>
            <select
              className={styles.select_filter}
              name="priceRange"
              value={filters.priceRange}
              onChange={handleFilterChange}
            >
              <option value="">Price</option>
              <option value="0-1000">₹0 - ₹1000</option>
              <option value="1000-10000">₹1000 - ₹10000</option>
              <option value="10000-20000">₹10000 - ₹20000</option>
              <option value="20000-100000">Above ₹20000</option>
            </select>
          </div>
        </div>
        <div className={styles.sort_options}>
          <select
            className={styles.select_sort}
            name="sort"
            value={filters.sort}
            onChange={handleFilterChange}
          >
            <option value="">Sort by : Featured</option>
            <option value="price-lowest">Price : Lowest</option>
            <option value="price-highest">Price : Highest</option>
            <option value="title-A-Z">Name : A-Z</option>
            <option value="title-Z-A">Name : Z-A</option>
          </select>
        </div>
      </div>
    </>
  );
};

export default Features;
