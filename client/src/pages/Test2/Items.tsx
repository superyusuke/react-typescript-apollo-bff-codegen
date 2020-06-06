/** @jsx jsx */
import { jsx } from "@emotion/core";
import { ItemsQuery } from "src/types/generated/graphql";
import { Item } from "src/pages/Test2/Item";

type Props = {
  list: ItemsQuery["items"];
  refetch: any;
};

export const Items = (props: Props) => {
  const { list, refetch } = props;

  return (
    <div>
      {list.map((o) => (
        <Item item={o} key={o.id} refetch={refetch} />
      ))}
    </div>
  );
};
