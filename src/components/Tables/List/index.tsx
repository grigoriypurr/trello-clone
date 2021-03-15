import { useState } from 'react';
import { StyledList, Flexbox, Input, StyledListTitle } from './styled';
import { v1 as uuidv1 } from 'uuid';
import Cards from '../../Cards/Cards';

interface PropsType {
  deleteList: (id: string) => void;
  id: string;
  inputValue: string;
  // add: any;
  editMode: boolean;
}
interface CardsType {
  id: string;
  cardTitle: string;
  isEditMode: boolean;
}

const List = (props: PropsType) => {
  const { deleteList, inputValue, editMode, id } = props;
  const [isEditMode, setEditMode] = useState(editMode);
  const [value, setValue] = useState(inputValue);
  const [cards, setCards] = useState<CardsType[]>([]);

  const inputActivateEditMode = () => {
    setEditMode(true);
  };
  const inputDeactivateEditMode = () => {
    if (!value) {
      deleteList(id);
    }
    setEditMode(false);
  };
  const onInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.currentTarget.value);
  };
  const addCard = () => {
    const newCards = [
      ...cards,
      { id: uuidv1(), cardTitle: '', isEditMode: true },
    ];
    setCards(newCards as CardsType[]);
  };

  const MappedCards = cards.map((item) => (
    <Cards
      key={item.id}
      cardTitle={item.cardTitle}
      isEditMode={item.isEditMode}
    />
  ));

  return (
    <StyledList>
      {!isEditMode ? (
        <StyledListTitle onClick={inputActivateEditMode}>
          {value}
        </StyledListTitle>
      ) : (
        <Input
          value={value}
          autoFocus={true}
          onChange={onInputChange}
          onBlur={inputDeactivateEditMode}
        />
      )}
      {MappedCards}
      <Flexbox justifyContent="space-between">
        <button onClick={addCard}>Add Card</button>
        <div onClick={() => deleteList(id)}>&#215;</div>
      </Flexbox>
    </StyledList>
  );
};
export default List;
