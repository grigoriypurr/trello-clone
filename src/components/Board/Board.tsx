import List from '../List/List';
import { StyledTables, Flexbox, StyledButton } from './styled';
import { v1 as uuidv1 } from 'uuid';
import { useStateWithLocalStorage } from '../../App';

const initialLists = [
  {
    id: uuidv1(),
    listName: 'TODO',
    isEditMode: false,
    cardsIds: []
  },
  // {
  //   id: uuidv1(),
  //   listName: 'In Progress',
  //   isEditMode: false,
  //   cardsIds:[]
  // },
  // {
  //   id: uuidv1(),
  //   listName: 'Testing',
  //   isEditMode: false,
  //   cardsIds:[]
  // },
  // {
  //   id: uuidv1(),
  //   listName: 'Done',
  //   isEditMode: false,
  //   cardsIds:[]
  // },
];

interface PropsType {
  userName: string;
}
//почему не ругается на недостаток кардсайдис в листе при мапинге?
interface ListType {
  id: string;
  listName: string;
  isEditMode: boolean;
  cardsIds: string[]
}
interface CommentsType {
  id: string;
  description: string;
  cardId: string;
}
export interface CardsType {
  id: string;
  cardsName: string;
  description: string;
  listId: string;
  isEditMode: boolean;
}
//почему не типизируется в кастомном хуке?
const Board = (props: PropsType) => {
  const [lists, setLists] = useStateWithLocalStorage(
    initialLists,
    'Lists'
  );
  const [comments, setComments] = useStateWithLocalStorage(
    [],
    'Comments'
  );
  const [cards, setCards] = useStateWithLocalStorage(
    [],
    'Cards'
  );

  const updateListNameInState = (listId: string, value: string) => {
    const updatedLists = lists.map((item: ListType) => {
      if (item.id === listId) {
        return { ...item, listName: value, isEditMode: false };
      } else {
        return item;
      }
    });
    setLists(updatedLists);
  };
  const addList = () => {
    const newLists = [
      ...lists,
      { id: uuidv1(), listName: '', isEditMode: true, cardsIds: [] },
    ];
    setLists(newLists as ListType[]);
  };
  const deleteList = (id: string) => {
    const newList = lists.filter((item: ListType) => {
      return item.id !== id;
    });
    setLists(newList);
    const newCards=cards.filter((card:CardsType)=>card.listId !== id)
    setCards(newCards)
  };
  const updateCardsIdsInList = (listId: string, cardsIds: string[]) => {
    const newLists = lists.map((list: ListType) => {
      if (list.id === listId) {
        return { ...list, cardsIds: cardsIds }
      } else {
        return list
      }
    })
    setLists(newLists)
  }
  const updateDescriptionInCards = (cardId: string, value: string) => {
    const newCards = cards.map((card: CardsType) => {
      if (card.id === cardId) {
        return { ...card, description: value }
      } else {
        return card
      }
    })
    setCards(newCards)
  }
  const addCard = (listId: string) => {
    const newCards = [
      ...cards,
      { id: uuidv1(), cardsName: '', description: '', listId, isEditMode: true },
    ];
    setCards(newCards as CardsType[]);

  };
  const deleteCard = (cardId: string) => {
    const newCards = cards.filter((item: CardsType) => {
      return item.id !== cardId;
    });
    setCards(newCards);
    
  };
  const updateCardNameInState = (id: string, value: string) => {
    const updatedCards = cards.map((item: CardsType) => {
      if (item.id === id) {
        return { ...item, cardsName: value, isEditMode: false };
      } else {
        return item;
      }
    });
    setCards(updatedCards);
  };

  return (
    <StyledTables>
      <Flexbox>
        {lists.map((item: ListType) => (
          <List
            updateListNameInState={updateListNameInState}
            key={item.id}
            deleteList={() => deleteList(item.id)}
            listName={item.listName}
            editMode={item.isEditMode}
            cards={cards}
            id={item.id}
            userName={props.userName}
            addCard={addCard}
            deleteCard={deleteCard}
            updateCardNameInState={updateCardNameInState}
            updateCardsIdsInList={updateCardsIdsInList}
            updateDescriptionInCards={updateDescriptionInCards}
          />
        ))}
        <StyledButton>
          <button onClick={addList}>+ Add another list</button>
        </StyledButton>
      </Flexbox>
    </StyledTables>
  );
};

export default Board;
