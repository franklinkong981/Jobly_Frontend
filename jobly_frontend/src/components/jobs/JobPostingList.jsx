import React from "react";
import JobPosting from "./JobPosting.jsx";

/**
 * Shows the list of job openings. Contains a list of JobPosting components.
 * 
 * This is used by the CompanyDetail component to list jobs belonging to that company and the JobList component to list all jobs.
 * isGeneral = true it's the JobPostingList on the jobs page (route /jobs). false means it's the JobPostingList on the CompanyDetail page (Route /companies/:name).
 * 
 * JobPostingList is used in CompanyDetail and JobList components, contains JobPosting components.
 */
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