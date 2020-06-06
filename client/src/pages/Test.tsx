/** @jsx jsx */
import { jsx } from "@emotion/core";
import gql from "graphql-tag";
import {
  useHealthCheckMessageQuery,
  usePrismaDbQuery,
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
  query prismaDB {
    prismaDB
  }
`;

export const Test = () => {
  const [inputValue, setInputValue] = useState<string>("");

  const { data } = useHealthCheckMessageQuery({
    onCompleted({ healthCheckMessage }) {
      setInputValue(healthCheckMessage);
    },
  });

  const { data: prismaData } = usePrismaDbQuery({
    onCompleted({ prismaDB }) {
      console.log("hey");
      console.log(prismaDB, "prismaDB");
    },
  });

  console.log(prismaData?.prismaDB, "db");

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
