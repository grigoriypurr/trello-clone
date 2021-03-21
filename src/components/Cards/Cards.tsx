import { useEffect, useState } from 'react';
import { StyledCards, StyledTextarea, StyledButton } from './styled';
import CardsContent from '../CardsContent/CardsContent';
import { v1 as uuidv1 } from 'uuid';
import { useStateWithLocalStorage } from '../../App';

interface PropsType {
  cardTitle: string;
  isEditMode: boolean;
  deleteCard: (cardId: string) => void;
  cardId: string;
  listId:string;
  userName: string;
  listTitle: string;
  cardsIds:string[];
  updateCardNameInState: (id: string, value: string) => void;
  updateDescriptionInCards:(cardId:string,value:string)=>void
  description: string;
  updateCardsIdsInList: (listId: string, cardsIds: string[]) => void


}
export interface CommentsType {
  id: string;
  commentValue: string;
}

const Cards = (props: PropsType) => {
  const {
    cardTitle,
    isEditMode,
    deleteCard,
    cardId,
    userName,
    listTitle,
    listId,
    updateCardNameInState,
    cardsIds,
    updateDescriptionInCards,
    description,
    updateCardsIdsInList
  } = props;

  const [editMode, setEditMode] = useState(isEditMode);
  const [cardTitleValue, setcardTitleValue] = useState(cardTitle);
  const [commentsAmount, setCommentsAmount] = useStateWithLocalStorage(
    [],
    'commentsAmount' + cardId
  );
  const [commentValue, setCommentValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  


  const closeModal = () => setIsOpen(false);

  const deactivateEditMode = () => {
    if (!cardTitleValue) {
      deleteCard(cardId)
      updateCardsIdsInList(listId,cardsIds)
      return
    }
    updateCardNameInState(cardId, cardTitleValue);
    setEditMode(false);
  };
  const updateCommentInState = (id: string, value: string) => {
    const updatedComments = commentsAmount.map((item: CommentsType) => {
      if (item.id === id) {
        return { id: id, commentValue: value };
      } else {
        return item;
      }
    });
    setCommentsAmount(updatedComments);
  };

  const onTextareaChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setcardTitleValue(e.currentTarget.value);
  };

  const onCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentValue(e.currentTarget.value);
  };

  const addComment = () => {
    if (!commentValue) return;
    const newComments = [
      ...commentsAmount,
      { id: uuidv1(), commentValue: commentValue },
    ];
    setCommentsAmount(newComments as CommentsType[]);
  };
  const deleteComment = (id: string) => {
    const newComments = commentsAmount.filter((item: CommentsType) => {
      return item.id !== id;
    });
    setCommentsAmount(newComments);
  };

  return (
    <>
      {editMode ? (
        <StyledTextarea
          onBlur={deactivateEditMode}
          onChange={onTextareaChange}
          value={cardTitleValue}
          autoFocus
        />
      ) : (
        <StyledCards
          onClick={() => setIsOpen((o) => !o)}
        >
          {cardTitleValue}
          <StyledButton onClick={() => {deleteCard(cardId)
          updateCardsIdsInList(listId,cardsIds)
          }}>&#215;</StyledButton>
          {!!commentsAmount.length && (
            <div>{commentsAmount.length} comments</div>
          )}
        </StyledCards>
      )}
      <CardsContent
        open={isOpen}
        closeModal={closeModal}
        cardTitle={cardTitle}
        commentsAmount={commentsAmount}
        userName={userName}
        listTitle={listTitle}
        deleteCard={deleteCard}
        addComment={addComment}
        onCommentChange={(event) => onCommentChange(event)}
        id={cardId}
        commentValue={commentValue}
        deleteComment={deleteComment}
        updateCommentInState={updateCommentInState}
        updateCardNameInState={updateCardNameInState}
        setcardTitleValue={setcardTitleValue}
        updateDescriptionInCards={updateDescriptionInCards}
    description={description}

      />
    </>
  );
};
export default Cards;
