import { todo } from 'node:test';
import './App.scss';
import { TodoList } from './components/TodoList';
import { useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

export const App = () => {
  const [todos, setTodos] = useState(todosFromServer);
  const [users, setUsers] = useState(usersFromServer);
  const [formKey, setFormKeys] = useState(0);

  const addTodo = (newTodo, newUser) => {
    setTodos([...todos, newTodo]);
    setFormKeys(formKey + 1);
    setUsers([...users, newUser]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST">
        <div className="field">
          <input type="text" data-cy="titleInput" />
          <span className="error">Please enter a title</span>
        </div>

        <div className="field">
          <select data-cy="userSelect">
            <option value="0" disabled>
              Choose a user
            </option>
          </select>

          <span className="error">Please choose a user</span>
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList onAdd={addTodo} todos={todos} users={users} />
    </div>
  );
};
