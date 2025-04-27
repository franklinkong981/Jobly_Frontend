import React from "react";
import { Card, CardBody, CardTitle} from "reactstrap";

function JobPosting({jobName}) {

  return (
    <section className="col-md-8">
      <Card>
        <CardBody className="text-center">
          <CardTitle>
            {jobName}
          </CardTitle>
        </CardBody>
      </Card>
    </section>
  );
}

export default JobPosting;