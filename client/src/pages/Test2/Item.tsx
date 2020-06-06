/** @jsx jsx */
import { jsx } from "@emotion/core";
import { ItemsQuery, useDeleteItemMutation } from "src/types/generated/graphql";
import gql from "graphql-tag";

type ArrayElement<A> = A extends readonly (infer T)[] ? T : never;

type Props = {
  item: ArrayElement<ItemsQuery["items"]>;
  refetch: any;
};

// eslint-disable-next-line no-unused-expressions
gql`
  mutation deleteItem($id: Int!) {
    deleteItem(id: $id) {
      id
      name
    }
  }
`;

export const Item = (props: Props) => {
  const { item, refetch } = props;
  const { id, name } = item;

  const [deleteMutation] = useDeleteItemMutation({ variables: { id } });

  return (
    <div
      onClick={async () => {
        await deleteMutation();
        refetch();
      }}
    >
      {name} #{id}
    </div>
  );
};
