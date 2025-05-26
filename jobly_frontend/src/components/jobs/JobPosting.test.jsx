import React from "react";
import {render} from "@testing-library/react";

import {TestUserProvider} from "../../contexts/testUserContext.jsx";

import JobPosting from "./JobPosting.jsx";
import { expect, it } from "vitest";

const testJob = {title: "Tester", companyName: "VS Code", salary: 100000, equity: 10};

it("renders without crashing", function() {
  render(
    <TestUserProvider>
      <JobPosting job={testJob} />
    </TestUserProvider>
  );
});

it("matches snapshot", function() {
  const {asFragment} = render(
    <TestUserProvider>
      <JobPosting job={testJob} />
    </TestUserProvider>
  );
  expect(asFragment()).toMatchSnapshot();
});