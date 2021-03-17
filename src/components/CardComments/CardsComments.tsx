import { Input, StyledComment, StyledButton } from './styled';
import { CommentsType } from '../Cards/Cards';
import { useState } from 'react';
import Comment from '../Comment/Comment';

interface PropsType {
  commentsAmount: CommentsType[];
  addComment: () => void;
  loginName: string;
  onCommentChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  commentValue: string;
  deleteComment: (id: string) => void;
  updateCommentInState: (id: string, value: string) => void;
}

const CardsComments = (props: PropsType) => {
  const {
    commentsAmount,
    addComment,
    loginName,
    onCommentChange,
    commentValue,
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
          loginName={loginName}
          commentValue={item.commentValue}
          deleteComment={deleteComment}
          commentId={item.id}
          onCommentChange={(e) => onCommentChange(e)}
          updateCommentInState={updateCommentInState}
        />
      ))}
      <div> </div>
    </div>
  );
};

export default CardsComments;
