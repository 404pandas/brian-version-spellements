import React from "react";
import { createElement as h } from "react";
const App = () => {
  return h(
    "div",
    null,
    h(
      "h1",
      null,
      "Spellements",
      h("br", null),
      "Order products with items spelled with the Periodic Table of Elements"
    )
  );
};

export default App;
