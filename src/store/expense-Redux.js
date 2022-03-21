import { configureStore } from "@reduxjs/toolkit";
import ExpenseSlice from "./expense-Slice";

const store = configureStore({
  reducer: { expense: ExpenseSlice.reducer },
});

export const expenseActions = ExpenseSlice.actions;

export default store;
