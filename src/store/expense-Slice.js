import { createSlice } from "@reduxjs/toolkit";

const transactions = JSON.parse(localStorage.getItem("transactions")) || [];

const ExpenseSlice = createSlice({
  name: "Expense",
  initialState: {
    transactions: transactions,
  },
  reducers: {
    addTransaction(state, { payload }) {
      const newExpense = payload;

      const existingExpense = state.transactions.find(
        (transaction) => transaction.id === newExpense.id
      );

      if (!existingExpense) {
        state.transactions.unshift(newExpense);
      }

      localStorage.setItem("transactions", JSON.stringify(state.transactions));
    },

    deleteTransaction(state, { payload }) {
      const id = payload;

      const existingExpense = state.transactions.find(
        (transaction) => transaction.id === id
      );

      if (existingExpense) {
        state.transactions = state.transactions.filter(
          (transaction) => transaction.id !== id
        );
      }

      localStorage.setItem("transactions", JSON.stringify(state.transactions));
    },
  },
});

export default ExpenseSlice;
