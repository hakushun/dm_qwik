import { component$, useSignal } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import "./index.css";

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

export default component$(() => {
  const todo = useSignal<string>("");
  const todos = useSignal<Todo[]>([]);

  return (
    <main class="todo">
      <form
        preventdefault:submit
        onSubmit$={() => {
          function generateId() {
            const last = todos.value.at(-1);
            if (!last) return 0;
            return last.id + 1;
          }
          todos.value = [...todos.value, { id: generateId(), title: todo.value, completed: false }];
          todo.value = "";
        }}
        class="todo_form">
        <input type="text" name="todo" required bind:value={todo} class="todo_form__input" />
        <button type="submit" class="todo_form__button">
          Add
        </button>
      </form>
      {todos.value.length > 0 && (
        <ul class="todo_list">
          {todos.value.map((item) => (
            <li key={item.id} class="todo_list__item">
              <input
                type="checkbox"
                name={`${item.id}`}
                id={`${item.id}`}
                onChange$={() => {
                  todos.value = todos.value.map((t) => (t.id === item.id ? { ...t, completed: !t.completed } : t));
                }}
                class="todo_list__checkbox"
              />
              <label
                for={`${item.id}`}
                class={item.completed ? "todo_list__title todo_list__title--checked" : "todo_list__title"}>
                {item.title}
              </label>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
});

export const head: DocumentHead = {
  title: "Qwik Todo App",
};
