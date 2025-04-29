import React, {useState} from "react";
import {ListGroup} from "reactstrap";

import SearchBar from "../SearchBar.jsx";
import CompanyCard from "./CompanyCard.jsx";

import {v4 as uuidv4} from "uuid";

function CompanyList() {
  const [listOfCompanies, setListOfCompanies] = useState(["Apple", "IBM", "Google"]);

  return (
    <div className="CompanyList">
      <SearchBar/>
      <ListGroup>
        {listOfCompanies.map(company => (
          <CompanyCard name={company} key={uuidv4()}/>
        ))}
      </ListGroup>
    </div>
  );
}

export default CompanyList;