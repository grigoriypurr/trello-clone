import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v1 as uuidv1 } from 'uuid';
import { deleteList } from './commonActions';

export interface CardsType {
  isEditMode: boolean;
  id: string;
  cardsName: string;
  description: string;
  listId: string;
}

export const cardsSlice = createSlice({
  name: 'cards',
  initialState: [] as CardsType[],
  reducers: {
    addCard: {
      reducer: (state, action: PayloadAction<CardsType>) => {
        state.push(action.payload);
      },
      prepare: (listId: string) => {
        const id = uuidv1();
        return {
          payload: {
            id,
            cardsName: '',
            description: '',
            listId: listId,
            isEditMode: true,
          },
        };
      },
    },
    deleteCard: (
      state,
      action: PayloadAction<{ listId: string; cardId: string }>
    ) => {
      const newCards = state.filter((card) => {
        return card.id !== action.payload.cardId;
      });
      return newCards;
    },
    updateCardName: (
      state,
      action: PayloadAction<{ cardId: string; value: string }>
    ) => {
      const updatedCards = state.map((item) => {
        if (item.id === action.payload.cardId) {
          return {
            ...item,
            cardsName: action.payload.value,
            isEditMode: false,
          };
        } else {
          return item;
        }
      });
      return updatedCards;
    },
    updateDescriptionInCard: (
      state,
      action: PayloadAction<{ cardId: string; value: string }>
    ) => {
      const newCards = state.map((card) => {
        if (card.id === action.payload.cardId) {
          return { ...card, description: action.payload.value };
        } else {
          return card;
        }
      });
      return newCards;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(deleteList, (state, action: PayloadAction<string>) => {
      const newCards = state.filter((card) => card.listId !== action.payload);
      return newCards;
    });
  },
});

export const {
  addCard,
  deleteCard,
  updateCardName,
  updateDescriptionInCard,
} = cardsSlice.actions;

export default cardsSlice.reducer;
