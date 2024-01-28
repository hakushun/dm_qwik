import { component$, $, useSignal } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import "./index.css";
import { TodoForm } from "~/components/TodoForm";
import { TodoList } from "~/components/TodoList";

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

export default component$(() => {
  const todo = useSignal<string>("");
  const todos = useSignal<Todo[]>([]);

  const onSubmit$ = $(() => {
    function generateId() {
      const last = todos.value.at(-1);
      if (!last) return 0;
      return last.id + 1;
    }
    todos.value = [...todos.value, { id: generateId(), title: todo.value, completed: false }];
    todo.value = "";
  });

  return (
    <main class="todo">
      <TodoForm onSubmit$={onSubmit$} todo={todo} />
      {todos.value.length > 0 ? <TodoList todos={todos} /> : <div>Nothing to do.</div>}
    </main>
  );
});

export const head: DocumentHead = {
  title: "Qwik Todo App",
};
