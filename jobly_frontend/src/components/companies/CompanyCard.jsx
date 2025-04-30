import React from "react";
import { Link } from "react-router-dom";
import { Button, Card, CardBody, CardTitle, CardText} from "reactstrap";
import "./CompanyCard.css";

function CompanyCard({id, name, description}) {

  return (
    <div className="CompanyCard text-end">
      <section className="col-md-8">
      <Card>
        <CardBody>
          <CardTitle>{name}</CardTitle>
          <CardText>{description}</CardText>
          <Link to={`/companies/${id}`} key={`${name}-details-link`}>
            <Button color="info">Current Job Openings</Button>
          </Link>
        </CardBody>
      </Card>
      </section>
    </div>
  );
}

export default CompanyCard;
