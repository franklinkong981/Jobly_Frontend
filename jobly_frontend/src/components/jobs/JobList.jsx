import React, {useState, useEffect} from "react";
import {ListGroup} from "reactstrap";

import SearchBar from "../SearchBar.jsx";
import JobPosting from "./JobPosting.jsx";
import JoblyApi from "../../api/api.js";

import {v4 as uuidv4} from "uuid";

function JobList() {
  const [listOfJobs, setListOfJobs] = useState(null);

  //retrieve jobs data from database
  useEffect(function loadJobsWhenMounted() {
    async function fetchJobs() {
      const jobs = await JoblyApi.getAllJobs();
      setListOfJobs(jobs);
    }
    fetchJobs();
  }, []);

  const filterJobSearch = async (searchQuery) => {
    let filteredCompanies;
    if (searchQuery) {
      filteredCompanies = await JoblyApi.getFilteredCompaniesByName(searchQuery);
    } else {
      filteredCompanies = await JoblyApi.getAllCompanies();
    }

    setListOfCompanies(listOfCompanies => filteredCompanies);
  };

  if (!listOfJobs) {
    return <h1>Loading...</h1>
  } 
  
  return (
    <div className="JobsList">
      <SearchBar/>
      {listOfJobs.length > 0 ? (
        <ListGroup>
        {listOfJobs.map(job => (
          <JobPosting jobName={job} key={uuidv4()}/>
        ))}
      </ListGroup>
      ) : <h1>No jobs found</h1>}
    </div>
  );
}

export default JobList;

/*
if (!listOfCompanies) {
    return <h1>Loading...</h1>
  } else if (listOfCompanies.length > 0) {
    return (
      <div className="CompanyList">
        <SearchBar filterFunc={filterCompanySearch} placeholder="Search for companies"/>
        <ListGroup>
          {listOfCompanies.map(company => (
            <CompanyCard id={company.handle} name={company.name} description={company.description} key={uuidv4()}/>
          ))}
        </ListGroup>
      </div>
    );
  } else {
    return (
      <div className="CompanyList">
        <SearchBar filterFunc={filterCompanySearch} placeholder="Search for companies"/>
        <h1>No companies found</h1>
      </div>
    );
  }
*/