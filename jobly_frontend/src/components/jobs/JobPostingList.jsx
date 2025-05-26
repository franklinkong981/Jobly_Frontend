import React from "react";
import JobPosting from "./JobPosting.jsx";

function JobPostingList({listOfJobs, isGeneral = true}) {
  return (
    <div className="JobPostingList">
      {listOfJobs.map(job => (
        <JobPosting key={job.id} job={job} isGeneral={isGeneral}/>
      ))}
    </div>
  );
}

export default JobPostingList;