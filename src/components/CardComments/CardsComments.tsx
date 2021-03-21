import { Input, StyledComment, StyledButton } from './styled';
import { CommentsType } from '../Cards/Cards';
import { useState } from 'react';
import Comment from '../Comment/Comment';

interface PropsType {
  commentsAmount: CommentsType[];
  addComment: () => void;
  userName: string;
  onCommentChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  deleteComment: (id: string) => void;
  updateCommentInState: (id: string, value: string) => void;
}

const CardsComments = (props: PropsType) => {
  const {
    commentsAmount,
    addComment,
    userName,
    onCommentChange,
    deleteComment,
    updateCommentInState,
  } = props;

  const [newCommenteditMode, setEditMode] = useState(false);
  const [inputValue, setInputvalue] = useState('');

  const activateEditMode = () => {
    setEditMode(true);
  };
  const handleClick = () => {
    setEditMode(false);
    addComment();
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
          commentValue={item.commentValue}
          deleteComment={deleteComment}
          commentId={item.id}
          updateCommentInState={updateCommentInState}
        />
      ))}
    </div>
  );
};

export default CardsComments;
