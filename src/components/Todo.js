import React, { Component } from "react";
import PropTypes from "prop-types";
import chevron from "../icons/chevron-down.svg";
import chevronWhite from "../icons/chevron-down-white.svg";
import TodoActions from "./TodoActions";
export default class Todo extends Component {
  state = {
    isDetailsShown: false
  };
  parseDate = date => {
    date = new Date(date);
    return `${date.getDay()}/${date.getMonth()}/${date.getFullYear()} - ${date.getHours() %
      12}:${date.getMinutes()}${date.getHours() >= 12 ? "PM" : "AM"}`;
  };
  handleDetailsClick = () => {
    this.setState({
      isDetailsShown: !this.state.isDetailsShown
    });
  };
  render() {
    return (
      <li
        className="todo"
        tabIndex="0"
        onClick={this.handleDetailsClick}
        aria-label={
          this.props.isDone
            ? "Done"
            : this.props.isDeleted
              ? "Deleted"
              : "Waiting"
        }
      >
        <div
          className={
            this.props.isDone
              ? "todoInfo done"
              : this.props.isDeleted
                ? "todoInfo deleted"
                : "todoInfo"
          }
        >
          <button
            className={
              this.state.isDetailsShown
                ? "button details open"
                : "button details closed"
            }
            onClick={this.handleDetailsClick}
            style={{
              background: `url(${
                this.props.isDone || this.props.isDeleted
                  ? chevronWhite
                  : chevron
              }) no-repeat center`
            }}
          >
            {this.state.isDetailsShown ? "Hide Details" : "Show Details"}
          </button>
          <p className="todoName">{this.props.name}</p>
          <TodoActions {...this.props} />
        </div>
        <div
          className={
            this.state.isDetailsShown ? "todoDetails" : "todoDetails hidden"
          }
        >
          <p>
            {" "}
            <strong>Name: </strong>
            {this.props.name}
          </p>
          <p>
            <strong>Added Date: </strong>
            {this.parseDate(this.props.addedDate)}
          </p>
        </div>
      </li>
    );
  }
}
Todo.propTypes = {
  name: PropTypes.string.isRequired,
  isDone: PropTypes.bool.isRequired,
  isDeleted: PropTypes.bool.isRequired,
  addedDate: PropTypes.number.isRequired
};
