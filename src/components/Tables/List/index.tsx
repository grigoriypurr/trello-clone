import { useState } from 'react';
import { StyledList, Flexbox, Input } from './styled';

interface PropsType {
  deleteList:
    | ((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void)
    | undefined;
}

const List = (props: PropsType) => {
  const { deleteList } = props;
  console.log(props);

  return (
    <StyledList>
      <Input />
      <Flexbox justifyContent="space-between">
        <button>Add List</button>
        <div onClick={deleteList}>&#215;</div>
      </Flexbox>
    </StyledList>
  );
};
export default List;
