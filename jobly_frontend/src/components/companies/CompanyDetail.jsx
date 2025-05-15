import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";

import JoblyApi from "../../api/api.js";
import JobPostingList from "../jobs/JobPostingList.jsx";

function CompanyDetail() {
  const {name} = useParams();
  const [companyInfo, setCompanyInfo] = useState(null);

  //retrieve detailed info about company
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