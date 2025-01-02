import TodoList from "./components/TodoList";
import NewTodo from "./components/NewTodo";
import { useState } from "react";
import { Todo } from "./models/todo.model.ts";

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const todoAddHandler = (text: string) => {
    setTodos((prevTodos) => [...prevTodos, { id: Math.random(), text }]);
  };

  const todoDeleteHandler = (id: number) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  return (
    <div>
      <NewTodo onAddTodo={todoAddHandler} />
      <TodoList todos={todos} onDeleteTodo={todoDeleteHandler} />
    </div>
  );
};

export default App;
