import * as React from "react";
import * as ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import fetch from "unfetch";
import wait from "waait";
import App from "App";

window.fetch = fetch;
it("renders without crashing", async () => {
  // add this line to get bugsnag to play nice with jest: https://github.com/bugsnag/bugsnag-js/issues/452
  // @ts-ignore
  const proto = Object.getPrototypeOf(setTimeout());
  proto.unref = function() {};
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  await act(async () => {
    await wait(0);
  });
  ReactDOM.unmountComponentAtNode(div);
});
