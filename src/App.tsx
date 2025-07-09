import { useState, useEffect } from "react";
import { useIntlayer, useLocale } from "react-intlayer";
import { DragDropContext } from "@hello-pangea/dnd";
import type { DropResult } from "@hello-pangea/dnd";
import TodoInput from "./components/ToDoInput";
import TodoList from "./components/ToDoList";
import { Locales } from "intlayer";


interface Todo {
  id: number;
  text: string;
  description?: string;
  done: boolean;
  category: "work" | "school" | "personal";
  priority: "low" | "medium" | "high";
  dueDate?: string;
  subtasks: Subtask[];
  showSubtasks?: boolean;
  tags: string[];
}

interface Subtask {
  id: number;
  text: string;
  done: boolean;
}

const STORAGE_KEY = "todos";
const DARK_MODE_KEY = "darkMode";

const supportedLocales = [
  { code: "en", label: "English" },
  { code: "tr", label: "Türkçe" },
  { code: "de", label: "Deutsch" },
  { code: "fr", label: "Français" },
  { code: "es", label: "Español" },
  { code: "it", label: "Italiano" },
  { code: "ar", label: "العربية" },
  { code: "ru", label: "Русский" },
  { code: "zh", label: "中文" },
  { code: "ja", label: "日本語" },
  { code: "pt", label: "Português" },
  { code: "nl", label: "Nederlands" },
  { code: "ko", label: "한국어" },
  { code: "fa", label: "فارسی" },
  { code: "hi", label: "हिन्दी" }
];

function App() {
  const content = useIntlayer("app");
  const { locale, setLocale } = useLocale();
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem(STORAGE_KEY);
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem(DARK_MODE_KEY);
    return savedMode ? JSON.parse(savedMode) : true;
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<
    "none" | "text" | "category" | "completion" | "dueDate"
  >("none");
  const [filter, setFilter] = useState<"all" | "work" | "school" | "personal">(
    "all"
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem(DARK_MODE_KEY, JSON.stringify(darkMode));
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  const toggleSubtaskVisibility = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, showSubtasks: !todo.showSubtasks } : todo
      )
    );
  };

  const addSubtask = (todoId: number, text: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === todoId
          ? {
              ...todo,
              subtasks: [
                ...todo.subtasks,
                { id: Date.now(), text, done: false }
              ]
            }
          : todo
      )
    );
  };

  const toggleSubtask = (todoId: number, subtaskId: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === todoId
          ? {
              ...todo,
              subtasks: todo.subtasks.map((subtask) =>
                subtask.id === subtaskId
                  ? { ...subtask, done: !subtask.done }
                  : subtask
              )
            }
          : todo
      )
    );
  };

  const deleteSubtask = (todoId: number, subtaskId: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === todoId
          ? {
              ...todo,
              subtasks: todo.subtasks.filter((subtask) => subtask.id !== subtaskId)
            }
          : todo
      )
    );
  };

  const editSubtask = (todoId: number, subtaskId: number, text: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === todoId
          ? {
              ...todo,
              subtasks: todo.subtasks.map((subtask) =>
                subtask.id === subtaskId
                  ? { ...subtask, text }
                  : subtask
              )
            }
          : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const addTodo = (
    text: string,
    description: string,
    category: "work" | "school" | "personal",
    priority: "low" | "medium" | "high",
    tags: string[],
    dueDate?: string
  ) => {
    const newTodo: Todo = {
      id: Date.now(),
      text,
      description: description.trim() || undefined,
      done: false,
      category,
      priority,
      dueDate: dueDate && dueDate.trim() !== "" ? dueDate : undefined,
      subtasks: [],
      showSubtasks: false,
      tags: tags,
    };
    setTodos([...todos, newTodo]);
  };

  const editTodo = (id: number, newText: string, newDescription: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              text: newText,
              description: newDescription.trim() || undefined,
            }
          : todo
      )
    );
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const newTodos = Array.from(todos);
    const [removed] = newTodos.splice(result.source.index, 1);
    newTodos.splice(result.destination.index, 0, removed);
    setTodos(newTodos);
  };

  const filteredTodos = todos.filter((todo) => {
    const matchesSearch = todo.text
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesFilter = filter === "all" ? true : todo.category === filter;
    return matchesSearch && matchesFilter;
  });

  const sortedTodos = [...filteredTodos].sort((a, b) => {
    if (sortBy === "text") {
      return a.text.localeCompare(b.text);
    }
    if (sortBy === "category") {
      return a.category.localeCompare(b.category);
    }
    if (sortBy === "completion") {
      return a.done === b.done ? 0 : a.done ? 1 : -1;
    }
    if (sortBy === "dueDate") {
      if (!a.dueDate && !b.dueDate) return 0;
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    }
    return 0;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex flex-col justify-center transition-colors duration-200">
      <div className="p-6 max-w-md mx-auto w-full backdrop-blur-sm bg-white/80 dark:bg-gray-900/80 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <img src="/checklist.png" alt="Todo App" className="w-8 h-8" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              {content.title.value}
            </h1>
          </div>
          <div className="flex gap-2">
            <select
              value={locale}
              onChange={(e) => {
                const value = e.target.value as Locales;
                setLocale(value);
              }}
              className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white"
              title="Dil Seç"
            >
              {supportedLocales.map(l => (
                <option key={l.code} value={l.code}>{l.label}</option>
              ))}
            </select>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white"
              title={darkMode ? content.lightMode.value : content.darkMode.value}
            >
              {darkMode ? "☀️" : "🌙"}
            </button>
          </div>
        </div>
        <input
          type="text"
          placeholder={content.searchPlaceholder.value}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 mb-4 rounded bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700"
        />
        <div className="flex gap-2 mb-4 bg-gray-100/50 dark:bg-gray-800/50 p-1.5 rounded-lg backdrop-blur-sm">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1.5 rounded-md transition-all duration-200 font-medium ${
              filter === "all"
                ? "bg-blue-600 dark:bg-blue-500 text-white shadow-md"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-200/70 dark:hover:bg-gray-700/70"
            }`}
          >
            {content.all.value}
          </button>
          <button
            onClick={() => setFilter("work")}
            className={`px-3 py-1.5 rounded-md transition-all duration-200 font-medium ${
              filter === "work"
                ? "bg-blue-600 dark:bg-blue-500 text-white shadow-md"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-200/70 dark:hover:bg-gray-700/70"
            }`}
          >
            {content.work.value}
          </button>
          <button
            onClick={() => setFilter("school")}
            className={`px-3 py-1.5 rounded-md transition-all duration-200 font-medium ${
              filter === "school"
                ? "bg-blue-600 dark:bg-blue-500 text-white shadow-md"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-200/70 dark:hover:bg-gray-700/70"
            }`}
          >
            {content.school.value}
          </button>
          <button
            onClick={() => setFilter("personal")}
            className={`px-3 py-1.5 rounded-md transition-all duration-200 font-medium ${
              filter === "personal"
                ? "bg-blue-600 dark:bg-blue-500 text-white shadow-md"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-200/70 dark:hover:bg-gray-700/70"
            }`}
          >
            {content.personal.value}
          </button>
        </div>
        <div className="flex flex-wrap gap-2 mb-4 bg-gray-100/50 dark:bg-gray-800/50 p-1.5 rounded-lg backdrop-blur-sm">
          <button
            onClick={() => setSortBy("none")}
            className={`px-3 py-1.5 rounded-md transition-all duration-200 font-medium ${
              sortBy === "none"
                ? "bg-blue-600 dark:bg-blue-500 text-white shadow-md"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-200/70 dark:hover:bg-gray-700/70"
            }`}
          >
            {content.noSort.value}
          </button>
          <button
            onClick={() => setSortBy("text")}
            className={`px-3 py-1.5 rounded-md transition-all duration-200 font-medium ${
              sortBy === "text"
                ? "bg-blue-600 dark:bg-blue-500 text-white shadow-md"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-200/70 dark:hover:bg-gray-700/70"
            }`}
          >
            {content.sortByName.value}
          </button>
          <button
            onClick={() => setSortBy("category")}
            className={`px-3 py-1.5 rounded-md transition-all duration-200 font-medium ${
              sortBy === "category"
                ? "bg-blue-600 dark:bg-blue-500 text-white shadow-md"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-200/70 dark:hover:bg-gray-700/70"
            }`}
          >
            {content.sortByCategory.value}
          </button>
          <button
            onClick={() => setSortBy("completion")}
            className={`px-3 py-1.5 rounded-md transition-all duration-200 font-medium ${
              sortBy === "completion"
                ? "bg-blue-600 dark:bg-blue-500 text-white shadow-md"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-200/70 dark:hover:bg-gray-700/70"
            }`}
          >
            {content.sortByCompletion.value}
          </button>
          <button
            onClick={() => setSortBy("dueDate")}
            className={`px-3 py-1.5 rounded-md transition-all duration-200 font-medium ${
              sortBy === "dueDate"
                ? "bg-blue-600 dark:bg-blue-500 text-white shadow-md"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-200/70 dark:hover:bg-gray-700/70"
            }`}
          >
            {content.sortByDueDate.value}
          </button>
        </div>
        <TodoInput onAdd={addTodo} />
        <DragDropContext onDragEnd={onDragEnd}>
          <TodoList
            todos={sortedTodos}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onEdit={editTodo}
            isDraggable={sortBy === "none"}
            onToggleSubtaskVisibility={toggleSubtaskVisibility}
            onAddSubtask={addSubtask}
            onToggleSubtask={toggleSubtask}
            onDeleteSubtask={deleteSubtask}
            onEditSubtask={editSubtask}
          />
        </DragDropContext>
      </div>
    </div>
  );
}

export default App;
