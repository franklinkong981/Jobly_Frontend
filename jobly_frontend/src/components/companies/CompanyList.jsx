import React, {useState, useEffect} from "react";
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

  const filterCompanySearch = async (searchQuery) => {
    let filteredCompanies;
    if (searchQuery) {
      filteredCompanies = await JoblyApi.getFilteredCompaniesByName(searchQuery);
    } else {
      filteredCompanies = await JoblyApi.getAllCompanies();
    }

    setListOfCompanies(listOfCompanies => filteredCompanies);
  };
  
  if (!listOfCompanies) {
    return <h1>Loading...</h1>
  }
  
  return (
    <div className="CompanyList">
      <SearchBar filterFunc={filterCompanySearch} placeholder="Search for companies"/>
      {listOfCompanies.length > 0 ? (
        <ListGroup>
          {listOfCompanies.map(company => (
            <CompanyCard id={company.handle} name={company.name} description={company.description} key={uuidv4()}/>
          ))}
        </ListGroup>
      ) : <h1>No companies found</h1>}
    </div>
  );
}

export default CompanyList;