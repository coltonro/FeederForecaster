import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

describe("App Component", function () {
  it("should have Feeder Forecaster title", function () {
    let { getByText } = render(<App />);
    expect(getByText("Feeder Forecaster")).toMatchInlineSnapshot(`
    <h1>Feeder Forcaster</h1>
    `);
  });
});