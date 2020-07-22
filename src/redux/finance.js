import { createStore, combineReducers } from "redux";
import uuid from "uuid";

// expenses action creators
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

// filters action creators
var setTextFilter = (text = "") => {
  return {
    type: "SET_TEXT_FILTER",
    text,
  };
};

var sortByAmount = () => {
  return {
    type: "SORT_BY_AMOUNT",
  };
};
var sortByDate = () => {
  return {
    type: "SORT_BY_DATE",
  };
};

var setStartDate = (startDate) => {
  return {
    type: "SET_START_DATE",
    startDate,
  };
};
var setEndDate = (endDate) => {
  return {
    type: "SET_END_DATE",
    endDate,
  };
};

// expenses reducer
var expensesReducerDefaultState = [];
var expensesReducer = (state = expensesReducerDefaultState, action) => {
  switch (action.type) {
    case "ADD_EXPENSE":
      return state.concat(action.expense); // [...state, action.expense]
    case "REMOVE_EXPENSE":
      return state.filter((expense) => expense.id !== action.id);
    case "EDIT_EXPENSE":
      return state.map((expense) => {
        if (expense.id === action.id) {
          return Object.assign({}, expense, action.updates); // object spread {...expense, ...action.updates}
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
    case "SET_TEXT_FILTER":
      return Object.assign({}, state, { text: action.text });
    case "SORT_BY_AMOUNT":
      return Object.assign({}, state, { sortBy: "amount" });
    case "SORT_BY_DATE":
      return Object.assign({}, state, { sortBy: "date" });
    case "SET_START_DATE":
      return Object.assign({}, state, { startDate: action.startDate });
    case "SET_END_DATE":
      return Object.assign({}, state, { endDate: action.endDate });
    default:
      return state;
  }
};

// you guys are REDUX NINJAS(TRAINEE ninjas)

// selectors(querying the redux state)
var visibleExpenses = (expenses, filters) => {
  return expenses.filter((expense) => {
    var startDateMatch =
      typeof filters.startDate !== "number" ||
      expense.createdAt >= filters.startDate;
    var endDateMatch =
      typeof filters.endDate !== "number" ||
      expense.createdAt <= filters.endDate;
    var textMatch = expense.description
      .toLowerCase()
      .includes(filters.text.toLowerCase());
    return textMatch && startDateMatch && endDateMatch;
  });
};

var store = createStore(
  combineReducers({
    expenses: expensesReducer,
    filters: filtersReducer,
  })
);

store.subscribe(() => {
  var state = store.getState();
  var showExpenses = visibleExpenses(state.expenses, state.filters);
  console.log(showExpenses);
});

var expenseOne = store.dispatch(
  addExpense({ description: "Electric Bills", amount: 200, createdAt: 4500 })
);
var expenseTwo = store.dispatch(
  addExpense({ description: "Reducer in hooks", amount: 500 })
);

// store.dispatch(removeExpense({ id: expenseOne.expense.id }));

store.dispatch(
  editExpense(expenseTwo.expense.id, {
    description: "trip to Manchester,UK",
    amount: 1000,
    createdAt: 6700,
  })
);

// store.dispatch(setTextFilter("el"));

store.dispatch(setStartDate(6000));

// london, barcelona (elo) --> barcelona
