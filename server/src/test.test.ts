import { GraphQLClient } from "graphql-request";
import { getSdk } from "src/types/generated/request";
import "isomorphic-fetch";

import gql from "graphql-tag";

const client = new GraphQLClient("http://localhost:8080/graphql");
const sdk = getSdk(client);

describe("tst", () => {
  it("test", async () => {
    gql`
      query getItems {
        items {
          name
          id
        }
      }
    `;

    try {
      const res = await sdk.getItems();
      const { data, errors } = await sdk.getItems();
      if (errors) {
        errors.map((o) => o.message);
      }
      if (data) {
        console.log(data.items.map((o) => o.id));
      }
    } catch (e) {}
  });
});
