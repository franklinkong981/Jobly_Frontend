import React from "react";
import {render} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";

import CompanyCard from "./CompanyCard.jsx";
import { expect, it } from "vitest";

it("renders without crashing", function() {
  render(
    <MemoryRouter>
      <CompanyCard id="rithm" name="Rithm School" description="Become an exceptional developer in 16 weeks." />
    </MemoryRouter>
  );
});

it("matches snapshot", function() {
  const {asFragment} = render(
    <MemoryRouter>
      <CompanyCard id="rithm" name="Rithm School" description="Become an exceptional developer in 16 weeks." />
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});