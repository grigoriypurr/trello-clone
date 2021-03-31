import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v1 as uuidv1 } from 'uuid';
import { deleteList } from './commonActions';
import { RootState } from './store';

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
      action: PayloadAction<{ listId: string; cardId: string; }>
    ) => {
      return state.filter((card) => card.id !== action.payload.cardId);
    },
    updateCardName: (
      state,
      action: PayloadAction<{ cardId: string; value: string; }>
    ) => {
      const card = state.find((item) => item.id === action.payload.cardId);
      if (card) {
        card.cardsName = action.payload.value;
        card.isEditMode = false;
      }
    },
    updateDescriptionInCard: (
      state,
      action: PayloadAction<{ cardId: string; value: string; }>
    ) => {
      const card = state.find((card) => card.id === action.payload.cardId);
      if (card) {
        card.description = action.payload.value;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(deleteList, (state, action: PayloadAction<string>) => {
      return state.filter((card) => card.listId !== action.payload);
    });
  },
});
export const selectCardsByListId = (ListId: string) => {
  return (state: RootState) =>
    state.cards.filter((card) => card.listId === ListId);
};

export const {
  addCard,
  deleteCard,
  updateCardName,
  updateDescriptionInCard,
} = cardsSlice.actions;

export default cardsSlice.reducer;
