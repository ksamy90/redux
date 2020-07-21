import { createStore, combineReducers } from "redux";
import uuid from "uuid";

// ADD_EXPENSE
var addExpense = (payload = {}) => {
  return {
    type: "ADD_EXPENSE",
    expense: {
      id: uuid(),
      description: payload.description ? payload.description : "",
      note: payload.note ? payload.note : "",
      amount: payload.amount ? payload.amount : 0,
      createdAt: payload.createdAt ? payload.createdAt : 0,
    },
  };
};

// expenses reducer
var expensesReducerDefaultState = [];
var expensesReducer = (state = expensesReducerDefaultState, action) => {
  switch (action.type) {
    case "ADD_EXPENSE":
      return state.concat(action.expense);
    default:
      return state;
  }
};

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

store.dispatch(addExpense({ description: "Electric Bills", amount: 200 }));
