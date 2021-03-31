import { Input, StyledComment, StyledButton } from './styled';
import { useState } from 'react';
import Comment from '../Comment';
import { addComment, CommentsType } from '../../redux/commentsSlice';
import { useDispatch } from 'react-redux';

interface PropsType {
  listId: string;
  userName: string;
  cardId: string;
  commentsAmount: CommentsType[];
}

const CardsComments: React.FC<PropsType> = ({
  listId,
  userName,
  cardId,
  commentsAmount,
}) => {
  const [newCommentEditMode, setEditMode] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const dispatch = useDispatch();

  const activateEditMode = () => {
    setEditMode(true);
  };
  const handleClick = () => {
    setEditMode(false);
    dispatch(addComment({ cardId, listId, commentValue: inputValue }));
    setInputValue('');
  };
  const onInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.currentTarget.value);
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
        {newCommentEditMode && (
          <StyledButton onClick={handleClick}>Save</StyledButton>
        )}
      </StyledComment>
      {commentsAmount.map((item) => (
        <Comment
          key={item.id}
          userName={userName}
          commentId={item.id}
          commentValue={item.description}
        />
      ))}
    </div>
  );
};

export default CardsComments;
