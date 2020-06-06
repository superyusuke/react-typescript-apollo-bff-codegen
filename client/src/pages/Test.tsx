/** @jsx jsx */
import { jsx } from "@emotion/core";
import gql from "graphql-tag";
import {
  useHealthCheckMessageQuery,
  usePgQuery,
} from "src/types/generated/graphql";
import { useState } from "react";

// eslint-disable-next-line no-unused-expressions
gql`
  query healthCheckMessage {
    healthCheckMessage
  }
`;

// eslint-disable-next-line no-unused-expressions
gql`
  query pg {
    pg
  }
`;

export const Test = () => {
  const [inputValue, setInputValue] = useState<string>("");

  const { data } = useHealthCheckMessageQuery({
    onCompleted({ healthCheckMessage }) {
      setInputValue(healthCheckMessage);
    },
  });

  const { data: pgData } = usePgQuery({
    onCompleted({ pg }) {
      console.log("hey");
      console.log(pg, "prismaDB");
    },
  });

  console.log(pgData?.pg, "pg");

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
