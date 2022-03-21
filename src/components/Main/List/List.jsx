import React from "react";
import { Delete, MoneyOff } from "@material-ui/icons";
import { Slide } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { expenseActions } from "../../../store/expense-Redux";
import classes from "./List.module.css";

const List = () => {
  const transactions = useSelector((state) => state.expense.transactions);

  const dispatch = useDispatch();

  return (
    <div className={classes.list}>
      {transactions.map((item) => (
        <Slide direction="down" in mountOnEnter unmountOnExit key={item.id}>
          <div className={classes.listItem}>
            <div className={classes.left}>
              <div
                className={
                  item.type === "Income" ? classes.income : classes.expense
                }
              >
                <MoneyOff />
              </div>

              <div>
                <h5>{item.category}</h5>
                <p>{`$${item.amount} - ${item.date}`}</p>
              </div>
            </div>

            <div
              className={classes.delete}
              onClick={() => {
                dispatch(expenseActions.deleteTransaction(item.id));
              }}
            >
              <Delete />
            </div>
          </div>
        </Slide>
      ))}
    </div>
  );
};

export default List;
