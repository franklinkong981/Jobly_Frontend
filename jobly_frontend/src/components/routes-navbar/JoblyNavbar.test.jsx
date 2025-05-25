import React from "react";
import {render} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";

import JoblyNavbar from "./JoblyNavbar.jsx";

import {TestUserProvider} from "../../contexts/testUserContext.jsx";
import { expect, it } from "vitest";

it("renders without crashing", function() {
  render(
    <MemoryRouter>
      <TestUserProvider>
        <JoblyNavbar />
      </TestUserProvider>
    </MemoryRouter>
  );
});

it("matches snapshot when logged in", function() {
  const {asFragment} = render(
    <MemoryRouter>
      <TestUserProvider>
        <JoblyNavbar />
      </TestUserProvider>
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});

it("matches snapshot when logged out", function() {
  const {asFragment} = render(
    <MemoryRouter>
      <TestUserProvider currentTestUser={null}>
        <JoblyNavbar />
      </TestUserProvider>
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});