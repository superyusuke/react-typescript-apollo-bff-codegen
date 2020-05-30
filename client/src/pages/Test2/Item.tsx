/** @jsx jsx */
import { jsx } from "@emotion/core";
import { ItemsQuery } from "src/types/generated/graphql";

type ArrayElement<A> = A extends readonly (infer T)[] ? T : never;

type Props = {
  item: ArrayElement<ItemsQuery["items"]>;
};

export const Item = (props: Props) => {
  const { item } = props;

  const { id, name } = item;

  return (
    <div>
      {name} #{id}
    </div>
  );
};
