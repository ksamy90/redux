import { createStore } from "redux";

var store = createStore((state = { count: 0 }, action) => {
  switch (action.type) {
    case "INCREMENT":
      return {
        count: state.count + action.increment,
      };
    case "DECREMENT":
      return {
        count: state.count - action.decrement,
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
const incrementCount = (incrementBy) => {
  var increment = typeof incrementBy === "number" ? incrementBy : 1;
  return { type: "INCREMENT", increment };
};

const decrementCount = (decrementBy) => {
  var decrement = typeof decrementBy === "number" ? decrementBy : 1;
  return { type: "DECREMENT", decrement };
};

const resetCount = () => {
  return { type: "RESET" };
};

const setCount = () => {
  return { type: "SET", count: 145 };
};

// ACTION ('objects in redux')
store.dispatch(incrementCount(11)); // 11
store.dispatch(incrementCount(3)); // 14
store.dispatch(incrementCount()); // 13
store.dispatch(incrementCount()); // 14
store.dispatch(resetCount()); // 0
store.dispatch(decrementCount(8)); // -8
store.dispatch(decrementCount()); // -9

store.dispatch(setCount()); // 145
