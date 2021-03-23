import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v1 as uuidv1 } from 'uuid';
import { deleteList } from './listsSlice';
import { deleteCard } from './cardsSlice';

export interface CommentsType {
  id: string;
  description: string;
  cardId: string;
  listId: string;
}

export const commentsSlice = createSlice({
  name: 'comments',
  initialState: [] as CommentsType[],
  reducers: {
    addComment: (
      state,
      action: PayloadAction<{
        cardId: string;
        listId: string;
        commentValue: string;
      }>
    ) => {
      if (!action.payload.commentValue) return;
      const newComments = [
        ...state,
        {
          id: uuidv1(),
          description: action.payload.commentValue,
          cardId: action.payload.cardId,
          listId: action.payload.listId,
        },
      ];
      return newComments;
    },
    deleteComment: (state, action: PayloadAction<string>) => {
      const newComments = state.filter((item) => {
        return item.id !== action.payload;
      });
      return newComments;
    },
    updateComment: (
      state,
      action: PayloadAction<{ commentId: string; value: string }>
    ) => {
      const updatedComments = state.map((item) => {
        if (item.id === action.payload.commentId) {
          return { ...item, description: action.payload.value };
        } else {
          return item;
        }
      });
      return updatedComments;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(deleteList, (state, action: PayloadAction<string>) => {
      const newComments = state.filter((item) => {
        return item.id !== action.payload;
      });
      return newComments;
    });
    builder.addCase(
      deleteCard,
      (state, action: PayloadAction<{ listId: string; cardId: string }>) => {
        const newComments = state.filter((item) => {
          return item.id !== action.payload.cardId;
        });
        return newComments;
      }
    );
  },
});

export const {
  addComment,
  deleteComment,
  updateComment,
} = commentsSlice.actions;

export default commentsSlice.reducer;
