import List from '../List/List';
import { StyledTables, Flexbox, StyledButton } from './styled';
import { v1 as uuidv1 } from 'uuid';
import { useStateWithLocalStorage } from '../../App';

const initialLists = [
  {
    id: uuidv1(),
    inputValue: 'TODO',
    isEditMode: false,
  },
  {
    id: uuidv1(),
    inputValue: 'In Progress',
    isEditMode: false,
  },
  {
    id: uuidv1(),
    inputValue: 'Testing',
    isEditMode: false,
  },
  {
    id: uuidv1(),
    inputValue: 'Done',
    isEditMode: false,
  },
];

interface ListType {
  id: string;
  inputValue: string;
  isEditMode: boolean;
}
interface PropsType {
  loginName: string;
}

const Board = (props: PropsType) => {
  const [lists, setLists] = useStateWithLocalStorage(
    initialLists,
    'initialLists'
  );

  const updateListNameInState = (id: string, value: string) => {
    const updatedLists = lists.map((item: ListType) => {
      if (item.id === id) {
        return { ...item, inputValue: value, isEditMode: false };
      } else {
        return item;
      }
    });
    setLists(updatedLists);
  };

  const addList = () => {
    console.log('------------');
    const newLists = [
      ...lists,
      { id: uuidv1(), inputValue: '', isEditMode: true },
    ];
    setLists(newLists as ListType[]);
  };
  const deleteList = (id: string) => {
    const newList = lists.filter((item: ListType) => {
      return item.id !== id;
    });
    setLists(newList);
  };

  return (
    <StyledTables>
      <Flexbox>
        {lists.map((item: ListType) => (
          <List
            updateListNameInState={updateListNameInState}
            key={item.id}
            deleteList={() => deleteList(item.id)}
            inputValue={item.inputValue}
            editMode={item.isEditMode}
            id={item.id}
            loginName={props.loginName}
          />
        ))}
        <StyledButton>
          <button onClick={addList}>+ Add another list</button>
        </StyledButton>
      </Flexbox>
    </StyledTables>
  );
};

export default Board;
