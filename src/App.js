import React, { Component } from "react";
import "./App.css";
import Container from "./components/Container";
if (!localStorage.token) {
  localStorage.token = Math.random()
    .toString(36)
    .substr(-8);
}
class App extends Component {
  state = {
    query: "",
    todos: [],
    isShowingDelete: false
  };
  /**
   * Add todo to db and state
   * @param {string} name
   */
  addTodo = name => {
    name = name.trim();
    if (name === "") {
      return false;
    }
    const todo = {
      name,
      token: localStorage.token,
      isDone: false,
      isDeleted: false,
      addedDate: Date.now()
    };
    fetch("http://localhost:3001/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(todo)
    })
      .then(res => res.json)
      .then(res => res.success)
      .then(() => this.setState({ todos: [...this.state.todos, todo] }))
      .catch(() => {
        this.setState({ error: "Error Adding Todo" });
      });
  };
  handleChange = e => {
    this.setState({ query: e.target.value });
  };
  /**
   * Show all deleted todos
   */
  showDeleted = () => {
    fetch(`http://localhost:3001/${localStorage.token}/del`)
      .then(res => res.json())
      .then(res => {
        this.setState({ todos: res.todos, isShowingDelete: true });
      })
      .catch(() => {
        this.setState({ error: "Error Getting Todos" });
      });
  };
  /**
   * Get all done/waiting todos
   */
  showRegularList = () => {
    fetch(`http://localhost:3001/${localStorage.token}`)
      .then(res => res.json())
      .then(res => {
        this.setState({ todos: res.todos, isShowingDelete: false });
      })
      .catch(() => {
        this.setState({ error: "Error Getting Todos" });
      });
  };
  /**
   * Delete todo based on id
   * @param {number} id
   */
  handleTodoDelete = (id,value) => {
    fetch(`http://localhost:3001/del`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, token: localStorage.token, value })
    })
      .then(res => res.json)
      .then(res => res.success)
      .then(() => {
        const todos = this.state.todos.filter(todo => todo.id !== id);
        this.setState({ todos });
      })
      .catch(() => {
        this.setState({ error: "Error Deleting Todo" });
      });
  };

  /**
   * Complete todo
   * @param {number} id
   * @param {boolean} value
   */
  handleTodoComplete = (id, value) => {
    fetch(`http://localhost:3001/done`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id,
        token: localStorage.token,
        value: (value = !value)
      })
    })
      .then(res => res.json)
      .then(res => res.success)
      .then(() => {
        const todo = this.state.todos.find(todo => todo.id === id);
        todo.isDone = value;
        this.setState({ todos: Object.assign(this.state.todos, todo) });
      })
      .catch(() => {
        this.setState({ error: "Error Deleting Todo" });
      });
  };

  componentDidMount() {
    this.showRegularList();
  }
  render() {
    return (
      <div className="App">
        <Container
          {...this.state}
          addTodo={this.addTodo}
          showDeleted={this.showDeleted}
          showRegularList={this.showRegularList}
          handleInputChange={this.handleChange}
          handleTodoDelete={this.handleTodoDelete}
          handleTodoComplete={this.handleTodoComplete}
        />
      </div>
    );
  }
}

export default App;
