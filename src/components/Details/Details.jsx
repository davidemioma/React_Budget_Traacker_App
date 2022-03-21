import React from "react";
import { useTransaction } from "../../useTransactions";
import "chart.js/auto";
import { Doughnut } from "react-chartjs-2";
import classes from "./Details.module.css";

const Details = ({ title }) => {
  const { chartData, total } = useTransaction(title);

  return (
    <div className={title === "Income" ? classes.income : classes.expense}>
      <h3>{title}</h3>

      <p>${total}</p>

      <div className={classes.chart}>
        <Doughnut data={chartData} />
      </div>
    </div>
  );
};

export default Details;
