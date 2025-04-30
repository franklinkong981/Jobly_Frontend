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
    let filteredJobs;
    if (searchQuery) {
      filteredJobs = await JoblyApi.getFilteredJobsByTitle(searchQuery);
    } else {
      filteredJobs = await JoblyApi.getAllJobs();
    }

    setListOfJobs(listOfJobs => filteredJobs);
  };

  if (!listOfJobs) {
    return <h1>Loading...</h1>
  } 
  
  return (
    <div className="JobsList">
      <SearchBar filterFunc={filterJobSearch} placeholder="Search for jobs"/>
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
