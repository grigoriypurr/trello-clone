import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v1 as uuidv1 } from 'uuid';

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
    addCard: (state, action: PayloadAction<string>) => {
      const addedCard = {
        id: uuidv1(),
        cardsName: '',
        description: '',
        listId: action.payload,
        isEditMode: true,
      };
      const newCards = [...state, addedCard];
      return newCards;
      //  updateCardsIdsInList(listId, addedCard.id);
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
  // extraReducers:(builder)=>{
  //   builder.addCase()

  // }
});

export const {
  addCard,
  deleteCard,
  updateCardName,
  updateDescriptionInCard,
} = cardsSlice.actions;

export default cardsSlice.reducer;
