import React, {useState} from "react";

function SearchBar({filterFunc, placeholder}) {
  const [searchQuery, setSearchQuery] = useState("");

  function handleSubmit(evt) {
    evt.preventDefault();
    searchQuery ? filterFunc(searchQuery.trim()) : filterFunc();
    setSearchQuery(searchQuery => searchQuery.trim());
  }

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