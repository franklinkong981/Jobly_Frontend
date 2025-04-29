import React from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, CardTitle} from "reactstrap";
import "./CompanyCard.css";

function CompanyCard({name}) {

  return (
    <div className="CompanyCard">
      <section className="col-md-8">
        <Link to={`/companies/${name}`} key={`${name}-details-link`}>
          <Card>
            <CardBody className="text-center">
              <CardTitle>
                {name}
              </CardTitle>
            </CardBody>
          </Card>
        </Link>
      </section>
    </div>
  );
}

export default CompanyCard;