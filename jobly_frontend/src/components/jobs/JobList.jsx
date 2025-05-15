import React, {useState, useEffect} from "react";

import JoblyNavbar from "../routes-navbar/JoblyNavbar.jsx";
import JobPostingList from "./JobPostingList.jsx";
import JoblyApi from "../../api/api.js";

import {v4 as uuidv4} from "uuid";

function JobList() {
  const [listOfJobs, setListOfJobs] = useState(null);

  //retrieve jobs data from database
  useEffect(function loadJobsWhenMounted() {
    async function fetchAllJobsInfo() {
      const jobs = await JoblyApi.getAllJobs();
      setListOfJobs(jobs);
    }
    fetchAllJobsInfo();
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
    <div className="JobsList col-md-8 offset-md-2">
      <JoblyNavbar filterFunc={filterJobSearch} placeholder="Search for jobs"/>
      {listOfJobs.length ? (
        <JobPostingList listOfJobs={listOfJobs} isGeneral={true} />
      ) : <p className="JobsList-no-jobs">No jobs found.</p>}
    </div>
  );
}

export default JobList;
