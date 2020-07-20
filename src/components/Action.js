import React from "react";

const Action = (props) => {
  return (
    <div>
      <button
        className="big-button"
        onClick={props.handleTodo}
        disabled={!props.hasOptions}
      >
        What to do
      </button>
    </div>
  );
};

export default Action;
