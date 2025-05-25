import React from "react";
import {render} from "@testing-library/react";

import SearchBar from "./SearchBar.jsx";
import { expect, it } from "vitest";

const testFilteringFunc = () => {
  return false;
}

it("renders without crashing", function() {
  render(<SearchBar filterFunc={testFilteringFunc} placeholder="This is for testing" />);
});

it("matches snapshot", function() {
  const {asFragment} = render(<SearchBar filterFunc={testFilteringFunc} placeholder="This is for testing" />);
  expect(asFragment()).toMatchSnapshot();
});