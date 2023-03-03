import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TodosState {
  todoList: TodoItem[];
}

export interface TodoItem {
  title: string,
  expires?: number,
}

const initialState: TodosState = {
  todoList: [],
}

const slice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo(state, action: PayloadAction<TodoItem>) {
      state.todoList.push(action.payload);
    },
  }
});

export default slice.reducer; 