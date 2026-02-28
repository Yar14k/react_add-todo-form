import './App.scss';
import { TodoList } from './components/TodoList';
import { useState } from 'react';


import usersFromServer from './api/users';
import todosFromServer from './api/todos';

export const App = () => {
  const [todos, setTodos] = useState(todosFromServer.map(todo => ({
    ...todo,
    user: usersFromServer.find(u => u.id === todo.userId),
  })));

  const [users] = useState(usersFromServer);
  const [userId, setUserId] = useState(0);
  const [title, setTitle] = useState('');
  const [errors, setErrors] = useState({ title: false, userId: false });

  const handleSubmit = e => {
    e.preventDefault();

    const isTitleValid = title.trim() !== '';
    const isUserIdValid = userId !== 0;

    if (!isTitleValid || !isUserIdValid) {
      setErrors({
        title: !isTitleValid,
        userId: !isUserIdValid,
      });

      return;
    }

    const newTodo = {
      id: todos.length ? Math.max(...todos.map(t => t.id)) + 1 : 1,
      title: title.trim(),
      userId,
      completed: false,
      user: selectedUser,
    };

    setTodos([...todos, newTodo]);
    setTitle('');
    setUserId(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter todo title"
            value={title}
            onChange={e => {
              const cleanValue = e.target.value.replace(/[^a-zA-Z0-9 ]/g, '');

              setTitle(cleanValue);
              setErrors(prevErrors => ({ ...prevErrors, title: false }));
            }}
          />
          {errors.title && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userId}
            onChange={b => {
              setUserId(Number(b.target.value));
              setErrors(prevErrors => ({ ...prevErrors, userId: false }));
            }}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {users.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {errors.userId && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
