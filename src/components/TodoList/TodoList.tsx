import { TodoInfo } from '../TodoInfo';

export const TodoList = ({onAdd, todos, users}) => {
  <section className="TodoList">
  {todos.map((todo) => (
    <TodoInfo key={todo.id} todo={todo} />
  ))}
</section>;
};
