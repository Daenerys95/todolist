/* eslint-disable react/no-unused-state */
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
    const { todoId, input } = this.state;
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    const newTodo = {
      id: todoId + 1, value: input, crossed: false, checked: false,
    };
    const addTodos = [...todos, newTodo];
    localStorage.setItem('todos', JSON.stringify(addTodos));
    this.setState({
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
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    const crossedTodo = todos.map((todo) => {
      if (todo.id === id) {
        todo.crossed = !todo.crossed;
        todo.checked = !todo.checked;
      }
      return todo;
    });
    this.setState({
      todos: localStorage.setItem('todos', JSON.stringify(crossedTodo)),
    });
  }

  handleDeleteTodo = (id) => {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    const filteredTodos = todos.filter((todo) => todo.id !== id);
    this.setState({
      todos: localStorage.setItem('todos', JSON.stringify(filteredTodos)),
    });
  }

  handleDeleteAll = () => {
    this.setState({
      todos: localStorage.clear(),
    });
  }

  handleCheckAll = () => {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    const checkedTodos = todos.map((todo) => {
      if (!todo.checked) {
        todo.checked = true;
        todo.crossed = true;
      }
      return todo;
    });
    this.setState({
      todos: localStorage.setItem('todos', JSON.stringify(checkedTodos)),
    });
  }

  handleUncheckAll = () => {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    const uncheckedTodos = todos.map((todo) => {
      if (todo.checked) {
        todo.checked = false;
        todo.crossed = false;
      }
      return todo;
    });
    this.setState({
      todos: localStorage.setItem('todos', JSON.stringify(uncheckedTodos)),
    });
  }

  render() {
    const { input } = this.state;
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    return (
      <div id="app">
        <p className="todo-date">Friday, December 6</p>
        <form id="form" onSubmit={this.handleSubmit}>
          <input className="todo-input" type="text" placeholder="Add a todo..." value={input} onChange={this.handleChange} required />
          <button className="todo-btn" type="submit">Add Todo</button>
        </form>
        { todos.map((todo) => (
          <div key={todo.id} className="todo-list">
            <input type="checkbox" checked={todo.checked} onChange={() => this.handleCheckboxChange(todo.id)} />
            <p className={`linethrough-${todo.crossed}`}>{todo.value}</p>
            <span className="todo-delete-btn" onClick={() => this.handleDeleteTodo(todo.id)}>X</span>
            <hr />
          </div>
        ))}
        <div className="todo-all-btn">
          <button type="button" onClick={this.handleCheckAll}>Check All</button>
          <button type="button" onClick={this.handleUncheckAll}>Uncheck All</button>
          <button type="button" onClick={this.handleDeleteAll}>Delete All</button>
        </div>
      </div>
    );
  }
}
// == Export
export default App;
