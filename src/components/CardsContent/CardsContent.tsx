import React, { useEffect, useState } from 'react';
import {
  StyledPopup,
  StyledCloseButton,
  StyledButton,
  Input,
  StyledCardTitle,
  FlexBox,
  StyledDescription,
  StyledSpan,
  StyledSpanWithUnderline,
} from './styled';
import { useDispatch } from 'react-redux';
import CardsComments from '../CardComments';
import { CommentsType } from '../../redux/commentsSlice';
import {
  deleteCard,
  updateCardName,
  updateDescriptionInCard,
} from '../../redux/cardsSlice';

interface PropsType {
  open: boolean;
  description: string;
  cardTitle: string;
  userName: string;
  listTitle: string;
  cardId: string;
  listId: string;
  commentsAmount: CommentsType[];
  closeModal: () => void;
  setCardTitleValue: React.Dispatch<React.SetStateAction<string>>;
}

const CardsContent: React.FC<PropsType> = ({
  open,
  description,
  cardTitle,
  userName,
  listTitle,
  cardId,
  listId,
  commentsAmount,
  closeModal,
  setCardTitleValue,
}) => {
  const [cardsTitleEditMode, setCardsTitleEditMode] = useState(false);
  const [modalCardTitleValue, setModalCardTitleValue] = useState(cardTitle);
  const [descriptionEditMode, setDescriptionEditMode] = useState(false);
  const [descriptionValue, setDescriptionValue] = useState(description);

  const dispatch = useDispatch();

  useEffect(() => {
    setModalCardTitleValue(cardTitle);
  }, [cardTitle]);

  const toggleEditMode = (
    editMode: boolean,
    stateSetter: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    editMode ? stateSetter(false) : stateSetter(true);
  };
  const onTextareaChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setModalCardTitleValue(e.currentTarget.value);
  };
  const onDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescriptionValue(e.currentTarget.value);
  };
  const handleInputOnBlur = (cardId: string, cardTitleValue: string) => {
    dispatch(updateCardName({ cardId, value: cardTitleValue }));
    setCardTitleValue(cardTitleValue);
    toggleEditMode(cardsTitleEditMode, setCardsTitleEditMode);
  };

  return (
    <div>
      <StyledPopup
        open={open}
        closeOnEscape
        closeOnDocumentClick
        onClose={closeModal}
      >
        <StyledCloseButton onClick={closeModal}>&times;</StyledCloseButton>
        {userName}
        {cardsTitleEditMode ? (
          <Input
            value={modalCardTitleValue}
            onChange={(event) => onTextareaChange(event)}
            onBlur={() => handleInputOnBlur(cardId, modalCardTitleValue)}
            autoFocus
          />
        ) : (
          <StyledCardTitle
            onClick={() =>
              toggleEditMode(cardsTitleEditMode, setCardsTitleEditMode)
            }
          >
            <h4>{cardTitle}</h4>
            <StyledSpan>
              in list{' '}
              <StyledSpanWithUnderline> {listTitle}</StyledSpanWithUnderline>
            </StyledSpan>
          </StyledCardTitle>
        )}
        <div>
          <FlexBox justifyContent="flex-start">
            <h4>Description:</h4>
            {(descriptionValue || descriptionEditMode) && (
              <StyledButton
                marginTop="10px"
                alignSelf="center"
                onClick={() =>
                  toggleEditMode(descriptionEditMode, setDescriptionEditMode)
                }
              >
                Edit
              </StyledButton>
            )}
          </FlexBox>
          {descriptionEditMode ? (
            <Input
              value={descriptionValue}
              onChange={onDescriptionChange}
              onBlur={() => {
                toggleEditMode(descriptionEditMode, setDescriptionEditMode);
                dispatch(
                  updateDescriptionInCard({ cardId, value: descriptionValue })
                );
              }}
              autoFocus
            />
          ) : descriptionValue ? (
            <div
              onClick={() =>
                toggleEditMode(descriptionEditMode, setDescriptionEditMode)
              }
            >
              {descriptionValue}
            </div>
          ) : (
            <StyledDescription
              onClick={() => {
                toggleEditMode(descriptionEditMode, setDescriptionEditMode);
              }}
            >
              Add a more detailed description...
            </StyledDescription>
          )}
        </div>
        <CardsComments
          listId={listId}
          cardId={cardId}
          commentsAmount={commentsAmount}
          userName={userName}
        />
        <StyledButton
          type="button"
          alignSelf="flex-start"
          marginTop="10px"
          onClick={() => dispatch(deleteCard({ listId, cardId }))}
        >
          Delete Card
        </StyledButton>
      </StyledPopup>
    </div>
  );
};

export default CardsContent;
