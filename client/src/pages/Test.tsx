/** @jsx jsx */
import { jsx } from "@emotion/core";
import gql from "graphql-tag";
import {
  useHealthCheckMessageQuery,
  GetItemsQueryResult,
  useGetItemsQuery,
  GetItemsQuery,
} from "src/types/generated/graphql";
import { useState } from "react";

// eslint-disable-next-line no-unused-expressions
gql`
  query healthCheckMessage {
    healthCheckMessage
  }
`;

gql`
  query getItems {
    items {
      id
    }
  }
`;

// getItems operation の結果の型
// typescript-operations のおかげ
const items: GetItemsQuery = {
  items: [{ id: 1234 }],
};

export const Test = () => {
  const [inputValue, setInputValue] = useState<string>("");

  // typescript-react-apollo plugin のおかげ。
  // hooks ができている
  const { data } = useHealthCheckMessageQuery({
    onCompleted({ healthCheckMessage }) {
      setInputValue(healthCheckMessage);
    },
  });

  // typescript-react-apollo plugin のおかげ。
  // hooks ができている
  const { data: items } = useGetItemsQuery();

  if (!data) {
    return <div>ローディング</div>;
  }

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
    </div>
  );
};
