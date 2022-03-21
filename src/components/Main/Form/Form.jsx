import React, { useEffect, useState } from "react";
import { Select, MenuItem, InputLabel, TextField } from "@material-ui/core";
import {
  incomeCategories,
  expenseCategories,
} from "../../../constants/categories";
import { formatDate } from "../../../utils/formatDate";
import { useDispatch } from "react-redux";
import { expenseActions } from "../../../store/expense-Redux";
import { v4 as uuidv4 } from "uuid";
import { useSpeechContext } from "@speechly/react-client";
import SnackBar from "../../SnackBar/SnackBar";
import classes from "./Form.module.css";

const initialState = {
  amount: "",
  category: "",
  type: "Income",
  date: formatDate(new Date()),
};

const Form = () => {
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  const [formData, setFormData] = useState(initialState);

  const seletedCategory =
    formData.type === "Income" ? incomeCategories : expenseCategories;

  const { segment } = useSpeechContext();

  const createTransaction = () => {
    if (
      !formData.type ||
      !formData.category ||
      Number.isNaN(Number(formData.amount)) ||
      !formData.date.includes("-")
    )
      return;

    setOpen(true);

    dispatch(
      expenseActions.addTransaction({
        ...formData,
        amount: Number(formData.amount),
        id: uuidv4(),
      })
    );

    setFormData(initialState);
  };

  useEffect(() => {
    if (segment) {
      if (segment.intent.intent === "add_income") {
        setFormData({ ...formData, type: "Income" });
      } else if (segment.intent.intent === "add_expense") {
        setFormData({ ...formData, type: "Expense" });
      } else if (
        segment.isFinal &&
        segment.intent.intent === "create_transaction"
      ) {
        return createTransaction();
      } else if (
        segment.isFinal &&
        segment.intent.intent === "cancel_transaction"
      ) {
        return setFormData(initialState);
      }

      segment.entities.map((e) => {
        const category = `${e.value.charAt(0)}${e.value
          .slice(1)
          .toLowerCase()}`;

        switch (e.type) {
          case "amount":
            setFormData({ ...formData, amount: e.value });
            break;

          case "category":
            if (incomeCategories.map((ic) => ic.type).includes(category)) {
              setFormData({ ...formData, type: "Income", category });
            } else if (
              expenseCategories.map((ec) => ec.type).includes(category)
            ) {
              setFormData({ ...formData, type: "Expense", category });
            }
            break;

          case "date":
            setFormData({ ...formData, date: e.value });
            break;

          default:
            break;
        }
      });

      if (
        segment.isFinal &&
        formData.type &&
        formData.amount &&
        formData.category &&
        formData.date
      ) {
        createTransaction();
      }
    }
  }, [segment]);

  return (
    <div className={classes.form}>
      <SnackBar open={open} setOpen={setOpen} />

      <div className={classes.speech}>
        {segment && segment.words.map((w) => w.value).join(" ")}
      </div>

      <div className={classes.select}>
        <div>
          <InputLabel>Type</InputLabel>

          <Select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          >
            <MenuItem value="Income">Income</MenuItem>
            <MenuItem value="Expense">Expense</MenuItem>
          </Select>
        </div>

        <div>
          <InputLabel>Category</InputLabel>

          <Select
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          >
            {seletedCategory.map((c) => (
              <MenuItem key={c.type} value={c.type}>
                {c.type}
              </MenuItem>
            ))}
          </Select>
        </div>
      </div>

      <div className={classes.input}>
        <TextField
          value={formData.amount}
          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
          type="number"
          label="Amount"
          fullWidth
        />

        <TextField
          value={formData.date}
          onChange={(e) =>
            setFormData({ ...formData, date: formatDate(e.target.value) })
          }
          type="Date"
          label="date"
          fullWidth
        />
      </div>

      <button type="button" className={classes.btn} onClick={createTransaction}>
        Create
      </button>
    </div>
  );
};

export default Form;
