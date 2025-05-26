import React from "react";
import {render} from "@testing-library/react";

import JobList from "./JobList.jsx";
import { expect, it } from "vitest";

it("renders without crashing", function() {
  render(<JobList />);
});

it("matches snapshot", function() {
  const {asFragment} = render(<JobList />);
  expect(asFragment()).toMatchSnapshot();
});