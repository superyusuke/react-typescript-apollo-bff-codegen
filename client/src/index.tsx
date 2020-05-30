import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { App } from "src/AppRoutingTest";
import { Helmet } from "react-helmet";

ReactDOM.render(
  <>
    <Helmet>
      <link
        href="https://fonts.googleapis.com/css?family=M+PLUS+Rounded+1c"
        rel="stylesheet"
      />
      <html lang="ja" />
      <title>MakeMoney.ts</title>
    </Helmet>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </>,
  document.getElementById("root")
);
