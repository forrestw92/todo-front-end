import React, { Component } from "react";
import PropTypes from "prop-types";
import Todo from "./Todo";

export default class List extends Component {
  render() {
    return (
      <ol className="todoList">
        {this.props.todos &&
          this.props.todos.map(todo => (
            <Todo
              key={todo.id}
              {...todo}
              handleTodoDelete={this.props.handleTodoDelete}
              handleTodoComplete={this.props.handleTodoComplete}
            />
          ))}
      </ol>
    );
  }
}
List.propTypes = {
  todos: PropTypes.array.isRequired,
  handleTodoDelete: PropTypes.func.isRequired,
  handleTodoComplete: PropTypes.func.isRequired
};
