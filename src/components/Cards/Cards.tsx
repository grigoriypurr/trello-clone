import { useState } from 'react';
import { StyledCards, StyledTextarea, StyledButton } from './styled';
import CardsContent from '../CardsContent';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCard, updateCardName } from '../../redux/cardsSlice';
import { selectCommentsByCardId } from '../../redux/commentsSlice';

interface PropsType {
  isEditMode: boolean;
  cardTitle: string;
  cardId: string;
  listId: string;
  userName: string;
  listTitle: string;
  description: string;
}

const Cards: React.FC<PropsType> = ({
  isEditMode,
  cardTitle,
  cardId,
  listId,
  userName,
  listTitle,
  description,
}) => {
  const [editMode, setEditMode] = useState(isEditMode);
  const [cardTitleValue, setCardTitleValue] = useState(cardTitle);
  const [isOpen, setIsOpen] = useState(false);

  const commentsByCard = useSelector(selectCommentsByCardId(cardId));
  const dispatch = useDispatch();

  const closeModal = () => setIsOpen(false);

  const deactivateEditMode = () => {
    if (!cardTitleValue) {
      dispatch(deleteCard({ listId, cardId }));
      return;
    } else {
      dispatch(updateCardName({ cardId, value: cardTitleValue }));
      setEditMode(false);
    }
  };
  const onTextareaChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setCardTitleValue(e.currentTarget.value);
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
        <StyledCards onClick={() => setIsOpen((o) => !o)}>
          {cardTitleValue}
          <StyledButton
            onClick={() => {
              dispatch(deleteCard({ listId, cardId }));
            }}
          >
            &#215;
          </StyledButton>
          {!!commentsByCard.length && (
            <div>{commentsByCard.length} comments</div>
          )}
        </StyledCards>
      )}
      <CardsContent
        open={isOpen}
        cardId={cardId}
        listId={listId}
        cardTitle={cardTitleValue}
        userName={userName}
        commentsAmount={commentsByCard}
        listTitle={listTitle}
        description={description}
        closeModal={closeModal}
        setCardTitleValue={setCardTitleValue}
      />
    </>
  );
};

export default Cards;
