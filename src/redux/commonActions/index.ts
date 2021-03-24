import { createAction } from '@reduxjs/toolkit';

export const deleteList = createAction<string>('lists/deleteList');
