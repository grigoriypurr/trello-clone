import { useState } from 'react';
import { StyledList, Flexbox, Input, StyledListTitle } from './styled';
import { v1 as uuidv1 } from 'uuid';
import Cards from '../Cards/Cards';
import { useStateWithLocalStorage } from '../../App';

interface PropsType {
  deleteList: (id: string) => void;
  id: string;
  inputValue: string;
  loginName: string;
  editMode: boolean;
  updateListNameInState: (id: string, value: string) => void;
}
interface CardsType {
  id: string;
  cardTitle: string;
  isEditMode: boolean;
}

const List = (props: PropsType) => {
  const {
    deleteList,
    inputValue,
    editMode,
    id,
    loginName,
    updateListNameInState,
  } = props;

  const [isEditMode, setEditMode] = useState(editMode);
  const [value, setValue] = useState(inputValue);
  const [cards, setCards] = useStateWithLocalStorage([], 'cards' + id);

  const inputActivateEditMode = () => {
    setEditMode(true);
  };
  const inputDeactivateEditMode = () => {
    if (!value) {
      deleteList(id);
    }
    updateListNameInState(id, value);
    setEditMode(false);
  };

  const onInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.currentTarget.value);
  };

  const addCard = () => {
    const newCards = [
      ...cards,
      { id: uuidv1(), cardTitle: '', isEditMode: true },
    ];
    setCards(newCards as CardsType[]);
  };
  const deleteCard = (id: string) => {
    const newCards = cards.filter((item: CardsType) => {
      return item.id !== id;
    });
    setCards(newCards);
  };
  const updateCardNameInState = (id: string, value: string) => {
    const updatedCards = cards.map((item: CardsType) => {
      if (item.id === id) {
        return { ...item, cardTitle: value, isEditMode: false };
      } else {
        return item;
      }
    });
    setCards(updatedCards);
  };

  return (
    <StyledList>
      {!isEditMode ? (
        <StyledListTitle onClick={inputActivateEditMode}>
          {value}
        </StyledListTitle>
      ) : (
        <Input
          value={value}
          autoFocus={true}
          onChange={onInputChange}
          onBlur={inputDeactivateEditMode}
        />
      )}
      {cards.map((item: CardsType) => (
        <Cards
          key={item.id}
          cardTitle={item.cardTitle}
          isEditMode={item.isEditMode}
          deleteCard={() => deleteCard(item.id)}
          id={item.id}
          loginName={loginName}
          listTitle={value}
          updateCardNameInState={updateCardNameInState}
        />
      ))}
      <Flexbox justifyContent="space-between">
        <button onClick={addCard}>Add Card</button>
        <div onClick={() => deleteList(id)}>&#215;</div>
      </Flexbox>
    </StyledList>
  );
};
export default List;
