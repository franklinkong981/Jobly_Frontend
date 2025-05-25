import React from "react";
import {render} from "@testing-library/react";
import {MemoryRouter, Routes, Route} from "react-router-dom";

import CompanyDetail from "./CompanyDetail.jsx";

import {TestUserProvider} from "../../contexts/testUserContext.jsx";
import { expect, it } from "vitest";

it("renders without crashing", function() {
  render(
    <MemoryRouter>
      <TestUserProvider>
        <CompanyDetail />
      </TestUserProvider>
    </MemoryRouter>
  );
});

it("matches snapshot", function() {
  const {asFragment} = render(
    <MemoryRouter>
      <TestUserProvider>
        <CompanyDetail />
      </TestUserProvider>
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});

