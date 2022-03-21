import { useSelector } from "react-redux";
import {
  expenseCategories,
  incomeCategories,
  resetCategories,
} from "./constants/categories";

export const useTransaction = (title) => {
  resetCategories();

  const transactions = useSelector((state) => state.expense.transactions);

  const transactionPerType = transactions.filter((t) => t.type === title);

  const total = transactionPerType.reduce(
    (acc, curVal) => (acc += curVal.amount),
    0
  );

  const categories = title === "Income" ? incomeCategories : expenseCategories;

  transactionPerType.forEach((t) => {
    const category = categories.find((c) => c.type === t.category);

    if (category) category.amount += t.amount;
  });

  const filteredCategories = categories.filter((c) => c.amount > 0);

  const chartData = {
    datasets: [
      {
        data: filteredCategories.map((c) => c.amount),
        backgroundColor: filteredCategories.map((c) => c.color),
      },
    ],
    labels: filteredCategories.map((c) => c.type),
  };

  return { chartData, total };
};
