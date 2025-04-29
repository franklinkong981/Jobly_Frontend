import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import {ListGroup, ListGroupItem} from "reactstrap";

import JoblyApi from "../../api/api.js";
import SearchBar from "../SearchBar.jsx";

function CompanyDetail() {
  const params = useParams();
  const [companyInfo, setCompanyInfo] = useState(null);

  //retrieve detailed info about company
  useEffect(function loadComapnyDetailWhenMounted() {
    async function fetchCompany() {
      const company = await JoblyApi.getCompany(params.name);
      setCompanyInfo(company);
    }
    fetchCompany();
  }, []);

  if (companyInfo) {
    return (
      <div className="CompanyDetail">
        <h1>Current Openings for {companyInfo.name}</h1>
        <p>{companyInfo.description}</p>
        <p>Current number of employees: {companyInfo.numEmployees}</p>
        <ListGroup>
          {companyInfo.jobs.map(job => (
            <ListGroupItem>{job.title}</ListGroupItem>
          ))}
        </ListGroup>
      </div>
    );
  } else {
    return <h1>Loading...</h1>
  }
}

export default CompanyDetail;