import { Input, StyledComment, StyledButton } from './styled';
import { CommentsType } from '../Board/Board';
import { useState } from 'react';
import Comment from '../Comment';

interface PropsType {
  userName: string;
  id:string
  commentsAmount: CommentsType[];
  addComment: (commentValue:string, cardId:string) => void;
  deleteComment: (id: string) => void;
  updateCommentInState: (id: string, value: string) => void;
  onCommentChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const CardsComments = (props: PropsType) => {
  const {
    userName,
    id,
    commentsAmount,
    addComment,
    deleteComment,
    updateCommentInState,
    onCommentChange,
  } = props;

  const [newCommenteditMode, setEditMode] = useState(false);
  const [inputValue, setInputvalue] = useState('');

  const activateEditMode = () => {
    setEditMode(true);
  };
  const handleClick = () => {
    setEditMode(false);
    addComment(inputValue,id);
    setInputvalue('');
  };
  const onInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputvalue(event.currentTarget.value);
    onCommentChange(event);
  };

  return (
    <div>
      <h4>Activity</h4>
      <StyledComment>
        <Input
          placeholder="Write a comment..."
          onClick={activateEditMode}
          value={inputValue}
          onChange={onInputChange}
          autoFocus
        />
        {newCommenteditMode && (
          <StyledButton onClick={handleClick}>Save</StyledButton>
        )}
      </StyledComment>
      {commentsAmount.map((item) => (
        <Comment
          key={item.id}
          userName={userName}
          commentId={item.id}
          commentValue={item.description}
          deleteComment={deleteComment}
          updateCommentInState={updateCommentInState}
        />
      ))}
    </div>
  );
};

export default CardsComments;