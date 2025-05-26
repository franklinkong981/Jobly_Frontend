import React, {useState, useEffect, useContext} from "react";

import CurrentUserContext from "../../contexts/currentUserContext.jsx";

import "./JobPosting.css";

// Formats salary to contain commas like 1,200,200.
function formatSalary(salary) {
  const digitsRev = [];
  const salaryStr = salary.toString();

  for (let i = salaryStr.length - 1; i >= 0; i--) {
    digitsRev.push(salaryStr[i]);
    if (i > 0 && i % 3 === 0) digitsRev.push(",");
  }

  return digitsRev.reverse().join("");
}

/**
 * This component shows information about a job.
 * 
 * Is rendered by JobPostingList to show a card for each job.
 * 
 * Uses the CurrentUserContext to check whether a user has applied to a job (determines how the Apply button is rendered)
 * and calls the function applyToJob in the CurrentUserContext when the logged in user applies to a job through clcking the Apply button.
 * 
 * Contained in the JobPostingList component.
 */
function JobPosting({job, isGeneral = true}) {
  const {hasUserAppliedToJob, applyToJob} = useContext(CurrentUserContext);
  const [hasApplied, setHasApplied] = useState();

  //When user appleis to job, hasUserAppliedToJob is updated in the context,
  //which updates the Applied button.
  useEffect(function updateJobApplicationStatus() {
    setHasApplied(hasUserAppliedToJob(job.id))
  }, [job.id, hasUserAppliedToJob]);

  async function handleApplyClick(evt) {
    if (hasUserAppliedToJob(job.id)) return;
    await applyToJob(job.id);
    setHasApplied(true);
  }

  return (
    <div className="JobPosting card">
      <div className="JobPosting-content card-body">
        <h3 className="JobPosting-title card-title">{job.title}</h3>
        {isGeneral ? <h6 className="JobPosting-company">{job.companyName}</h6> : ""}
        <p>Salary: {job.salary ? `$${formatSalary(job.salary)}` : "N/A"}</p>
        <p>Equity: {job.equity || "N/A"}</p>
        <button 
          className="btn btn-danger font-weight-bold float-right"
          onClick={handleApplyClick} disabled={hasApplied}>
            {hasApplied ? "Applied" : "Apply"}
        </button>
      </div>
    </div>
  );
}

export default JobPosting;