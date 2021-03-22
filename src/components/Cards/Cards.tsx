import { useState } from 'react';
import { StyledCards, StyledTextarea, StyledButton } from './styled';
import CardsContent from '../CardsContent/CardsContent';


import { CommentsType } from '../Board/Board';

interface PropsType {
  cardTitle: string;
  isEditMode: boolean;
  deleteCard: (id:string,cardId: string) => void;
  cardId: string;
  listId: string;
  userName: string;
  listTitle: string;
  updateCardNameInState: (id: string, value: string) => void;
  updateDescriptionInCards: (cardId: string, value: string) => void
  description: string;
  
  addComment: (commentValue: string, cardId: string) => void
  deleteComment: (id: string) => void
  updateCommentInState: (id: string, value: string) => void
  comments: CommentsType[]
}

const Cards = (props: PropsType) => {
  const {
    cardTitle,
    isEditMode,
    deleteCard,
    cardId,
    userName,
    listTitle,
    listId,
    updateCardNameInState,
   
    updateDescriptionInCards,
    description,
    
    addComment,
    deleteComment,
    updateCommentInState,
    comments
  } = props;
  const filteredComments = comments.filter((comment: CommentsType) => comment.cardId === cardId )
  const [editMode, setEditMode] = useState(isEditMode);
  const [cardTitleValue, setcardTitleValue] = useState(cardTitle);
  // const [commentsAmount, setCommentsAmount] = useState( filteredComments );


  const [commentValue, setCommentValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);


// useEffect(()=>{filteredComments},[comments])
  const closeModal = () => setIsOpen(false);

  const deactivateEditMode = () => {
    if (!cardTitleValue) {
      deleteCard(listId,cardId)
      
      return
    }
    updateCardNameInState(cardId, cardTitleValue);
    setEditMode(false);
  };



  const onTextareaChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setcardTitleValue(e.currentTarget.value);
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
        <StyledCards
          onClick={() => setIsOpen((o) => !o)}
        >
          {cardTitleValue}
          <StyledButton onClick={() => {
            deleteCard(listId,cardId)
           
          }}>&#215;</StyledButton>
          {!!filteredComments.length && (
            <div>{filteredComments.length} comments</div>
          )}
        </StyledCards>
      )}
      <CardsContent
        open={isOpen}
        closeModal={closeModal}
        cardTitle={cardTitle}
        commentsAmount={filteredComments}
        userName={userName}
        listTitle={listTitle}
        deleteCard={deleteCard}
        addComment={addComment}
        onCommentChange={(event) => onCommentChange(event)}
        id={cardId}
        commentValue={commentValue}
        deleteComment={deleteComment}
        updateCommentInState={updateCommentInState}
        updateCardNameInState={updateCardNameInState}
        setcardTitleValue={setcardTitleValue}
        updateDescriptionInCards={updateDescriptionInCards}
        description={description}
        listId={listId}
      />
    </>
  );
};
export default Cards;
