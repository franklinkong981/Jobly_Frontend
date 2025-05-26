import React from "react";
import {render} from "@testing-library/react";

import JobPostingList from "./JobPostingList.jsx";

import {TestUserProvider} from "../../contexts/testUserContext.jsx";

const testJobList = [
  {title: "Tester", companyName: "VS Code", salary: 100000, equity: 10}
];

it("renders without crashing", function() {
  render(
    <TestUserProvider>
      <JobPostingList listOfJobs={testJobList} />
    </TestUserProvider>
  );
});

it("matches snapshot", function() {
  const {asFragment} = render(
    <TestUserProvider>
      <JobPostingList listOfJobs={testJobList} />
    </TestUserProvider>
  );
  expect(asFragment()).toMatchSnapshot();
});