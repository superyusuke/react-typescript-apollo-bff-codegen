/** @jsx jsx */
import { jsx } from "@emotion/core";
import gql from "graphql-tag";
import { useHealthCheckMessageQuery } from "src/types/generated/graphql";
import { useState } from "react";

// eslint-disable-next-line no-unused-expressions
gql`
  query healthCheckMessage {
    healthCheckMessage
  }
`;

export const Test = () => {
  const [inputValue, setInputValue] = useState<string>("");

  const { data } = useHealthCheckMessageQuery({
    onCompleted({ healthCheckMessage }) {
      setInputValue(healthCheckMessage);
    },
  });

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
