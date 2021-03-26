import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v1 as uuidv1 } from 'uuid';
import { deleteList } from './commonActions';
import { deleteCard } from './cardsSlice';
import { RootState } from './store';

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
      state.push({
        id: uuidv1(),
        description: action.payload.commentValue,
        cardId: action.payload.cardId,
        listId: action.payload.listId,
      });
    },
    deleteComment: (state, action: PayloadAction<string>) => {
      return state.filter((item) => {
        return item.id !== action.payload;
      });
    },
    updateComment: (
      state,
      action: PayloadAction<{ commentId: string; value: string }>
    ) => {
      return state.map((item) => {
        if (item.id === action.payload.commentId) {
          return { ...item, description: action.payload.value };
        } else {
          return item;
        }
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(deleteList, (state, action: PayloadAction<string>) => {
      return state.filter((item) => {
        return item.listId !== action.payload;
      });
    });
    builder.addCase(
      deleteCard,
      (state, action: PayloadAction<{ listId: string; cardId: string }>) => {
        return state.filter((item) => {
          return item.cardId !== action.payload.cardId;
        });
      }
    );
  },
});

export const selectComments = (id: string) => {
  return (state: RootState) =>
    state.persistedReducer.comments.filter((comment) => comment.cardId === id);
};

export const {
  addComment,
  deleteComment,
  updateComment,
} = commentsSlice.actions;

export default commentsSlice.reducer;
