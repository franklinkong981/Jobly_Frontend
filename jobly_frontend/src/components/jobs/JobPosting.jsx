import React from "react";
import { Card, CardBody, CardTitle, CardText} from "reactstrap";

import "./JobPosting.css";

function JobPosting({job, isGeneral}) {

  return (
    <div className="JobPosting">
      <section className="col-md-8">
        <Card>
          <CardBody className="text-center">
            <CardTitle>{job.title}</CardTitle>
            {isGeneral ? <CardText>{job.companyName}</CardText> : ""}
            <CardText>Salary: {job.salary || "N/A"}</CardText>
            <CardText>Equity: {job.equity || "N/A"}</CardText>
          </CardBody>
        </Card>
      </section>
    </div>
  );
}

export default JobPosting;