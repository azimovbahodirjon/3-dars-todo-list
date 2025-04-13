import { useState } from "react";
import { Todo } from "./interfaces";
import FormElement from "./components/FormElement";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleDelete = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-800 border-gray-700 py-12 px-6 transition-all duration-300">
      <div className="max-w-6xl mx-auto space-y-14">
        {/* Form */}
        <FormElement
          setTodos={(newTodo) => setTodos((prev) => [...prev, newTodo])}
        />

        {/* Todo List */}
        <section className="bg-gray-800 border border-gray-700 rounded-3xl shadow-xl p-10">
          <h2 className="text-4xl font-bold text-center text-white mb-10 tracking-tight">
            ✅ Your Tasks
          </h2>

          {todos.length === 0 ? (
            <p className="text-center text-gray-500 italic text-lg">
              You have no tasks yet... Add one above 🚀
            </p>
          ) : (
            <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {todos.map((t) => (
                <li
                  key={t.id}
                  className="bg-gradient-to-br from-white to-blue-50 border border-blue-100 rounded-2xl p-6 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out"
                >
                  <h3 className="text-xl font-semibold text-gray-800 mb-2 truncate hover:text-blue-600 transition-all duration-200 ease-in">
                    📌 {t.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3 hover:text-gray-500 transition-all duration-200 ease-in">
                    <span className="font-medium">Description:</span>{" "}
                    {t.description}
                  </p>

                  <div className="flex flex-wrap items-center justify-between gap-2 text-sm font-medium">
                    <span
                      className={`px-3 py-1 rounded-full text-white ${
                        t.type === "easy"
                          ? "bg-emerald-400"
                          : t.type === "normal"
                          ? "bg-yellow-400"
                          : "bg-rose-400"
                      }`}
                    >
                      {t.type.toUpperCase()}
                    </span>

                    <span
                      className={`px-3 py-1 rounded-full ${
                        t.completed
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-rose-100 text-rose-600"
                      }`}
                    >
                      {t.completed ? "✔ Done" : "⏳ Not Yet"}
                    </span>

                    <button
                      onClick={() => handleDelete(t.id)}
                      className="ml-auto text-red-500 hover:text-red-700 transition-all duration-200 ease-in-out transform hover:scale-110"
                      title="Delete task"
                    >
                      🗑 Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}

export default App;
