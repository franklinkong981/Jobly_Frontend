import React from "react";
import {ListGroup} from "reactstrap";

import SearchBar from "./SearchBar.jsx";
import JobPosting from "./JobPosting.jsx";

function JobList() {
  const [listOfJobs, setListOfJobs] = useState(["Deli Clerk", "Database Technician", "Petroleum Engineer"]);

  return (
    <div class="JobsList">
      <SearchBar/>
      <ListGroup>
        {listOfJobs.map(job => (
          <JobPosting jobName={job}/>
        ))}
      </ListGroup>
    </div>
  );
}

export default JobList;