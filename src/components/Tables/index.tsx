import { useState } from 'react';
import List from './List';
import { StyledTables, Flexbox } from './styled';
import { v1 as uuidv1 } from 'uuid';

interface ListType {
  id: string;
}

const Tables = () => {
  const [lists, setLists] = useState<ListType[]>([]);

  const onDeleteList = (id: string) => {
    const newList = lists.filter((item) => {
      return item.id !== id;
    });
    setLists(newList);
  };

  const MappedLists = lists.map((item, index) => (
    <List key={index} deleteList={() => onDeleteList(item.id)} />
  ));

  const clickHandler = () => {
    const newList = [...lists, { id: uuidv1() }];
    setLists(newList);

    console.log(newList);
  };

  return (
    <StyledTables>
      <Flexbox>{MappedLists}</Flexbox>
      <div>
        <button onClick={clickHandler}>+ Add another list</button>
      </div>
    </StyledTables>
  );
};

export default Tables;
