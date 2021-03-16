import { useState } from 'react';
import { StyledCards, StyledTextarea, StyledButton } from './styled';
import CardsContent from '../CardsContent/CardsContent';
import { v1 as uuidv1 } from 'uuid';

interface PropsType {
  cardTitle: string;
  isEditMode: boolean;
  deleteCard: (id: string) => void;
  id: string;
  loginName: string;
  listTitle: string;
}
export interface CommentsType {
  id: string;
  commentValue: string;
}

const Cards = (props: PropsType) => {
  const { cardTitle, isEditMode, deleteCard, id, loginName, listTitle } = props;

  const [editMode, setEditMode] = useState(isEditMode);
  const [cardTitleValue, setcardTitleValue] = useState(cardTitle);
  //sprosit pro object passing
  const [commentsAmount, setCommentsAmount] = useState<CommentsType[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => setIsOpen(false);

  const deactivateEditMode = () => {
    setEditMode(false);
  };

  const activateEditMode = () => {
    setEditMode(true);
  };
  const onTextareaChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setcardTitleValue(e.currentTarget.value);
  };
  const addComment = () => {
    const newComments = [...commentsAmount, { id: uuidv1(), commentValue: '' }];
    setCommentsAmount(newComments as CommentsType[]);
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
          onDoubleClick={activateEditMode}
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
        onTextareaChange={(event) => onTextareaChange(event)}
        deleteCard={() => deleteCard(id)}
        addComment={addComment}
        id={id}
      />
    </>
  );
};
export default Cards;
