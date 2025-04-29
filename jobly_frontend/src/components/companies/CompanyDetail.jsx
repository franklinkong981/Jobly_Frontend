import React from "react";
import {useParams} from "react-router-dom";

import SearchBar from "../SearchBar.jsx";

function CompanyDetail() {
  const params = useParams();

  return (
    <div className="CompanyDetail">
      <SearchBar/>
      <h1>DETAILS ABOUT THE COMPANY {params.name}</h1>
    </div>
  );
}

export default CompanyDetail;