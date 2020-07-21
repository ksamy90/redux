import { createStore } from "redux";

var countReducer = (state = { count: 0 }, action) => {
  switch (action.type) {
    case "INCREMENT":
      return {
        count: state.count + action.incrementBy,
      };
    case "DECREMENT":
      return {
        count: state.count - action.decrementBy,
      };
    case "RESET":
      return {
        count: 0,
      };
    case "SET":
      return {
        count: action.count,
      };
    default:
      return state;
  }
};

var store = createStore(countReducer);

store.subscribe(() => {
  console.log(store.getState());
});

// Action creator

const incrementCount = ({ incrementBy = 1 } = {}) => {
  return {
    type: "INCREMENT",
    incrementBy,
  };
};

// const decrementCount = (payload = {}) => {
//   var decrementBy =
//     typeof payload.decrementBy === "number" ? payload.decrementBy : 1;
//   return { type: "DECREMENT", decrementBy };
// };

const decrementCount = ({ decrementBy = 1 } = {}) => {
  return {
    type: "DECREMENT",
    decrementBy,
  };
};

const resetCount = () => {
  return { type: "RESET" };
};

// const setCount = (payload) => ({
//   type: "SET",
//   count: payload.count,
// });

const setCount = ({ count }) => {
  return {
    type: "SET",
    count,
  };
};

// ACTION ('objects in redux')
store.dispatch(incrementCount({ incrementBy: 11 })); // 11
store.dispatch(incrementCount()); // 14
store.dispatch(incrementCount()); // 15
store.dispatch(incrementCount()); // 16
store.dispatch(resetCount()); // 0
store.dispatch(decrementCount()); // -1
store.dispatch(decrementCount()); // -2
store.dispatch(decrementCount({ decrementBy: 13 })); // -15

store.dispatch(setCount({ count: 145 })); // 145
