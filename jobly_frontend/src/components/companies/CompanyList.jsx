import React, {useEffect, useState} from "react";
import {ListGroup} from "reactstrap";

import SearchBar from "../SearchBar.jsx";
import CompanyCard from "./CompanyCard.jsx";
import JoblyApi from "../../api/api.js";

import {v4 as uuidv4} from "uuid";

function CompanyList() {
  const [listOfCompanies, setListOfCompanies] = useState(null);

  //retrieve companies data from database
  useEffect(function loadCompaniesWhenMounted() {
    async function fetchCompanies() {
      const companies = await JoblyApi.getAllCompanies();
      setListOfCompanies(companies);
    }
    fetchCompanies();
  }, []);
  
  if (listOfCompanies) {
    return (
      <div className="CompanyList">
        <SearchBar/>
        <ListGroup>
          {listOfCompanies.map(company => (
            <CompanyCard name={company.name} key={uuidv4()}/>
          ))}
        </ListGroup>
      </div>
    );
  } else {
    return <h1>Loading...</h1>
  }
}

export default CompanyList;