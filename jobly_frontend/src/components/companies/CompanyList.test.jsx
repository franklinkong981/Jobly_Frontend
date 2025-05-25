import React from "react";
import {render} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";

import CompanyList from "./CompanyList.jsx";
import { expect, it } from "vitest";

it("renders without crashing", function() {
  render(<CompanyList />);
});

it("matches snapshot", function() {
  const {asFragment} = render(<CompanyList />);
  expect(asFragment()).toMatchSnapshot();
});