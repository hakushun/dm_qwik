import type { Signal } from "@builder.io/qwik";
import { component$ } from "@builder.io/qwik";
import "./index.css";
import type { Todo } from "~/routes";

type Props = {
  todos: Signal<Todo[]>;
};

export const TodoList = component$(({ todos }: Props) => {
  return (
    <ul class="todo_list">
      {todos.value.map((todo) => (
        <li key={todo.id} class="todo_list__item">
          <input
            type="checkbox"
            name={`${todo.id}`}
            id={`${todo.id}`}
            onChange$={() => {
              todos.value = todos.value.map((t) => (t.id === todo.id ? { ...t, completed: !t.completed } : t));
            }}
            class="todo_list__checkbox"
          />
          <label for={`${todo.id}`} class={`todo_list__title ${todo.completed ? "todo_list__title--checked" : ""}`}>
            {todo.title}
          </label>
        </li>
      ))}
    </ul>
  );
});
