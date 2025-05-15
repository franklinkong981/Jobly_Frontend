import React from "react";
import { Link } from "react-router-dom";

import "./CompanyCard.css";

function CompanyCard({id, name, description}) {

  return (
    <section className="CompanyCard card">
      <div className="Companycard-content card-body">
        <h3 className="CompanyCard-title card-title">
          {name}
        </h3>
        <p className="CompanyCard-description">{description}</p>
        <Link className="CompanyCard-link btn btn-info font-weight-bold" to={`/companies/${id}`}>
          See Job Openings
        </Link>
      </div>
    </section>
  );
}

export default CompanyCard;
