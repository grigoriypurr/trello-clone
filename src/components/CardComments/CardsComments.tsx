import { Input, StyledComment, StyledButton } from './styled';

import { useState } from 'react';
import Comment from '../Comment';
import { addComment, CommentsType } from '../../redux/commentsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
interface PropsType {
  listId: string;
  userName: string;
  cardId: string;
  commentsAmount: CommentsType[];
  onCommentChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const CardsComments = (props: PropsType) => {
  const { listId, userName, cardId, commentsAmount, onCommentChange } = props;
  const dispatch = useDispatch();

  const [newCommenteditMode, setEditMode] = useState(false);
  const [inputValue, setInputvalue] = useState('');

  const activateEditMode = () => {
    setEditMode(true);
  };
  const handleClick = () => {
    setEditMode(false);
    dispatch(addComment({ cardId, listId, commentValue: inputValue }));
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
          cardId={cardId}
          listId={listId}
        />
      ))}
    </div>
  );
};

export default CardsComments;
