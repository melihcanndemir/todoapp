import TodoItem from "./ToDoItem";
import { useState } from "react";
import { useIntlayer } from "react-intlayer";
import { MdOutlineAssignment } from "react-icons/md";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import TagFilter from "./ui/TagFilter";
import type {
  DroppableProvided,
  DraggableProvided,
  DraggableStateSnapshot,
} from "@hello-pangea/dnd";
import type { Subtask } from "./SubtaskItem";

interface Todo {
  id: number;
  text: string;
  description?: string;
  done: boolean;
  category: "work" | "school" | "personal";
  priority?: "low" | "medium" | "high";
  dueDate?: string;
  subtasks: Subtask[];
  showSubtasks?: boolean;
  tags: string[];
}

interface Props {
  todos: Todo[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, text: string, description: string) => void;
  isDraggable?: boolean;
  sortBy?: "text" | "category" | "completion";
  onToggleSubtaskVisibility: (id: number) => void;
  onAddSubtask: (todoId: number, text: string) => void;
  onToggleSubtask: (todoId: number, subtaskId: number) => void;
  onDeleteSubtask: (todoId: number, subtaskId: number) => void;
  onEditSubtask: (todoId: number, subtaskId: number, text: string) => void;
}

const TodoList = ({
  todos,
  onToggle,
  onDelete,
  onEdit,
  isDraggable,
  sortBy,
  onToggleSubtaskVisibility,
  onAddSubtask,
  onToggleSubtask,
  onDeleteSubtask,
  onEditSubtask,
}: Props) => {
  const content = useIntlayer("app");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Get all unique tags from todos
  const allTags = [...new Set(todos.flatMap(todo => todo.tags))].sort();

  // Handle tag selection
  const handleTagSelect = (tag: string) => {
    setSelectedTags((prev: string[]) => 
      prev.includes(tag) 
        ? prev.filter((t: string) => t !== tag) // Remove if already selected
        : [...prev, tag] // Add if not already selected
    );
  };

  // Filter todos by selected tags if any
  const filteredTodos = selectedTags.length > 0
    ? todos.filter(todo => 
        selectedTags.every((tag: string) => todo.tags.includes(tag))
      )
    : todos;
    
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
    return 0;
  });

  if (sortedTodos.length === 0) {
    return (
      <div className="w-full flex flex-col">
        {allTags.length > 0 && (
          <TagFilter
            availableTags={allTags}
            selectedTags={selectedTags}
            onTagSelect={handleTagSelect}
          />
        )}
        <div className="mt-4 p-8 text-center text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 rounded-lg border dark:border-gray-700">
          <MdOutlineAssignment className="mx-auto mb-4 text-6xl text-gray-400 dark:text-gray-500" />
          {content.emptyState}
        </div>
      </div>
    );
  }

  if (!isDraggable) {
    return (
      <div className="mt-4">
        {sortedTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            id={todo.id}
            text={todo.text}
            description={todo.description}
            done={todo.done}
            category={todo.category}
            priority={todo.priority}
            dueDate={todo.dueDate}
            subtasks={todo.subtasks}
            showSubtasks={todo.showSubtasks}
            tags={todo.tags}
            onToggle={onToggle}
            onDelete={onDelete}
            onEdit={onEdit}
            onToggleSubtaskVisibility={onToggleSubtaskVisibility}
            onAddSubtask={onAddSubtask}
            onToggleSubtask={onToggleSubtask}
            onDeleteSubtask={onDeleteSubtask}
            onEditSubtask={onEditSubtask}
          />
        ))}
      </div>
    );
  }

  return (
    <Droppable droppableId="todo-list">
      {(provided: DroppableProvided) => (
        <div
          className="mt-4 relative overflow-hidden"
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <div className="text-xs text-gray-400 dark:text-gray-500 mb-2 select-none">
            {content.dragToReorder}
          </div>
          <div className="animate-fade-in">
            {sortedTodos.map((todo, index) => (
              <Draggable
                key={todo.id}
                draggableId={todo.id.toString()}
                index={index}
              >
                {(
                  provided: DraggableProvided,
                  snapshot: DraggableStateSnapshot
                ) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`transition-all duration-200 mb-2 ${
                      snapshot.isDragging
                        ? "shadow-lg z-50 opacity-90"
                        : "opacity-100"
                    }`}
                    style={{
                      ...provided.draggableProps.style,
                      position: snapshot.isDragging ? "absolute" : "relative",
                      top: snapshot.isDragging
                        ? `${index * (snapshot.isDropAnimating ? 0 : 64)}px`
                        : "auto",
                      left: 0,
                      right: 0,
                      transition: snapshot.isDropAnimating
                        ? "all 0.2s ease"
                        : undefined,
                    }}
                  >
                    <TodoItem
                      id={todo.id}
                      text={todo.text}
                      description={todo.description}
                      done={todo.done}
                      category={todo.category}
                      priority={todo.priority}
                      dueDate={todo.dueDate}
                      subtasks={todo.subtasks}
                      showSubtasks={todo.showSubtasks}
                      tags={todo.tags}
                      onToggle={onToggle}
                      onDelete={onDelete}
                      onEdit={onEdit}
                      onToggleSubtaskVisibility={onToggleSubtaskVisibility}
                      onAddSubtask={onAddSubtask}
                      onToggleSubtask={onToggleSubtask}
                      onDeleteSubtask={onDeleteSubtask}
                      onEditSubtask={onEditSubtask}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        </div>
      )}
    </Droppable>
  );
};

export default TodoList;
