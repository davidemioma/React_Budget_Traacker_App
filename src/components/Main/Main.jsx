import React from "react";
import { Divider } from "@material-ui/core";
import Form from "./Form/Form";
import List from "./List/List";
import { useSelector } from "react-redux";
import InfoCard from "./InfoCard";
import classes from "./Main.module.css";

const Main = () => {
  const transactions = useSelector((state) => state.expense.transactions);

  const totalBalance = transactions.reduce(
    (acc, currVal) =>
      currVal.type === "Income" ? acc + currVal.amount : acc - currVal.amount,
    0
  );

  return (
    <div className={classes.main}>
      <div className={classes.header}>
        <h3>Expense Tracker</h3>

        <p>Powered by Speechly</p>
      </div>

      <h3 className={classes.balance}>Total Balance ${totalBalance}</h3>

      <InfoCard />

      <Divider />

      <Form />

      <List />
    </div>
  );
};

export default Main;
