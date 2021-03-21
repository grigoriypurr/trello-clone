import { useEffect, useState } from 'react';
import { StyledCards, StyledTextarea, StyledButton } from './styled';
import CardsContent from '../CardsContent/CardsContent';
import { v1 as uuidv1 } from 'uuid';
import { useStateWithLocalStorage } from '../../App';
import { CommentsType } from '../Board/Board';

interface PropsType {
  cardTitle: string;
  isEditMode: boolean;
  deleteCard: (cardId: string) => void;
  cardId: string;
  listId: string;
  userName: string;
  listTitle: string;
  cardsIds: string[];
  updateCardNameInState: (id: string, value: string) => void;
  updateDescriptionInCards: (cardId: string, value: string) => void
  description: string;
  updateCardsIdsInList: (listId: string, cardsIds: string[]) => void
  addComment: (commentValue: string, cardId: string) => void
  deleteComment: (id: string) => void
  updateCommentInState: (id: string, value: string) => void
  comments: CommentsType[]

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
    updateCardsIdsInList,
    addComment,
    deleteComment,
    updateCommentInState,
    comments
  } = props;
  const filteredComments = comments.filter((comment: CommentsType) => comment.cardId === cardId )
  const [editMode, setEditMode] = useState(isEditMode);
  const [cardTitleValue, setcardTitleValue] = useState(cardTitle);
  // const [commentsAmount, setCommentsAmount] = useState( filteredComments );


  const [commentValue, setCommentValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);


// useEffect(()=>{filteredComments},[comments])
  const closeModal = () => setIsOpen(false);

  const deactivateEditMode = () => {
    if (!cardTitleValue) {
      deleteCard(cardId)
      updateCardsIdsInList(listId, cardsIds)
      return
    }
    updateCardNameInState(cardId, cardTitleValue);
    setEditMode(false);
  };



  const onTextareaChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setcardTitleValue(e.currentTarget.value);
  };

  const onCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentValue(e.currentTarget.value);
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
          <StyledButton onClick={() => {
            deleteCard(cardId)
            updateCardsIdsInList(listId, cardsIds)
          }}>&#215;</StyledButton>
          {!!filteredComments.length && (
            <div>{filteredComments.length} comments</div>
          )}
        </StyledCards>
      )}
      <CardsContent
        open={isOpen}
        closeModal={closeModal}
        cardTitle={cardTitle}
        commentsAmount={filteredComments}
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
