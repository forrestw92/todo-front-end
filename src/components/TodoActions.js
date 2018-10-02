import React, { Component } from "react";
import PropTypes from "prop-types";
import CompleteICONGreen from "../icons/check.svg";
import CompleteICONBlue from "../icons/check-blue.svg";
import DeleteICON from "../icons/delete.svg";
import RemoveDeleteICON from "../icons/corner-up-left.svg";
export default class TodoActions extends Component {
  render() {
    return (
      <div className="todoActions">
        <button
          className="button"
          id={"done"}
          onClick={() =>
            this.props.handleTodoComplete(this.props.id, this.props.isDone)
          }
          style={{
              background:`url(${this.props.isDeleted ? CompleteICONBlue : CompleteICONGreen}) no-repeat center`
          }}
        >
          Complete Todo
        </button>
        <button
          id="delete"
          className="button"
          onClick={() =>
            this.props.handleTodoDelete(this.props.id, !this.props.isDeleted)
          }
          style={{
              background:`url(${this.props.isDeleted ? RemoveDeleteICON : DeleteICON}) no-repeat center`
          }}
        >
            Delete Todo
        </button>
      </div>
    );
  }
}
TodoActions.propTypes = {
  isDeleted: PropTypes.bool.isRequired,
  handleTodoDelete: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  isDone: PropTypes.bool.isRequired
};
