/*jshint quotmark:false */
/*jshint white:false */
/*jshint trailing:false */
/*jshint newcap:false */
/*global React, Router*/

import { ALL_TODOS, ACTIVE_TODOS, COMPLETED_TODOS } from "../utils/utils";
import { TodoItem } from "./todoItem";
import { TodoFooter } from "./footer";
import React from "react";
import { Utils } from "../utils/utils.js";
var ENTER_KEY = 13;

export class TodoApp extends React.Component {
  state = {
    nowShowing: ALL_TODOS,
    editing: null,
    newTodo: "",
    todos : []
  };
  key = 'next-todos';
  
addTodo = function (title) {
  let todos = this.state.todos.concat({
    id: Utils.uuid(),
    title: title,
    completed: false,
  });
 Utils.store(this.key, todos);this.setState({todos});
};

toggleAllT = function (checked) {
  // Note: it's usually better to use immutable data structures since they're
  // easier to reason about and React works very well with them. That's why
  // we use map() and filter() everywhere instead of mutating the array or
  // todo items themselves.
  let todos = this.state.todos.map(function (todo) {
    return Utils.extend({}, todo, { completed: checked });
  });
  Utils.store(this.key, todos);this.setState({todos});
};

toggleT = function (todoToToggle) {
  let todos = this.state.todos.map(function (todo) {
    return todo !== todoToToggle
      ? todo
      : Utils.extend({}, todo, { completed: !todo.completed });
  });
  Utils.store(this.key, todos);this.setState({todos});
};

destroyT = function (todo) {
  let todos = this.state.todos.filter(function (candidate) {
    return candidate !== todo;
  });
  Utils.store(this.key, todos);this.setState({todos});
};

saveT = function (todoToSave, text) {
  let todos = this.state.todos.map(function (todo) {
    return todo !== todoToSave ? todo : Utils.extend({}, todo, { title: text });
  });
  Utils.store(this.key, todos);this.setState({todos});
};

clearCompletedT = function () {
  let todos = this.state.todos.filter(function (todo) {
    return !todo.completed;
  });
  Utils.store(this.key, todos);this.setState({todos});
};

  componentDidMount() {
    let nowShowing;
    console.log(window.location.hash);
    switch (window.location.hash) {
      case "#":
        nowShowing = ALL_TODOS;
        break;
      case "#/active":
        nowShowing = ACTIVE_TODOS;
        break;
      case "#/completed":
        nowShowing = COMPLETED_TODOS;
        break;
      default:
        nowShowing = ALL_TODOS;
        break;
    }
    this.setState({
      nowShowing,
      todos : Utils.store('next-todos'),
    });
  }
  handleChangeNowShowing = (nowShowing) => {
    this.setState({
      nowShowing,
    });
  };
  handleChange = (event) => {
    this.setState({ newTodo: event.target.value });
  };

  handleNewTodoKeyDown = (event) => {
    if (event.keyCode !== ENTER_KEY) {
      return;
    }

    event.preventDefault();

    var val = this.state.newTodo.trim();

    if (val) {
      this.addTodo(val);
      this.setState({ newTodo: "" });
    }
  };

  toggleAll = (event) => {
    var checked = event.target.checked;
    this.toggleAllT(checked);
  };

  toggle = (todoToToggle) => {
    this.toggleT(todoToToggle);
  };

  destroy = (todo) => {
    this.destroyT(todo);
  };

  edit = (todo) => {
    this.setState({ editing: todo.id });
  };

  save = (todoToSave, text) => {
    this.saveT(todoToSave, text);
    this.setState({ editing: null });
  };

  cancel = () => {
    this.setState({ editing: null });
  };

  clearCompleted = () => {
    this.clearCompletedT();
  };

  render() {
    const { newTodo } = this.state;

    var footer;
    var main;
    var todos = this.state.todos;
console.log(todos)
    var shownTodos = todos.filter(function (todo) {
      switch (this.state.nowShowing) {
        case ACTIVE_TODOS:
          return !todo.completed;
        case COMPLETED_TODOS:
          return todo.completed;
        default:
          return true;
      }
    }, this);

    var todoItems = shownTodos.map(function (todo) {
      return (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={this.toggle.bind(this, todo)}
          onDestroy={this.destroy.bind(this, todo)}
          onEdit={this.edit.bind(this, todo)}
          editing={this.state.editing === todo.id}
          onSave={this.save.bind(this, todo)}
          onCancel={this.cancel}
        />
      );
    }, this);

    var activeTodoCount = todos.reduce(function (accum, todo) {
      return todo.completed ? accum : accum + 1;
    }, 0);

    var completedCount = todos.length - activeTodoCount;

    if (activeTodoCount || completedCount) {
      footer = (
        <TodoFooter
          count={activeTodoCount}
          completedCount={completedCount}
          nowShowing={this.state.nowShowing}
          onClearCompleted={this.clearCompleted}
          onChangeNowShowing={this.handleChangeNowShowing}
        />
      );
    }

    if (todos.length) {
      main = (
        <section className="main">
          <input
            id="toggle-all"
            className="toggle-all"
            type="checkbox"
            onChange={this.toggleAll}
            checked={activeTodoCount === 0}
          />
          <label htmlFor="toggle-all" />
          <ul className="todo-list">{todoItems}</ul>
        </section>
      );
    }

    return (
      <div>
        <header className="header">
          <h1>todos</h1>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            value={this.state.newTodo}
            onKeyDown={this.handleNewTodoKeyDown}
            onChange={this.handleChange}
            autoFocus={true}
          />
        </header>
        {main}
        {footer}
      </div>
    );
  }
}
