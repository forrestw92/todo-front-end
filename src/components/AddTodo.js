import React, { Component } from "react";
import PropTypes from "prop-types";
import AddIcon from "../icons/plus.svg";

export default class AddTodo extends Component {
  render() {
    return (
      <div className="todoForm">
        <input
          type={"text"}
          id={"todo-name"}
          placeholder={"Todo Name"}
          value={this.props.query}
          onChange={this.props.handleInputChange}
        />

        <button
          id="addIcon"
          className="button"
          style={{
            background: `url(${AddIcon}) no-repeat center`
          }}
        >
          Add Todo
        </button>
      </div>
    );
  }
}
AddTodo.propTypes = {
  query: PropTypes.string,
  handleInputChange: PropTypes.func.isRequired,
  addTodo: PropTypes.func.isRequired
};
