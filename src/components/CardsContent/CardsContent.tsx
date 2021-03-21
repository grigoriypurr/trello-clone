import React, { useEffect, useState } from 'react';
import {
  StyledPopup,
  StyledCloseButton,
  StyledButton,
  Input,
  StyledCardTitle,
  Flexbox,
  StyledDescription,
  StyledSpan,
  StyledSpanWithUnderline,
} from './styled';
import { CommentsType } from '../Cards/Cards';
import CardsComments from '../CardComments/CardsComments';
import { useStateWithLocalStorage } from '../../App';

interface PropsType {
  open: boolean;
  closeModal: () => void;
  cardTitle: string;
  commentsAmount: CommentsType[];
  userName: string;
  listTitle: string;
  deleteCard: (id: string) => void;
  id: string;
  addComment: () => void;
  onCommentChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  commentValue: string;
  deleteComment: (id: string) => void;
  updateCommentInState: (id: string, value: string) => void;
  updateCardNameInState: (id: string, value: string) => void;
  setcardTitleValue: React.Dispatch<React.SetStateAction<string>>;
  updateDescriptionInCards: (cardId: string, value: string) => void
  description: string

}

const CardsContent = (props: PropsType) => {
  const {
    open,
    closeModal,
    commentsAmount,
    cardTitle,
    userName,
    listTitle,
    id,
    deleteCard,
    addComment,
    onCommentChange,
    deleteComment,
    updateCommentInState,
    updateCardNameInState,
    setcardTitleValue,
    updateDescriptionInCards,
    description

  } = props;

  const [cardsTitleEditMode, setCardsTitleEditMode] = useState(false);
  const [modalCardTitleValue, setModalCardTitleValue] = useState(cardTitle);

  const [descriptionEditMode, setDescriptionEditMode] = useState(false);
  const [descriptionValue, setDescriptionValue] = useState(
    description
  );
  //почему юзэффект юзаем?
  useEffect(() => {
    setModalCardTitleValue(cardTitle);
  }, [cardTitle])

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

  const handleInputOnBlur = (id: string, cardTitleValue: string) => {
    updateCardNameInState(id, cardTitleValue);
    setcardTitleValue(cardTitleValue);
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
        {cardsTitleEditMode ? (
          <Input
            value={modalCardTitleValue}
            onChange={(event) => onTextareaChange(event)}
            onBlur={() => handleInputOnBlur(id, modalCardTitleValue)}
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
          <Flexbox justifyContent="flex-start">
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
          </Flexbox>
          {descriptionEditMode ? (
            <Input
              value={descriptionValue}
              onChange={onDescriptionChange}
              onBlur={() => {
                toggleEditMode(descriptionEditMode, setDescriptionEditMode)
                updateDescriptionInCards(id, descriptionValue)
              }
              }
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
                toggleEditMode(descriptionEditMode, setDescriptionEditMode)
              }
              }
            >
              Add a more detailed description...
            </StyledDescription>
          )}
        </div>
        <CardsComments
          commentsAmount={commentsAmount}
          addComment={addComment}
          userName={userName}
          onCommentChange={(e) => onCommentChange(e)}
          deleteComment={deleteComment}
          updateCommentInState={updateCommentInState}
        />
        <StyledButton
          type="button"
          alignSelf="flex-start"
          marginTop="10px"
          onClick={() => deleteCard(id)}
        >
          Delete Card
        </StyledButton>
      </StyledPopup>
    </div>
  );
};

export default CardsContent;
