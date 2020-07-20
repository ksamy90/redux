import { createStore } from "redux";

var store = createStore((state = { count: 0 }, action) => {
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
});

store.subscribe(() => {
  console.log(store.getState());
});

// Action creator
// const incrementCount = (payload = {}) => {
//   var incrementBy =
//     typeof payload.incrementBy === "number" ? payload.incrementBy : 1;
//   return { type: "INCREMENT", incrementBy };
// };

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
store.dispatch(incrementCount()); // 13
store.dispatch(incrementCount()); // 14
store.dispatch(resetCount()); // 0
store.dispatch(decrementCount()); // -8
store.dispatch(decrementCount()); // -9

store.dispatch(setCount({ count: 145 })); // 145
