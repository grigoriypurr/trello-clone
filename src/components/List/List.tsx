import { useState } from 'react';
import { StyledList, Flexbox, Input, StyledListTitle, StyledButton } from './styled';
import Cards from '../Cards';
import { CardsType, CommentsType } from '../Board/Board';

interface PropsType {
  editMode: boolean;
  id: string;
  listName: string;
  userName: string;
  cards: CardsType[];
  comments: CommentsType[];
  addCard: (listId: string) => void;
  deleteCard: (id: string, cardId: string) => void;
  addComment: (commentValue: string, cardId: string) => void;
  deleteComment: (id: string) => void;
  deleteList: (id: string) => void;
  updateListNameInState: (id: string, value: string) => void;
  updateCardNameInState: (id: string, value: string) => void;
  updateDescriptionInCards: (cardId: string, value: string) => void;
  updateCommentInState: (id: string, value: string) => void;
}

const List = (props: PropsType) => {
  const {
    editMode,
    id,
    listName,
    userName,
    cards,
    comments,
    addCard,
    deleteCard,
    addComment,
    deleteComment,
    deleteList,
    updateListNameInState,
    updateCardNameInState,
    updateDescriptionInCards,
    updateCommentInState,
  } = props;

  const filteredListsCards = cards.filter(card => card.listId === id);

  const [isEditMode, setEditMode] = useState(editMode);
  const [inputListName, setInputListName] = useState(listName);

  const inputActivateEditMode = () => {
    setEditMode(true);
  };
  const inputDeactivateEditMode = () => {
    if (!inputListName) {
      deleteList(id);
      return;
    }
    updateListNameInState(id, inputListName);
    setEditMode(false);
  };
  const onInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputListName(e.currentTarget.value);
  };
  const handleClick = () => {
    addCard(id);
  };

  return (
    <StyledList>
      {!isEditMode ? (
        <Flexbox justifyContent="space-between">
          <StyledListTitle onClick={inputActivateEditMode}>
            {inputListName}
          </StyledListTitle>
          <StyledButton onClick={() => { deleteList(id); }}>&#215;</StyledButton>
        </Flexbox>
      ) : (
        <Input
          value={inputListName}
          onChange={onInputChange}
          onBlur={inputDeactivateEditMode}
          autoFocus
        />
      )}
      {filteredListsCards.map((item: CardsType) => (
        <Cards
          key={item.id}
          isEditMode={item.isEditMode}
          cardTitle={item.cardsName}
          cardId={item.id}
          userName={userName}
          listId={id}
          listTitle={inputListName}
          description={item.description}
          comments={comments}
          addComment={addComment}
          deleteComment={deleteComment}
          deleteCard={deleteCard}
          updateCardNameInState={updateCardNameInState}
          updateDescriptionInCards={updateDescriptionInCards}
          updateCommentInState={updateCommentInState}
        />
      ))}
      <Flexbox justifyContent="space-between">
        <button onClick={handleClick} >Add Card</button>
      </Flexbox>
    </StyledList>
  );
};

export default List;