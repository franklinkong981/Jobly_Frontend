import React, {useState, useEffect} from "react";

import JoblyNavbar from "../routes-navbar/JoblyNavbar.jsx";
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
    <div className="CompanyList col-md-8 offset-md-2">
      <JoblyNavbar filterFunc={filterCompanySearch} placeholder="Search for companies"/>
      {listOfCompanies.length ? (
        <div className="CompanyList-list">
          {listOfCompanies.map(company => (
            <CompanyCard id={company.handle} name={company.name} description={company.description} key={uuidv4()}/>
          ))}
        </div>
      ) : <p className="CompanyList-no-companies">No companies found</p>}
    </div>
  );
}

export default CompanyList;