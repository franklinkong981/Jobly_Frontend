import React from "react";
import {render} from "@testing-library/react";
import {MemoryRouter} from 'react-router-dom';

import App from "./App";
import { expect, it } from "vitest";

it("renders the entire Jobly app without crashing", function() {
  render((
    <MemoryRouter initialEntries={['/']} initialIndex={0}>
      <App />
    </MemoryRouter>
  ))
});

it("should match the snapshot", function() {
  const {asFragment} = render((
    <MemoryRouter initialEntries={['/']} initialIndex={0}>
      <App />
    </MemoryRouter>
  ));
  expect(asFragment()).toMatchSnapshot();
});

