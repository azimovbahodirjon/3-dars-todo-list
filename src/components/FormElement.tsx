import { FormEvent, useRef } from "react";
import { Todo } from "../interfaces";

interface FormElementProps {
  setTodos: (todo: Todo) => void;
}

function FormElement({ setTodos }: FormElementProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const title = formData.get("title")?.toString().trim() || "";
    const description = formData.get("description")?.toString().trim() || "";
    const completed = formData.get("completed") === "on";
    const type = formData.get("type") as "easy" | "normal" | "hard";

    if (!title || !description) return alert("Please fill all fields");

    const todo: Todo = {
      id: Date.now(),
      title,
      description,
      completed,
      type,
    };

    setTodos(todo);
    e.currentTarget.reset();
    inputRef.current?.focus();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl shadow-xl p-10 space-y-7 transition-all duration-300 animate-fade-in"
    >
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white text-center tracking-wide">
        📝 Create a New Todo
      </h2>

      <div className="space-y-2">
        <label
          htmlFor="title"
          className="block text-sm font-semibold text-gray-700 dark:text-gray-200"
        >
          Title
        </label>
        <input
          ref={inputRef}
          id="title"
          name="title"
          type="text"
          placeholder="Enter a title..."
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="description"
          className="block text-sm font-semibold text-gray-700 dark:text-gray-200"
        >
          Description
        </label>
        <textarea
          name="description"
          id="description"
          placeholder="Enter a description..."
          className="w-full px-4 py-3 h-24 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
        />
      </div>

      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          name="completed"
          id="completed"
          className="w-5 h-5 accent-blue-600 rounded-md transition-transform duration-200 scale-100 hover:scale-105"
        />
        <label
          htmlFor="completed"
          className="text-sm text-gray-700 dark:text-gray-300"
        >
          Mark as completed
        </label>
      </div>

      <div className="space-y-2">
        <label
          htmlFor="type"
          className="block text-sm font-semibold text-gray-700 dark:text-gray-200"
        >
          Difficulty Level
        </label>
        <select
          name="type"
          id="type"
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
        >
          <option value="easy">Easy</option>
          <option value="normal">Normal</option>
          <option value="hard">Hard</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold py-3 rounded-xl shadow-md hover:shadow-lg transform hover:scale-[1.02] active:scale-100 transition-all duration-200 ease-in-out"
      >
        ➕ Add Todo
      </button>
    </form>
  );
}

export default FormElement;
