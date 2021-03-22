import List from '../List/List';
import { StyledTables, Flexbox, StyledButton } from './styled';
import { v1 as uuidv1 } from 'uuid';
import { useStateWithLocalStorage } from '../../hooks';


const initialLists = [
  {
    id: uuidv1(),
    listName: 'TODO',
    isEditMode: false,
    cardsIds: []
  },
  {
    id: uuidv1(),
    listName: 'In Progress',
    isEditMode: false,
    cardsIds:[]
  },
  {
    id: uuidv1(),
    listName: 'Testing',
    isEditMode: false,
    cardsIds:[]
  },
  {
    id: uuidv1(),
    listName: 'Done',
    isEditMode: false,
    cardsIds:[]
  },
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
export interface CommentsType {
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

// comments
  const updateCommentInState = (id: string, value: string) => {
    const updatedComments = comments.map((item: CommentsType) => {
      if (item.id === id) {
        return {...item, description: value };
      } else {
        return item;
      }
    });
    setComments(updatedComments);
  };
  const addComment = (commentValue:string, cardId:string) => {
    if (!commentValue) return;
    const newComments = [
      ...comments,
      { id: uuidv1(),description: commentValue, cardId },
    ];
    setComments(newComments as CommentsType[]);
  };
  const deleteComment = (id: string) => {
    const newComments = comments.filter((item: CommentsType) => {
      return item.id !== id;
    });
    setComments(newComments);
  };
//lists
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

    const deletedList=lists.filter((item:ListType)=>item.id===id)
    const newComments=comments.filter((comment: CommentsType)=>!deletedList[0].cardsIds.includes(comment.cardId))
    setComments(newComments)
    const newList = lists.filter((item: ListType) => {
      return item.id !== id;
    });
    setLists(newList);
    const newCards=cards.filter((card:CardsType)=>card.listId !== id)
    setCards(newCards)
  };
  //cards
  const updateCardsIdsInList = (listId: string, cardsIds: string) => {
    const newLists = lists.map((list: ListType) => {
      if (list.id === listId) {
        return { ...list, cardsIds: [...list.cardsIds,cardsIds] }
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
    const addedCard = { id: uuidv1(), cardsName: '', description: '', listId, isEditMode: true }
    const newCards = [
      ...cards,
      addedCard
    ];
    setCards(newCards as CardsType[]);
    updateCardsIdsInList(listId,addedCard.id)
  };
  const deleteCard = (listId:string,cardId: string) => {
    const newCards = cards.filter((item: CardsType) => {
      return item.id !== cardId;
    });
    setCards(newCards);
    const newComments=comments.filter((comment:CommentsType)=>comment.cardId !== cardId)
    setComments(newComments)
    const newLists = lists.map((list: ListType) => {
      if (list.id === listId) {
        return { ...list, cardsIds: [...list.cardsIds.filter(id=>id!==cardId)] }
      } else {
        return list
      }
    })
    setLists(newLists)
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
            addComment={addComment}
            deleteComment={deleteComment}
            updateCommentInState={updateCommentInState}
            comments={comments}
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
