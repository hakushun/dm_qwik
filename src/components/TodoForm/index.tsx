import type { QRL, Signal } from "@builder.io/qwik";
import { component$ } from "@builder.io/qwik";
import "./index.css";

type Props = {
  onSubmit$: QRL<() => void>;
  todo: Signal<string>;
};

export const TodoForm = component$(({ onSubmit$, todo }: Props) => {
  return (
    <form preventdefault:submit onSubmit$={onSubmit$} class="todo_form">
      <input type="text" name="todo" required bind:value={todo} class="todo_form__input" />
      <button type="submit" class="todo_form__button">
        Add
      </button>
    </form>
  );
});
