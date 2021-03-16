import { Input, StyledComment, StyledButton } from './styled';
import { CommentsType } from '../Cards/Cards';
import { useState } from 'react';

interface PropsType {
  commentsAmount: CommentsType[] | null;
  addComment: () => void;
  loginName: string;
}

const CardsComments = (props: PropsType) => {
  const { commentsAmount, addComment, loginName } = props;

  const [editMode, setEditMode] = useState(false);

  const toggleEditMode = (editMode: boolean) => {
    editMode ? setEditMode(false) : setEditMode(true);
  };
  console.log(commentsAmount);
  return (
    <div>
      <h4>Activity</h4>
      <StyledComment>
        <Input
          placeholder="Write a comment..."
          onFocus={() => toggleEditMode(editMode)}
        />
        {editMode && <StyledButton onClick={addComment}>Save</StyledButton>}
      </StyledComment>

      <div> </div>
      <div> {loginName}</div>
    </div>
  );
};

export default CardsComments;
