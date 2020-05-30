/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useMemo, ReactNode } from "react";
import { Route, Switch } from "react-router";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { ApolloClient } from "apollo-client";
import { createUploadLink } from "apollo-upload-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider } from "@apollo/react-hooks";

import { setContext } from "apollo-link-context";

import { Test } from "src/pages/Test";
import { Test2 } from "src/pages/Test2";

export const createApolloClient = () => {
  const httpLink = createUploadLink({
    uri: "/graphql",
  });

  const setAuthorizationLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
      },
    };
  });

  const link = setAuthorizationLink.concat(httpLink);

  return new ApolloClient({
    link,
    cache: new InMemoryCache(),
  });
};

// これを参考に実装してみた
// https://github.com/auth0-samples/auth0-react-samples/issues/142#issuecomment-511497830
const ApolloWrapper = ({ children }: { children: ReactNode }) => {
  // fixme useMemo のエラーが出ているが、一応サンプル通りにしておく
  const apolloClient = useMemo(() => createApolloClient(), []);

  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
};

export const App = () => {
  return (
    <ApolloWrapper>
      <Router basename="/sub">
        <div>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/test">Test</Link>
            </li>
            <li>
              <Link to="/test2">Test2</Link>
            </li>
          </ul>
          <Switch>
            <Route path="/test">
              <Test />
            </Route>
            <Route path="/test2">
              <Test2 />
            </Route>
          </Switch>
        </div>
      </Router>
    </ApolloWrapper>
  );
};
