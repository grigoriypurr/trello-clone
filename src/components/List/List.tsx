import { useState } from 'react';
import {
  StyledList,
  FlexBox,
  Input,
  StyledListTitle,
  StyledButton,
} from './styled';
import Cards from '../Cards';
import { updateListNameInState } from '../../redux/listsSlice';
import { deleteList } from '../../redux/commonActions';
import { addCard, selectCardsByListId } from '../../redux/cardsSlice';
import { useDispatch, useSelector } from 'react-redux';

interface PropsType {
  editMode: boolean;
  id: string;
  listName: string;
  userName: string;
  cardsIds: string[];
}

const List: React.FC<PropsType> = ({ editMode, id, listName, userName }) => {
  const [isEditMode, setEditMode] = useState(editMode);
  const [inputListName, setInputListName] = useState(listName);

  const filteredListsCards = useSelector(selectCardsByListId(id));
  const dispatch = useDispatch();

  const inputActivateEditMode = () => {
    setEditMode(true);
  };
  const inputDeactivateEditMode = () => {
    if (!inputListName) {
      dispatch(deleteList(id));
      return;
    } else {
      dispatch(updateListNameInState({ listId: id, value: inputListName }));
      setEditMode(false);
    }
  };
  const onInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputListName(e.currentTarget.value);
  };
  const handleClick = () => {
    dispatch(addCard(id));
  };

  return (
    <StyledList>
      {!isEditMode ? (
        <FlexBox justifyContent="space-between">
          <StyledListTitle onClick={inputActivateEditMode}>
            {inputListName}
          </StyledListTitle>
          <StyledButton
            onClick={() => {
              dispatch(deleteList(id));
            }}
          >
            &#215;
          </StyledButton>
        </FlexBox>
      ) : (
        <Input
          value={inputListName}
          onChange={onInputChange}
          onBlur={inputDeactivateEditMode}
          autoFocus
        />
      )}
      {filteredListsCards.map((item: any) => (
        <Cards
          key={item.id}
          isEditMode={item.isEditMode}
          cardTitle={item.cardsName}
          cardId={item.id}
          userName={userName}
          listId={id}
          listTitle={inputListName}
          description={item.description}
        />
      ))}
      <FlexBox justifyContent="space-between">
        <button onClick={handleClick}>Add Card</button>
      </FlexBox>
    </StyledList>
  );
};

export default List;
