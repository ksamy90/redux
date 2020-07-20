import React from "react";
import Option from "./Option";

const Options = (props) => {
  return (
    <div>
      <div className="widget-header">
        <h3 className="widget-header__title">Your options</h3>
        <button className="button button--link" onClick={props.deleteOptions}>
          remove all
        </button>
      </div>

      {props.options.length === 0 && (
        <p className="widget__message">Please add an option to start</p>
      )}

      {props.options.map((option, index) => {
        return (
          <Option
            key={option}
            optionText={option}
            count={index + 1}
            deleteItem={props.deleteOption}
          />
        );
      })}
    </div>
  );
};

export default Options;
