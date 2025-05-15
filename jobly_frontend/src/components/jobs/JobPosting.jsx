import React from "react";

import "./JobPosting.css";

function JobPosting({job, isGeneral}) {

  return (
    <div className="JobPosting card">
      <div className="JobPosting-content card-body">
        <h3 className="JobPosting-title card-title">{job.title}</h3>
        {isGeneral ? <h6 className="JobPosting-company">{job.companyName}</h6> : ""}
        <p>Salary: {job.salary || "N/A"}</p>
        <p>Equity: {job.equity || "N/A"}</p>
      </div>
    </div>
  );
}

export default JobPosting;