import List from '../List';
import { StyledTables, Flexbox, StyledButton } from './styled';
import { useSelector, useDispatch } from 'react-redux';
import { addList } from '../../redux/listsSlice';
import { RootState } from '../../redux/store';
interface PropsType {
  userName: string;
}

const Board = (props: PropsType) => {
  const lists = useSelector((state: RootState) => state.persistedReducer.lists);
  const dispatch = useDispatch();

  return (
    <StyledTables>
      <Flexbox>
        {lists.map((item) => (
          <List
            key={item.id}
            editMode={item.isEditMode}
            listName={item.listName}
            id={item.id}
            cardsIds={item.cardsIds}
            userName={props.userName}
          />
        ))}
        <StyledButton>
          <button
            onClick={() => {
              dispatch(addList());
            }}
          >
            + Add another list
          </button>
        </StyledButton>
      </Flexbox>
    </StyledTables>
  );
};

export default Board;
