import React, {useState, useEffect} from "react";
import {ListGroup} from "reactstrap";

import SearchBar from "../SearchBar.jsx";
import JobPosting from "./JobPosting.jsx";
import JoblyApi from "../../api/api.js";

import {v4 as uuidv4} from "uuid";

function JobList() {
  const [listOfJobs, setListOfJobs] = useState(["Deli Clerk", "Database Technician", "Petroleum Engineer"]);

  return (
    <div className="JobsList">
      <SearchBar/>
      <ListGroup>
        {listOfJobs.map(job => (
          <JobPosting jobName={job} key={uuidv4()}/>
        ))}
      </ListGroup>
    </div>
  );
}

export default JobList;