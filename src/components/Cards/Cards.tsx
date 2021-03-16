import { useState } from 'react';
import { StyledCards, StyledTextarea, StyledButton } from './styled';
import CardsContent from '../CardsContent/CardsContent';

interface PropsType {
  cardTitle: string;
  isEditMode: boolean;
  deleteCard: (id: string) => void;
  id: string;
}

const Cards = (props: PropsType) => {
  const { cardTitle, isEditMode, deleteCard, id } = props;

  const [editMode, setEditMode] = useState(isEditMode);
  const [cardTitleValue, setcardTitleValue] = useState(cardTitle);
  const [commentsCount, setCommentsCount] = useState(0);

  const deactivateEditMode = () => {
    setEditMode(false);
  };

  const activateEditMode = () => {
    setEditMode(true);
  };
  const onTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setcardTitleValue(e.currentTarget.value);
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
        <StyledCards onDoubleClick={activateEditMode}>
          {cardTitleValue}
          <StyledButton onClick={() => deleteCard(id)}>&#215;</StyledButton>
          {!!commentsCount && <div>{commentsCount} comments</div>}
        </StyledCards>
      )}
      <CardsContent />
    </>
  );
};
export default Cards;
