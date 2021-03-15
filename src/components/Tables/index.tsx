import { useState } from 'react';
import List from './List';
import { StyledTables, Flexbox, StyledButton } from './styled';
import { v1 as uuidv1 } from 'uuid';

interface ListType {
  id: string;
  inputValue: string;
  isEditMode: boolean;
}
const initialLists = [
  {
    id: '0',
    inputValue: 'TODO',
    isEditMode: false,
  },
  {
    id: '1',
    inputValue: 'In Progress',
    isEditMode: false,
  },
  {
    id: '2',
    inputValue: 'Testing',
    isEditMode: false,
  },
  {
    id: '3',
    inputValue: 'Done',
    isEditMode: false,
  },
];

const Tables = () => {
  const [lists, setLists] = useState<ListType[]>(initialLists);
  // const [value, setValue] = useState([...lists.map((item) => item.inputValue)]);
  // console.log(value);
  // const add = (values: string) => {
  //   setValue(value.map((item, idx) => (item[idx] !== item[1] ? item : values)));
  //   setLists(lists.map((item) => item));

  //   console.log(value);
  // };

  const deleteList = (id: string) => {
    console.log(id);
    console.log(lists[1].id);
    const newList = lists.filter((item) => {
      return item.id !== id;
    });
    console.log(newList);
    setLists(newList);
  };

  const addList = () => {
    console.log('------------');
    const newLists = [
      ...lists,
      { id: uuidv1(), inputValue: '', isEditMode: true },
    ];
    setLists(newLists as ListType[]);
    console.log(lists);
  };
  console.log(lists);
  return (
    <StyledTables>
      <Flexbox>
        {lists.map((item, idx) => (
          <List
            key={item.id}
            deleteList={() => deleteList(item.id)}
            inputValue={item.inputValue}
            editMode={item.isEditMode}
            id={item.id}
            // add={add}
          />
        ))}
        <StyledButton>
          <button onClick={addList}>+ Add another list</button>
        </StyledButton>
      </Flexbox>
    </StyledTables>
  );
};

export default Tables;
