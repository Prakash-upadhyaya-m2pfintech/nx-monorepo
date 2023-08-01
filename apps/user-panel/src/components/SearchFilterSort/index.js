import React, { useState } from "react";
import svg from "../../assets/signUp/search.svg";
import "./index.css";
import CustomSelect from "../core/CustomSelect";

const SearchSortFilter = ({
  onSearch,
  onClickSort,
  onClickFilter,
  filterOptions,
  sortOptions,
}) => {
  const [search, setSearch] = useState("");
  const option = ["Filter by name", "option1"];
  const sortOption = ["Newest to oldest", "option1"];
  return (
    <div className="builder-input">
      <div className="col-4 search-bar">
        <img
          src={svg}
          className="icon-search"
          alt="search-icon"
          style={{ display: search.length > 0 ? "none" : "block" }}
        />
        <input
          type="text"
          placeholder="Search"
          name="search"
          id="sea"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="col-8 filter-sort-div">
        <div className="d-flex filter-bar">
          <CustomSelect
            title={"Filter"}
            className={"fil"}
            options={option}
            titleClass={"fil-title"}
          />
        </div>
        <div className="d-flex sort-bar">
          <CustomSelect
            title={"Sort"}
            className={"fil"}
            options={sortOption}
            titleClass={"fil-title"}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchSortFilter;
