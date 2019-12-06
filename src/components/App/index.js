// == Import : npm
import React, { Component } from 'react';

// == Import : local
import './app.scss';


class App extends Component {
  state={
    input: '',
    todos: [],
    todoId: 0,
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { todoId, input, todos: stateTodos } = this.state;
    const newTodo = {
      id: todoId + 1, value: input, crossed: false, checked: false,
    };
    const todos = [...stateTodos, newTodo];
    localStorage.setItem('todos', JSON.stringify(todos));
    this.setState({
      todos,
      input: '',
      todoId: newTodo.id,
    });
  }

  handleChange = (e) => {
    const { value } = e.target;
    this.setState({
      input: value,
    });
  }

  handleCheckboxChange = (id) => {
    const { todos: stateTodos } = this.state;
    const todos = [...stateTodos];
    const crossedTodo = todos.map((todo) => {
      if (todo.id === id) {
        todo.crossed = !todo.crossed;
        todo.checked = !todo.checked;
      }
      return todo;
    });
    this.setState({
      todos: crossedTodo,
    });
  }

  handleDeleteTodo = (id) => {
    const { todos: stateTodos } = this.state;
    const todos = [...stateTodos];
    const filteredTodos = todos.filter((todo) => todo.id !== id);
    this.setState({
      todos: filteredTodos,
    });
  }

  handleDeleteAll = () => {
    this.setState({
      todos: [],
    });
  }

  handleCheckAll = () => {
    const { todos: stateTodos } = this.state;
    const todos = [...stateTodos];
    const checkedTodos = todos.map((todo) => {
      if (!todo.checked) {
        todo.checked = true;
        todo.crossed = true;
      }
      return todo;
    });
    this.setState({
      todos: checkedTodos,
    });
  }

  handleUncheckAll = () => {
    const { todos: stateTodos } = this.state;
    const todos = [...stateTodos];
    const checkedTodos = todos.map((todo) => {
      if (todo.checked) {
        todo.checked = false;
        todo.crossed = false;
      }
      return todo;
    });
    this.setState({
      todos: checkedTodos,
    });
  }

  render() {
    const { input } = this.state;
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    return (
      <div id="app">
        <p>Friday, December 6</p>
        <form id="form" onSubmit={this.handleSubmit}>
          <input type="text" placeholder="Add a todo..." value={input} onChange={this.handleChange} />
          <button type="submit">Add Todo</button>
        </form>
        { todos.map((todo) => (
          <React.Fragment key={todo.id}>
            <input type="checkbox" checked={todo.checked} onChange={() => this.handleCheckboxChange(todo.id)} />
            <p className={`linethrough-${todo.crossed}`}>{todo.value}</p>
            <button type="button" onClick={() => this.handleDeleteTodo(todo.id)}>X</button>
            <hr />
          </React.Fragment>
        ))}
        <button type="button" onClick={this.handleCheckAll}>Check All</button>
        <button type="button" onClick={this.handleUncheckAll}>Uncheck All</button>
        <button type="button" onClick={this.handleDeleteAll}>Delete All</button>
      </div>
    );
  }
}
// == Export
export default App;
