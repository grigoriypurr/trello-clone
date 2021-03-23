import List from '../List';
import { StyledTables, Flexbox, StyledButton } from './styled';
import { v1 as uuidv1 } from 'uuid';
import { useStateWithLocalStorage } from '../../hooks';
import { useSelector, useDispatch } from 'react-redux';
import { addList } from '../../redux/listsSlice';
import { useState } from 'react';
import { RootState } from '../../redux/store';

const initialLists = [
  {
    id: uuidv1(),
    listName: 'TODO',
    isEditMode: false,
    cardsIds: [],
  },
  {
    id: uuidv1(),
    listName: 'In Progress',
    isEditMode: false,
    cardsIds: [],
  },
  {
    id: uuidv1(),
    listName: 'Testing',
    isEditMode: false,
    cardsIds: [],
  },
  {
    id: uuidv1(),
    listName: 'Done',
    isEditMode: false,
    cardsIds: [],
  },
];

interface PropsType {
  userName: string;
}

interface ListType {
  isEditMode: boolean;
  id: string;
  listName: string;
  cardsIds: string[];
}
export interface CommentsType {
  id: string;
  description: string;
  cardId: string;
}
export interface CardsType {
  isEditMode: boolean;
  id: string;
  cardsName: string;
  description: string;
  listId: string;
}

const Board = (props: PropsType) => {
  const listState = useSelector((state: RootState) => state.lists);
  const dispatch = useDispatch();

  const [lists, setLists] = useState(listState);
  const [comments, setComments] = useStateWithLocalStorage([], 'Comments');
  const [cards, setCards] = useStateWithLocalStorage([], 'Cards');
  // comments
  const updateCommentInState = (id: string, value: string) => {
    const updatedComments = comments.map((item: CommentsType) => {
      if (item.id === id) {
        return { ...item, description: value };
      } else {
        return item;
      }
    });
    setComments(updatedComments);
  };
  const addComment = (commentValue: string, cardId: string) => {
    if (!commentValue) return;
    const newComments = [
      ...comments,
      { id: uuidv1(), description: commentValue, cardId },
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
  // const updateListNameInState = (listId: string, value: string) => {
  //   const updatedLists = lists.map((item: ListType) => {
  //     if (item.id === listId) {
  //       return { ...item, listName: value, isEditMode: false };
  //     } else {
  //       return item;
  //     }
  //   });
  //   //@ts-ignore
  //   setLists(updatedLists);
  // };
  // const addList = () => {
  //   const newLists = [
  //     ...lists,
  //     { id: uuidv1(), listName: '', isEditMode: true, cardsIds: [] },
  //   ];
  //   setLists(newLists as ListType[]);
  // };
  // const deleteList = (id: string) => {
  //   const deletedList = lists.filter((item) => item.id === id);
  //   const newComments = comments.filter(
  //     //@ts-ignore
  //     (comment) => !deletedList[0].cardsIds.includes(comment.cardId)
  //   );
  //   setComments(newComments);
  //   const newList = lists.filter((item: ListType) => {
  //     return item.id !== id;
  //   });
  //   setLists(newList);
  //   const newCards = cards.filter((card: CardsType) => card.listId !== id);
  //   setCards(newCards);
  // };

  //cards
  const updateCardsIdsInList = (listId: string, cardsIds: string) => {
    const newLists = lists.map((list) => {
      if (list.id === listId) {
        return { ...list, cardsIds: [...list.cardsIds, cardsIds] };
      } else {
        return list;
      }
    });
    //@ts-ignore
    setLists(newLists);
  };
  const updateDescriptionInCards = (cardId: string, value: string) => {
    const newCards = cards.map((card: CardsType) => {
      if (card.id === cardId) {
        return { ...card, description: value };
      } else {
        return card;
      }
    });
    setCards(newCards);
  };
  const addCard = (listId: string) => {
    const addedCard = {
      id: uuidv1(),
      cardsName: '',
      description: '',
      listId,
      isEditMode: true,
    };
    const newCards = [...cards, addedCard];
    setCards(newCards as CardsType[]);
    updateCardsIdsInList(listId, addedCard.id);
  };
  const deleteCard = (listId: string, cardId: string) => {
    const newCards = cards.filter((item: CardsType) => {
      return item.id !== cardId;
    });
    setCards(newCards);
    const newComments = comments.filter(
      (comment: CommentsType) => comment.cardId !== cardId
    );
    setComments(newComments);
    const newLists = lists.map((list) => {
      if (list.id === listId) {
        return {
          ...list,
          cardsIds: [...list.cardsIds.filter((id) => id !== cardId)],
        };
      } else {
        return list;
      }
    });
    setLists(newLists);
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
        {listState.map((item: ListType) => (
          <List
            key={item.id}
            editMode={item.isEditMode}
            listName={item.listName}
            id={item.id}
            cards={cards}
            comments={comments}
            userName={props.userName}
            addComment={addComment}
            deleteComment={deleteComment}
            addCard={addCard}
            deleteCard={deleteCard}
            // updateListNameInState={updateListNameInState}
            updateCardNameInState={updateCardNameInState}
            updateDescriptionInCards={updateDescriptionInCards}
            updateCommentInState={updateCommentInState}
          />
        ))}
        <StyledButton>
          <button
            onClick={() => {
              dispatch(addList());
              console.log(listState);
            }}
          >
            + Add another list
          </button>
        </StyledButton>
      </Flexbox>
    </StyledTables>
  );
};

export default Board;
