import { useEffect, useRef, useState } from 'react';
import { StyledList, Flexbox, Input, StyledListTitle } from './styled';
import { v1 as uuidv1 } from 'uuid';
import Cards from '../Cards/Cards';
import { useStateWithLocalStorage } from '../../App';
import { CardsType } from '../Board/Board';

interface PropsType {
  deleteList: (id: string) => void;
  id: string;
  listName: string;
  userName: string;
  editMode: boolean;
  updateListNameInState: (id: string, value: string) => void;
  addCard: (listId: string) => void;
  deleteCard: (cardId: string) => void;
  updateCardNameInState: (id: string, value: string) => void;
  updateCardsIdsInList: (listId: string, cardsIds: string[]) => void
  updateDescriptionInCards: (cardId: string, value: string) => void
  cards: CardsType[]
}


const List = (props: PropsType) => {
  const {
    deleteList,
    listName,
    editMode,
    id,
    userName,
    updateListNameInState,
    addCard,
    deleteCard,
    updateCardNameInState,
    cards,
    updateCardsIdsInList,
    updateDescriptionInCards
  } = props;
  console.log("props cards:" + cards)
  const filteredListsCards = cards.filter(card => card.listId === id)
  const cardsIdsArray = filteredListsCards.map(card => card.id)

  
  console.log("IDs:" )

  const [isEditMode, setEditMode] = useState(editMode);
  const [value, setValue] = useState(listName);

  useEffect(() => {
    updateCardsIdsInList(id, cardsIdsArray)
  }, [cards])
  // const [cards, setCards] = useStateWithLocalStorage([], 'cards' + id);

  const inputActivateEditMode = () => {
    setEditMode(true);
  };
  const inputDeactivateEditMode = () => {
    if (!value) {
      deleteList(id);
      return
    }
    updateListNameInState(id, value);
    setEditMode(false);
  };

  const onInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.currentTarget.value);
  };


  const handleClick = () => {

    addCard(id)




  }

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
      {filteredListsCards.map((item: CardsType) => (
        <Cards
          key={item.id}
          cardTitle={item.cardsName}
          isEditMode={item.isEditMode}
          deleteCard={deleteCard}
          cardId={item.id}
          cardsIds={cardsIdsArray}
          listId={id}
          userName={userName}
          listTitle={value}
          updateCardNameInState={updateCardNameInState}
          updateDescriptionInCards={updateDescriptionInCards}
          description={item.description}
          updateCardsIdsInList={updateCardsIdsInList}
        />
      ))}
      <Flexbox justifyContent="space-between">
        <button onClick={handleClick} >Add Card</button>
        <button onClick={() => updateCardsIdsInList(id, cardsIdsArray)}>update</button>
        <div onClick={() => {deleteList(id)}}>&#215;</div>
      </Flexbox>
    </StyledList>
  );
};
export default List;
