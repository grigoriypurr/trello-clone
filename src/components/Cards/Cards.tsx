import { useState } from 'react';
import { StyledCards, StyledTextarea, StyledButton } from './styled';
import CardsContent from '../CardsContent/CardsContent';
import { v1 as uuidv1 } from 'uuid';
import { useStateWithLocalStorage } from '../../App';

interface PropsType {
  cardTitle: string;
  isEditMode: boolean;
  deleteCard: (id: string) => void;
  id: string;
  loginName: string;
  listTitle: string;
  updateCardNameInState: (id: string, value: string) => void;
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
    id,
    loginName,
    listTitle,
    updateCardNameInState,
  } = props;

  const [editMode, setEditMode] = useState(isEditMode);
  const [cardTitleValue, setcardTitleValue] = useState(cardTitle);
  const [commentsAmount, setCommentsAmount] = useStateWithLocalStorage(
    [],
    'commentsAmount' + id
  );
  const [commentValue, setCommentValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => setIsOpen(false);

  const deactivateEditMode = () => {
    updateCardNameInState(id, cardTitleValue);
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

  const activateEditMode = () => {
    setEditMode(true);
  };
  const onTextareaChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setcardTitleValue(e.currentTarget.value);
  };

  const onCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentValue(e.currentTarget.value);
    console.log(commentValue);
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
          // onDoubleClick={activateEditMode}
          onClick={() => setIsOpen((o) => !o)}
        >
          {cardTitleValue}
          <StyledButton onClick={() => deleteCard(id)}>&#215;</StyledButton>
          {!!commentsAmount.length && (
            <div>{commentsAmount.length} comments</div>
          )}
        </StyledCards>
      )}
      <CardsContent
        open={isOpen}
        closeModal={closeModal}
        cardTitleValue={cardTitleValue}
        commentsAmount={commentsAmount}
        loginName={loginName}
        listTitle={listTitle}
        deleteCard={() => deleteCard(id)}
        addComment={addComment}
        onCommentChange={(event) => onCommentChange(event)}
        id={id}
        commentValue={commentValue}
        deleteComment={deleteComment}
        updateCommentInState={updateCommentInState}
        updateCardNameInState={updateCardNameInState}
        setcardTitleValue={setcardTitleValue}
      />
    </>
  );
};
export default Cards;
