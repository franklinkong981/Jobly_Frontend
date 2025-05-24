import React from "react";
import {render} from "@testing-library/react";
import {MemoryRouter} from 'react-router-dom';

import App from "./App";

it("renders the entire Jobly app without crashing", function() {
  render((
    <MemoryRouter initialEntries={['/']} initialIndex={0}>
      <App />
    </MemoryRouter>
  ))
});