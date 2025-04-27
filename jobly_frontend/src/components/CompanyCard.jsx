import React from "react";
import { Card, CardBody, CardTitle} from "reactstrap";

function CompanyCard({name}) {

  return (
    <section className="col-md-8">
      <Link to='/companies/{name}' key='{name}-details-link'>
        <Card>
          <CardBody className="text-center">
            <CardTitle>
              {name}
            </CardTitle>
          </CardBody>
        </Card>
      </Link>
    </section>
  );
}

export default CompanyCard;