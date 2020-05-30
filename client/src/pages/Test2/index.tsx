/** @jsx jsx */
import { jsx } from "@emotion/core";
import gql from "graphql-tag";
import { useItemsQuery } from "src/types/generated/graphql";
import { Items } from "src/pages/Test2/Items";
import { ItemsQuery, useAddItemMutation } from "src/types/generated/graphql";

// eslint-disable-next-line no-unused-expressions
gql`
  query items {
    items {
      id
      name
    }
  }
`;

// eslint-disable-next-line no-unused-expressions
gql`
  mutation addItem($name: String!) {
    addItem(name: $name) {
      id
      name
    }
  }
`;

export const Test2 = () => {
  const { data, refetch, networkStatus } = useItemsQuery();

  const [mutation] = useAddItemMutation();

  const clickHandler = async () => {
    await mutation({ variables: { name: "newItem" } });
    await refetch();
  };

  if (!data) {
    return <div>ローディング</div>;
  }

  return (
    <div>
      <button type="button" onClick={clickHandler}>
        新しいものを追加する
      </button>
      <Items list={data.items} />
    </div>
  );
};
