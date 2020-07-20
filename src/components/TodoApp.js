import React from "react";
import AddOption from "./AddOption";
import Action from "./Action";
import Header from "./Header";
import Options from "./Options";
import Modal from "./Modal";

class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
    this.handlePick = this.handlePick.bind(this);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.deleteOption = this.deleteOption.bind(this);
    this.clearOption = this.clearOption.bind(this);
    this.state = {
      options: [],
      selectedOption: undefined,
    };
  }
  handleDeleteOptions() {
    this.setState(() => {
      return {
        options: [],
      };
    });
  }
  clearOption() {
    this.setState(() => {
      return {
        selectedOption: undefined,
      };
    });
  }
  deleteOption(dataToRemove) {
    this.setState((prevState) => {
      return {
        options: prevState.options.filter((option) => dataToRemove !== option),
      };
    });
  }
  handlePick() {
    var randomTodo = Math.floor(Math.random() * this.state.options.length);
    var option = this.state.options[randomTodo];
    this.setState(() => {
      return {
        selectedOption: option,
      };
    });
  }
  handleAddOption(option) {
    if (!option) {
      return "Enter valid value to add item";
    } else if (this.state.options.indexOf(option) > -1) {
      return "That option exists";
    }

    this.setState((prevState) => {
      return {
        options: prevState.options.concat(option),
      };
    });
  }

  componentDidMount() {
    try {
      var optionsData = localStorage.getItem("options");
      var options = JSON.parse(optionsData);

      if (options) {
        this.setState(() => {
          return {
            options: options,
          };
        });
      }
    } catch (e) {}
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.options.length !== this.state.options.length) {
      var json = JSON.stringify(this.state.options);
      localStorage.setItem("options", json);
    }
  }
  componentWillUnmount() {
    console.log("removing component");
  }

  render() {
    var title = "Todo tasks";
    var subtitle = "Focusing everyday";
    return (
      <div>
        <Header title={title} subtitle={subtitle} />
        <div className="container">
          <Action
            hasOptions={this.state.options.length > 0}
            handleTodo={this.handlePick}
          />
          <div className="widget">
            <Options
              options={this.state.options}
              deleteOptions={this.handleDeleteOptions}
              deleteOption={this.deleteOption}
            />
            <AddOption handleOption={this.handleAddOption} />
          </div>
        </div>
        <Modal
          selectOption={this.state.selectedOption}
          clearOption={this.clearOption}
        />
      </div>
    );
  }
}

export default TodoApp;
