import React, { useState } from 'react';
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

interface PropsType {
  open: boolean;
  closeModal: () => void;
  cardTitleValue: string;
  commentsAmount: CommentsType[];
  loginName: string;
  listTitle: string;
  deleteCard: (id: string) => void;
  id: string;
  onTextareaChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  addComment: () => void;
  onCommentChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  commentValue: string;
  deleteComment: (id: string) => void;
  updateCommentInState: (id: string, value: string) => void;
}

const CardsContent = (props: PropsType) => {
  const {
    open,
    closeModal,
    commentsAmount,
    cardTitleValue,
    loginName,
    listTitle,
    id,
    deleteCard,
    onTextareaChange,
    addComment,
    onCommentChange,
    commentValue,
    deleteComment,
    updateCommentInState,
  } = props;

  const [cardsTitleEditMode, setCardsTitleEditMode] = useState(false);
  const [descriptionEditMode, setDescriptionEditMode] = useState(false);
  const [descriptionValue, setDescriptionValue] = useState('');

  const toggleEditMode = (
    editMode: boolean,
    stateSetter: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    editMode ? stateSetter(false) : stateSetter(true);
  };

  const onDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescriptionValue(e.currentTarget.value);
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
            value={cardTitleValue}
            onChange={(event) => onTextareaChange(event)}
            onBlur={() =>
              toggleEditMode(cardsTitleEditMode, setCardsTitleEditMode)
            }
            autoFocus
          />
        ) : (
          <StyledCardTitle
            onClick={() =>
              toggleEditMode(cardsTitleEditMode, setCardsTitleEditMode)
            }
          >
            <h4>{cardTitleValue}</h4>
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
              onBlur={() =>
                toggleEditMode(descriptionEditMode, setDescriptionEditMode)
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
              onClick={() =>
                toggleEditMode(descriptionEditMode, setDescriptionEditMode)
              }
            >
              Add a more detailed description...
            </StyledDescription>
          )}
        </div>
        <CardsComments
          commentsAmount={commentsAmount}
          addComment={addComment}
          loginName={loginName}
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
