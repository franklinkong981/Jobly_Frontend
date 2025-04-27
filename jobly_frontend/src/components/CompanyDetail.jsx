import React from "react";
import {useParams} from "react-router-dom";

function CompanyDetail() {
  const params = useParams();

  return (
    <div class="CompanyDetail">
      <SearchBar/>
      <h1>DETAILS ABOUT THE COMPANY {params.name}</h1>
    </div>
  );
}

export default CompanyDetail;