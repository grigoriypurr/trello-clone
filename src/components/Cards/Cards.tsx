import { useState } from 'react';
import { StyledCards, StyledTextarea, StyledButton } from './styled';
import CardsContent from '../CardsContent';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { deleteCard, updateCardName } from '../../redux/cardsSlice';

interface PropsType {
  isEditMode: boolean;
  cardTitle: string;
  cardId: string;
  listId: string;
  userName: string;
  listTitle: string;
  description: string;
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
  } = props;
  const dispatch = useDispatch();
  const comments = useSelector((state: RootState) => state.comments);
  const filteredComments = comments.filter(
    (comment) => comment.cardId === cardId
  );

  const [editMode, setEditMode] = useState(isEditMode);
  const [cardTitleValue, setCardTitleValue] = useState(cardTitle);
  const [commentValue, setCommentValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => setIsOpen(false);

  const deactivateEditMode = () => {
    if (!cardTitleValue) {
      dispatch(deleteCard({ listId, cardId }));
      return;
    }
    dispatch(updateCardName({ cardId, value: cardTitleValue }));
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
        <StyledCards onClick={() => setIsOpen((o) => !o)}>
          {cardTitleValue}
          <StyledButton
            onClick={() => {
              dispatch(deleteCard({ listId, cardId }));
            }}
          >
            &#215;
          </StyledButton>
          {!!filteredComments.length && (
            <div>{filteredComments.length} comments</div>
          )}
        </StyledCards>
      )}
      <CardsContent
        open={isOpen}
        cardId={cardId}
        listId={listId}
        cardTitle={cardTitle}
        userName={userName}
        commentsAmount={filteredComments}
        listTitle={listTitle}
        description={description}
        closeModal={closeModal}
        onCommentChange={(event) => onCommentChange(event)}
        setCardTitleValue={setCardTitleValue}
      />
    </>
  );
};

export default Cards;
