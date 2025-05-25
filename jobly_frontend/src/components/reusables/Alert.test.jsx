import React from "react";
import {render} from "@testing-library/react";

import Alert from "./Alert.jsx";
import { expect, it } from "vitest";

const successMessages = ["Everything is fine", "It all works!"];
const dangerMessages = ["There is an error", "stop and fix"];

it("success alert renders without crashing", function() {
  render(<Alert alertType="success" alertTexts={successMessages} />);
});

it("danger alert renders without crashing", function() {
  render(<Alert alertType="danger" alertTexts={dangerMessages} />);
});

it("matches snapshot for success", function() {
  const {asFragment} = render(<Alert alertType="success" alertTexts={successMessages} />);
  expect(asFragment()).toMatchSnapshot();
});

it("matches snapshot for danger", function() {
  const {asFragment} = render(<Alert alertType="danger" alertTexts={dangerMessages} />);
  expect(asFragment()).toMatchSnapshot();
});