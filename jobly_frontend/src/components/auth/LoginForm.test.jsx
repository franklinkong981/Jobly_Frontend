import React from "react";
import {render} from"@testing-library/react";
import {MemoryRouter} from "react-router-dom";

import LoginForm from "./LoginForm.jsx";
import { expect, it } from "vitest";

it("renders without crashing", function() {
  render(
    <MemoryRouter>
      <LoginForm />
    </MemoryRouter>
  );
});

it("matches snapshot", function() {
  const {asFragment} = render(
    <MemoryRouter>
      <LoginForm />
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});