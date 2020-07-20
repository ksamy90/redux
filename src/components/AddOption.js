import React from "react";

class AddOption extends React.Component {
  constructor(props) {
    super(props);
    this.addOption = this.addOption.bind(this);
    this.state = {
      error: undefined,
    };
  }
  addOption(evt) {
    evt.preventDefault();
    var option = evt.target.elements.option.value.trim();
    var errorData = this.props.handleOption(option);

    this.setState(() => {
      return { error: errorData };
    });

    evt.target.elements.option.value = "";
  }
  render() {
    return (
      <div>
        {this.state.error && <p className="error-option">{this.state.error}</p>}
        <form className="add-option" onSubmit={this.addOption}>
          <input
            className="add-option__input"
            type="text"
            name="option"
            autoComplete="off"
          />
          <button className="button">add option</button>
        </form>
      </div>
    );
  }
}

export default AddOption;
