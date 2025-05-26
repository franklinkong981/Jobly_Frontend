import React, {useState, useEffect} from "react";

import SearchBar from "../reusables/SearchBar.jsx";
import JobPostingList from "./JobPostingList.jsx";
import JoblyApi from "../../api/api.js";

import {v4 as uuidv4} from "uuid";

/**
 * Top-level component of the page that shows the list of all jobs.
 * 
 * When it first loads, "Loading" text will be displayed until it fetches the full list of jobs from the JoblyApi.
 * It also contains a SearchBar component, which reloads the filtered jobs that match the search query upon submission.
 * 
 * JobList contains JobCardList, which is the child component that contains the list of JobCard components, each of which is used to display one job opening.
 * 
 * Top-level component of /jobs route.
 */
function JobList() {
  const [listOfJobs, setListOfJobs] = useState(null);

  //retrieve jobs data from database upon mount.
  useEffect(function loadJobsWhenMounted() {
    async function fetchAllJobsInfo() {
      const jobs = await JoblyApi.getAllJobs();
      setListOfJobs(jobs);
    }
    fetchAllJobsInfo();
  }, []);

  /**
   * Runs upon SearchBar submission. Calls the JoblyApi to get a list of current job openings whose titles contain the search query.
   * The component then reloads and displays the filtered search results.
   * If the SearchBar query is deleted and the form is submitted again with the query being empty, it will now display all the jobs again. 
   */
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
      <SearchBar filterFunc={filterJobSearch} placeholder="Search for jobs"/>
      {listOfJobs.length ? (
        <JobPostingList listOfJobs={listOfJobs} isGeneral={true} />
      ) : <p className="JobsList-no-jobs">No jobs found.</p>}
    </div>
  );
}

export default JobList;
