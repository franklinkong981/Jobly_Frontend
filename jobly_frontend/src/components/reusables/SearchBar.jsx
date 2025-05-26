import React, {useState} from "react";
import "./SearchBar.css";

/**
 * Search bar that will be displayed at the top of the companies list and jobs list pages.
 * Users can type in a query and submit the form, then only the cmompanies/jobs whose names contain the query will be displayed.
 * 
 * To do this, once the form is submitted, the filterFunc function prop is called to filter the companies/jobs. 
 * This component is present in the CompanyList and JobList components.
 */
function SearchBar({filterFunc, placeholder}) {
  const [searchQuery, setSearchQuery] = useState("");

  function handleSubmit(evt) {
    evt.preventDefault();
    //This check prevents searching for a query that is just empty spaces.
    searchQuery.trim() ? filterFunc(searchQuery.trim()) : filterFunc();
    setSearchQuery(searchQuery => searchQuery.trim());
  }

  /** Used to update the value in the searchbar at any given time. */
  function handleChange(evt) {
    setSearchQuery(searchQuery => evt.target.value);
  }

  return (
    <div className="SearchBar mb-4">
      <form className="SearchBar-form form-inline" onSubmit={handleSubmit}>
        <input
          className="SearchBar-input form-control form-control-lg flex-grow-1"
          name="searchQuery"
          placeholder={placeholder}
          value={searchQuery}
          onChange={handleChange}
        />
        <button type="submit" className="SearchBar-submit btn btn-lg btn-primary">
          Search
        </button>
      </form>
    </div>
  );
}

export default SearchBar;