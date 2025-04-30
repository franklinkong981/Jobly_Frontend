import React from "react";
import { Card, CardBody, CardTitle} from "reactstrap";

function JobPosting({job, isGeneral}) {

  return (
    <section className="col-md-8">
      <Card>
        <CardBody className="text-center">
          <CardTitle>{job.name}</CardTitle>
          {isGeneral ? <CardText>{job.companyName}</CardText> : ""}
          <CardText>Salary: {job.salary}</CardText>
          <CardText>Equity: {job.equity}</CardText>
        </CardBody>
      </Card>
    </section>
  );
}

export default JobPosting;