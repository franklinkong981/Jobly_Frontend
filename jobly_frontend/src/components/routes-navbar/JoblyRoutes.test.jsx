import React from "react";
import {render} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";

import {TestUserProvider} from "../../contexts/testUserContext.jsx";

import JoblyRoutes from "./JoblyRoutes.jsx";
import { expect, it } from "vitest";

it("renders without crashing", function() {
  render (
    <MemoryRouter>
      <TestUserProvider>
        <JoblyRoutes />
      </TestUserProvider>
    </MemoryRouter>
  );
});

it("matches snapshot", function() {
  const {asFragment} = render (
    <MemoryRouter>
      <TestUserProvider>
        <JoblyRoutes />
      </TestUserProvider>
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});
