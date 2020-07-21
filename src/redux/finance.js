import { createStore, combineReducers } from "redux";
import uuid from "uuid";

// ADD_EXPENSE
// var addExpense = (payload = {}) => {
//   return {
//     type: "ADD_EXPENSE",
//     expense: {
//       id: uuid(),
//       description: payload.description ? payload.description : "",
//       note: payload.note ? payload.note : "",
//       amount: payload.amount ? payload.amount : 0,
//       createdAt: payload.createdAt ? payload.createdAt : 0,
//     },
//   };
// };
var addExpense = ({
  description = "",
  note = "",
  amount = 0,
  createdAt = 0,
} = {}) => {
  return {
    type: "ADD_EXPENSE",
    expense: {
      id: uuid(),
      description: description,
      note: note,
      amount: amount,
      createdAt: createdAt,
    },
  };
};

// REMOVE_EXPENSE
// const removeExpense = (payload = {}) => {
//   return {
//     type: "REMOVE_EXPENSE",
//     id: payload.id,
//   };
// };

const removeExpense = ({ id } = {}) => {
  return {
    type: "REMOVE_EXPENSE",
    id,
  };
};

const editExpense = (id, updates) => {
  return {
    type: "EDIT_EXPENSE",
    id,
    updates,
  };
};

// expenses reducer
var expensesReducerDefaultState = [];
var expensesReducer = (state = expensesReducerDefaultState, action) => {
  switch (action.type) {
    case "ADD_EXPENSE":
      return [...state, action.expense];
    case "REMOVE_EXPENSE":
      return state.filter((expense) => expense.id !== action.id);
    case "EDIT_EXPENSE":
      return state.map((expense) => {
        if (expense.id === action.id) {
          return {
            ...expense,
            ...action.updates,
          };
        } else {
          return expense;
        }
      });
    default:
      return state;
  }
};

// [].concat('joseph') --- ['joseph'] // [].concat({ description: "Electric Bills", amount: 200 })

// filters reducer
var filtersReducerDefaultState = {
  text: "",
  sortBy: "date",
  startDate: undefined,
  endDate: undefined,
};
var filtersReducer = (state = filtersReducerDefaultState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

var store = createStore(
  combineReducers({
    expenses: expensesReducer,
    filters: filtersReducer,
  })
);

store.subscribe(() => {
  console.log(store.getState());
});

var expenseOne = store.dispatch(
  addExpense({ description: "Electric Bills", amount: 200 })
);
var expenseTwo = store.dispatch(
  addExpense({ description: "Reducer in hooks", amount: 500 })
);

store.dispatch(removeExpense({ id: expenseOne.expense.id }));

store.dispatch(
  editExpense(expenseTwo.expense.id, {
    description: "trip to Manchester,UK",
    amount: 1000,
  })
);
