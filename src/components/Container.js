import React, { Component } from "react";
import PropTypes from "prop-types";
import List from "./List";
import AddTodo from "./AddTodo";
import TrashIcon from "../icons/trash-2.svg";
import BackIcon from "../icons/arrow-left.svg";

export default class Container extends Component {
  render() {
    return (
      <div className="todoContainer">
        {this.props.error ? (
          <h1>{this.props.error}</h1>
        ) : (
          <React.Fragment>
            <button
              id="showDeleted"
              className="button"
              onClick={() =>
                this.props.isShowingDelete
                  ? this.props.showRegularList()
                  : this.props.showDeleted()
              }
              style={{
                  background: `url(${this.props.isShowingDelete ? BackIcon : TrashIcon}) no-repeat center`
              }}
            >
                { this.props.isShowingDelete
                    ? "Show All"
                    : "Show Deleted"}
            </button>
            <AddTodo {...this.props} />
            <List {...this.props} />
          </React.Fragment>
        )}
      </div>
    );
  }
}
Container.propTypes = {
  isShowingDelete: PropTypes.bool.isRequired,
  showRegularList: PropTypes.func.isRequired,
  showDeleted: PropTypes.func.isRequired
};
