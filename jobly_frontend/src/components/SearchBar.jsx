import React, {useState} from "react";
import {useFormik} from "formik";


function SearchBar({filterFunc, placeholder}) {
  const formik = useFormik({
    initialValues: {
      query: ''
    },
    validateOnChange: false,
    validateOnBlur: false,
    async onSubmit(values) {
      await filterFunc(values.query);
    }
  });


  return (
    <section className="col-md-4">
      <form className="SearchBar" onSubmit={formik.handleSubmit}>
        <input id="SearchBar-query-field" className="SearchBar-input" type="text" name="query"
        size="25" value={formik.values.query} placeholder={placeholder} onChange={formik.handleChange}/>

        <button className="SearchBar-search-button" type="submit">Search</button>
      </form>
    </section>
  );
}

export default SearchBar;