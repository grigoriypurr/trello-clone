import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v1 as uuidv1 } from 'uuid';
import { addCard, deleteCard } from './cardsSlice';
import { deleteList } from './commonActions';
import { CardsType } from './cardsSlice';
import { RootState } from './store';

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
    updateListNameInState: (
      state,
      action: PayloadAction<{ listId: string; value: string; }>
    ) => {
      return state.map((item) => {
        if (item.id === action.payload.listId) {
          return { ...item, listName: action.payload.value, isEditMode: false };
        } else {
          return item;
        }
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addCard, (state, action: PayloadAction<CardsType>) => {
      return state.map((item) => {
        if (item.id === action.payload.listId) {
          return { ...item, cardsIds: [...item.cardsIds, action.payload.id] };
        } else {
          return item;
        }
      });
    });
    builder.addCase(
      deleteCard,
      (state, action: PayloadAction<{ listId: string; cardId: string; }>) => {
        return state.map((list) => {
          if (list.id === action.payload.listId) {
            return {
              ...list,
              cardsIds: [
                ...list.cardsIds.filter((card) => card !== action.payload.cardId),
              ],
            };
          } else {
            return list;
          }
        });
      }
    );
    builder.addCase(deleteList, (state, action: PayloadAction<string>) => {
      return state.filter((item) => item.id !== action.payload);
    });
  },
});

export const selectLists = (state: RootState) => state.persistedReducer.lists;

export const { addList, updateListNameInState } = listsSlice.actions;

export default listsSlice.reducer;
