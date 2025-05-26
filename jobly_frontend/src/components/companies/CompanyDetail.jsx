import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";

import JoblyApi from "../../api/api.js";
import JobPostingList from "../jobs/JobPostingList.jsx";

/**
 * Company Details page top-level component.
 * Shows detailed information about a company such as its name, description, number of employees,
 * and a list of jobs currently available within the company.
 * 
 * Route is /companies/:name
 * 
 * Contains the JobPostingList component which lists out the current job openings in the company.
 * 
 */
function CompanyDetail() {
  const {name} = useParams();
  const [companyInfo, setCompanyInfo] = useState(null);

  //retrieve detailed info about company, including its list of job openings, from the API.
  // While this is happening, the word "Loading" is displayed on the screen. Company and job information won't be displayed 
  // until the information is returned from the API.
  useEffect(function loadComapnyDetailsWhenMounted() {
    async function fetchCompanyDetailsAndJobs() {
      const company = await JoblyApi.getCompany(name);
      setCompanyInfo(company);
    }
    fetchCompanyDetailsAndJobs();
  }, [name]);

  if (!companyInfo) return <h1>Loading...</h1>

  return (
    <div className="CompanyDetail col-md-8 offset-md-2">
      <h3 className="CompanyDetail-headline">Current Openings for {companyInfo.name}</h3>
      <p className="CompanyDetail-description">{companyInfo.description}</p>
      <p className="CompanyDetail-employees">Current number of employees: {companyInfo.numEmployees}</p>
      <JobPostingList listOfJobs={companyInfo.jobs} isGeneral={false} />
    </div>
  );
}

export default CompanyDetail;