import React from "react";

const isIncome = Math.round(Math.random());

const InfoCard = () => {
  return (
    <div
      style={{ textAlign: "center", padding: "0 10%", marginBottom: "1rem" }}
    >
      Try Saying : <br />
      Add {isIncome ? "Income" : "Expense"} for {isIncome ? "$100" : "$50"} in
      category {isIncome ? "Salary" : "Travel"} for{" "}
      {isIncome ? "Monday " : "Thursday "}
    </div>
  );
};

export default InfoCard;
