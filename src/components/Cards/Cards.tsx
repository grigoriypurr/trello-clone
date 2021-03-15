import { useState } from 'react';
import { StyledCards, StyledTextarea } from './styled';

interface PropsType {
  cardTitle: string;
  isEditMode: boolean;
}

const Cards = (props: PropsType) => {
  const { cardTitle, isEditMode } = props;

  const [editMode, setEditMode] = useState(isEditMode);
  const [cardTitleValue, setcardTitleValue] = useState(cardTitle);
  const [commentsCount, setCommentsCount] = useState(1);

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
        <StyledCards onClick={activateEditMode}>
          {cardTitleValue}
          {!!commentsCount && <div>{commentsCount} comments</div>}
        </StyledCards>
      )}
    </>
  );
};
export default Cards;
