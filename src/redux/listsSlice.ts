import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v1 as uuidv1 } from 'uuid';
import { addCard, deleteCard } from './cardsSlice';

export const listsSlice = createSlice({
  name: 'lists',
  initialState: [
    {
      id: uuidv1(),
      listName: 'TODO',
      isEditMode: false,
      cardsIds: [] as string[],
    },
    {
      id: uuidv1(),
      listName: 'In Progress',
      isEditMode: false,
      cardsIds: [] as string[],
    },
    {
      id: uuidv1(),
      listName: 'Testing',
      isEditMode: false,
      cardsIds: [] as string[],
    },
    {
      id: uuidv1(),
      listName: 'Done',
      isEditMode: false,
      cardsIds: [] as string[],
    },
  ],
  reducers: {
    addList: (state) => {
      state.push({
        id: uuidv1(),
        listName: '',
        isEditMode: true,
        cardsIds: [],
      });
    },
    deleteList: (state, action: PayloadAction<string>) => {
      const newListArray = state.filter((item) => item.id !== action.payload);
      return newListArray;
    },
    updateListNameInState: (
      state,
      action: PayloadAction<{ listId: string; value: string }>
    ) => {
      const updatedLists = state.map((item) => {
        if (item.id === action.payload.listId) {
          return { ...item, listName: action.payload.value, isEditMode: false };
        } else {
          return item;
        }
      });
      return updatedLists;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addCard, (state, action: PayloadAction<string>) => {
      const newLists = state.map((item) => {
        if (item.id === action.payload) {
          return { ...item, cardsIds: [...item.cardsIds, action.payload] };
        } else return item;
      });
      return newLists;
    });
    builder.addCase(
      deleteCard,
      (state, action: PayloadAction<{ listId: string; cardId: string }>) => {
        const newList = state.map((list) => {
          if (list.id === action.payload.listId) {
            return {
              ...list,
              cardsIds: [
                ...list.cardsIds.filter(
                  (card) => card !== action.payload.cardId
                ),
              ],
            };
          } else return list;
        });
        return newList;
      }
    );
  },
});

export const {
  addList,
  deleteList,
  updateListNameInState,
} = listsSlice.actions;

export default listsSlice.reducer;
