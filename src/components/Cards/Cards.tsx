import { useState } from 'react';
import { StyledCards, StyledTextarea, StyledButton } from './styled';
import CardsContent from '../CardsContent';
import { CommentsType } from '../Board/Board';

interface PropsType {
  isEditMode: boolean;
  cardTitle: string;
  cardId: string;
  listId: string;
  userName: string;
  listTitle: string;
  description: string;
  comments: CommentsType[];
  addComment: (commentValue: string, cardId: string) => void;
  deleteComment: (id: string) => void;
  deleteCard: (id: string, cardId: string) => void;
  updateCardNameInState: (id: string, value: string) => void;
  updateDescriptionInCards: (cardId: string, value: string) => void;
  updateCommentInState: (id: string, value: string) => void;
}

const Cards = (props: PropsType) => {
  const {
    isEditMode,
    cardTitle,
    cardId,
    listId,
    userName,
    listTitle,
    description,
    comments,
    addComment,
    deleteComment,
    deleteCard,
    updateCardNameInState,
    updateDescriptionInCards,
    updateCommentInState,
  } = props;

  const filteredComments = comments.filter((comment: CommentsType) => comment.cardId === cardId);
  const [editMode, setEditMode] = useState(isEditMode);
  const [cardTitleValue, setCardTitleValue] = useState(cardTitle);
  const [commentValue, setCommentValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => setIsOpen(false);

  const deactivateEditMode = () => {
    if (!cardTitleValue) {
      deleteCard(listId, cardId);
      return;
    }
    updateCardNameInState(cardId, cardTitleValue);
    setEditMode(false);
  };
  const onTextareaChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setCardTitleValue(e.currentTarget.value);
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
            deleteCard(listId, cardId);
          }}>&#215;</StyledButton>
          {!!filteredComments.length && (
            <div>{filteredComments.length} comments</div>
          )}
        </StyledCards>
      )}
      <CardsContent
        open={isOpen}
        id={cardId}
        listId={listId}
        cardTitle={cardTitle}
        userName={userName}
        commentsAmount={filteredComments}
        listTitle={listTitle}
        description={description}
        closeModal={closeModal}
        addComment={addComment}
        deleteComment={deleteComment}
        deleteCard={deleteCard}
        onCommentChange={(event) => onCommentChange(event)}
        setCardTitleValue={setCardTitleValue}
        updateCommentInState={updateCommentInState}
        updateCardNameInState={updateCardNameInState}
        updateDescriptionInCards={updateDescriptionInCards}
      />
    </>
  );
};

export default Cards;