import List from '../List';
import { StyledTables, Flexbox, StyledButton } from './styled';
import { useDispatch, useSelector } from 'react-redux';
import { addList, selectLists } from '../../redux/listsSlice';
interface PropsType {
  userName: string;
}

const Board: React.FC<PropsType> = ({ userName }) => {
  const lists = useSelector(selectLists);
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
            userName={userName}
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
