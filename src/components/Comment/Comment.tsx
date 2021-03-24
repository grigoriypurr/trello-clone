import { useState } from 'react';
import { deleteComment, updateComment } from '../../redux/commentsSlice';
import { StyledComment, StyledDiv, Input, StyledButton } from './styled';
import { useDispatch } from 'react-redux';
interface PropsType {
  userName: string;
  commentValue: string;
  commentId: string;
}

const Comment = (props: PropsType) => {
  const { userName, commentValue, commentId } = props;
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const [inputValue, setInputValue] = useState(commentValue);

  const activateEditMode = () => {
    setEditMode(true);
  };
  const deactivateEditMode = () => {
    dispatch(updateComment({ commentId, value: inputValue }));
    setEditMode(false);
  };
  const onInputValueChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setInputValue(event.currentTarget.value);
  };

  return (
    <StyledDiv>
      <div>{userName}</div>
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
          <button onClick={() => dispatch(deleteComment(commentId))}>
            delete
          </button>
          <button onClick={activateEditMode}>edit</button>
        </div>
      )}
    </StyledDiv>
  );
};

export default Comment;
