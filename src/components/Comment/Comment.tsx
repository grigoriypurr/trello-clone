import { useState } from 'react';
import { StyledComment, StyledDiv, Input, StyledButton } from './styled';

interface PropsType {
  loginName: string;
  commentValue: string;
  deleteComment: (id: string) => void;
  commentId: string;
  onCommentChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  updateCommentInState: (id: string, value: string) => void;
}

const Comment = (props: PropsType) => {
  const {
    loginName,
    commentValue,
    deleteComment,
    commentId,
    onCommentChange,
    updateCommentInState,
  } = props;

  const [editMode, setEditMode] = useState(false);
  const [inputValue, setInputValue] = useState(commentValue);

  const activateEditMode = () => {
    setEditMode(true);
  };

  const deactivateEditMode = () => {
    updateCommentInState(commentId, inputValue);
    setEditMode(false);
  };

  const onInputValueChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setInputValue(event.currentTarget.value);
  };

  return (
    <StyledDiv>
      <div> {loginName}</div>
      <StyledComment>
        {editMode ? (
          <div>
            <Input
              onClick={activateEditMode}
              value={inputValue}
              onChange={onInputValueChange}
              autoFocus
            />
            <StyledButton onClick={deactivateEditMode}>Save</StyledButton>
          </div>
        ) : (
          <div>{inputValue}</div>
        )}
      </StyledComment>
      {!editMode && (
        <div>
          <button onClick={() => deleteComment(commentId)}>delete</button>
          <button onClick={activateEditMode}>edit</button>
        </div>
      )}
    </StyledDiv>
  );
};
export default Comment;
