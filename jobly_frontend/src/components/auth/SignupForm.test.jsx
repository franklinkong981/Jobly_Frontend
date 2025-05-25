import React from "react";
import {render} from"@testing-library/react";
import {MemoryRouter} from "react-router-dom";

import SignupForm from "./SignupForm.jsx";
import { expect, it } from "vitest";

it("renders without crashing", function() {
  render(
    <MemoryRouter>
      <SignupForm />
    </MemoryRouter>
  );
});

it("matches snapshot", function() {
  const {asFragment} = render(
    <MemoryRouter>
      <SignupForm />
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});