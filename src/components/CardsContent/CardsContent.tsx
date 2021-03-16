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

interface PropType {
  open: boolean;
  closeModal: () => void;
  cardTitleValue: string;
  commentsAmount: CommentsType[] | null;
  loginName: string;
  listTitle: string;
  deleteCard: (id: string) => void;
  id: string;
  onTextareaChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  addComment: () => void;
}

const CardsContent = (props: PropType) => {
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
  } = props;

  const [cardsTitleEditMode, setCardsTitleEditMode] = useState(false);
  const [descriptionEditMode, setDescriptionEditMode] = useState(false);
  // const [CardsTitleEditMode, setCardsTitleEditMode] = useState(false);
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
                margin="10px"
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

        {/* <div>{loginName}</div> */}

        <CardsComments
          commentsAmount={commentsAmount}
          addComment={addComment}
          loginName={loginName}
        />
        <StyledButton
          type="button"
          alignSelf="flex-start"
          onClick={() => deleteCard(id)}
        >
          Delete Card
        </StyledButton>
      </StyledPopup>
    </div>
  );
};

export default CardsContent;
