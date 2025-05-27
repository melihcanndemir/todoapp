import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Badge } from "./ui";
import SubtaskList from "./SubtaskList";
import TagDisplay from "./ui/TagDisplay";
import type { Subtask } from "./SubtaskItem";

interface Props {
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
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, text: string, description: string) => void;
  onToggleSubtaskVisibility: (id: number) => void;
  onAddSubtask: (todoId: number, text: string) => void;
  onToggleSubtask: (todoId: number, subtaskId: number) => void;
  onDeleteSubtask: (todoId: number, subtaskId: number) => void;
  onEditSubtask: (todoId: number, subtaskId: number, text: string) => void;
}

const TodoItem = ({
  id,
  text,
  description,
  done,
  category,
  priority = "medium", // Default to 'medium' if undefined
  dueDate,
  subtasks,
  showSubtasks = false,
  tags,
  onToggle,
  onDelete,
  onEdit,
  onToggleSubtaskVisibility,
  onAddSubtask,
  onToggleSubtask,
  onDeleteSubtask,
  onEditSubtask,
}: Props) => {
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(text);
  const [editedDescription, setEditedDescription] = useState(description || "");

  const handleSave = () => {
    if (editedText.trim()) {
      onEdit(id, editedText, editedDescription);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditedText(text);
    setEditedDescription(description || "");
    setIsEditing(false);
  };
  const getPriorityVariant = (priority: "low" | "medium" | "high") => {
    switch (priority) {
      case "low":
        return "success";
      case "medium":
        return "warning";
      case "high":
        return "danger";
    }
  };

  if (isEditing) {
    return (
      <div className="flex flex-col p-3 border dark:border-gray-700 rounded-lg mt-2 bg-gray-50 dark:bg-gray-800">
        <input
          type="text"
          value={editedText}
          onChange={(e) => setEditedText(e.target.value)}
          className="w-full px-3 py-2 mb-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600"
          placeholder={t("todoText")}
          autoFocus
        />
        <textarea
          value={editedDescription}
          onChange={(e) => setEditedDescription(e.target.value)}
          className="w-full px-3 py-2 mb-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 resize-none"
          placeholder={t("descriptionOptional")}
          rows={2}
        />
        {editedDescription && editedDescription.trim() !== "" && (
          <p className="ml-8 text-sm text-gray-600 dark:text-gray-400 mt-1">
            {editedDescription}
          </p>
        )}
        {tags && tags.length > 0 && (
          <div className="ml-8 mt-2 flex flex-wrap gap-1">
            {tags.map((tag, index) => (
              <TagDisplay key={index} tag={tag} />
            ))}
          </div>
        )}
        <div className="flex gap-2 justify-end">
          <button
            onClick={handleCancel}
            className="px-3 py-1 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
          >
            {t("cancel")}
          </button>
          <button
            onClick={handleSave}
            className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {t("save")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col p-3 border dark:border-gray-700 rounded-lg mt-2 bg-gray-50 dark:bg-gray-800 hover:shadow-md transition-all duration-200 cursor-grab active:cursor-grabbing hover:-translate-y-0.5">
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={done}
          onChange={() => onToggle(id)}
          className="w-5 h-5 rounded border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:checked:bg-blue-600"
        />
        <span
          className={`flex-1 text-gray-900 dark:text-gray-100 ${
            done ? "line-through text-gray-500 dark:text-gray-400" : ""
          }`}
        >
          {text}
        </span>
        <div className="flex items-center gap-2">
          <Badge variant={getPriorityVariant(priority)} size="sm">
            {t(
              `priority${priority.charAt(0).toUpperCase() + priority.slice(1)}`
            )}
          </Badge>
          <Badge
            variant={
              category === "work"
                ? "info"
                : category === "school"
                ? "success"
                : "default"
            }
            size="sm"
          >
            {t(category)}
          </Badge>
          <button
            onClick={() => setIsEditing(true)}
            className="text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </button>
          <button
            onClick={() => onDelete(id)}
            className="text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="mt-2 text-sm text-gray-600 dark:text-gray-400 border-t dark:border-gray-700 pt-2">
        {description && <p className="mb-1">{description}</p>}
        {dueDate && (
          <div className="flex items-center gap-1 text-xs mt-1">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className={`${done ? 'line-through' : ''} ${new Date(dueDate) < new Date() && !done ? 'text-red-500 dark:text-red-400 font-medium' : ''}`}>
              {t('dueDate')}: {new Date(dueDate).toLocaleDateString()}
            </span>
          </div>
        )}
        
        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {tags.map((tag, index) => (
              <TagDisplay key={index} tag={tag} />
            ))}
          </div>
        )}
        
        {/* Subtasks toggle button */}
        {subtasks.length > 0 && (
          <div className="flex items-center gap-1 mt-2 text-xs">
            <button
              onClick={() => onToggleSubtaskVisibility(id)}
              className="flex items-center gap-1 text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
            >
              <svg
                className={`w-4 h-4 transition-transform ${showSubtasks ? 'rotate-90' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <span>
                {showSubtasks ? t('hideSubtasks') : t('showSubtasks')} ({subtasks.length})
              </span>
            </button>
          </div>
        )}
        
        {/* Subtasks list */}
        {showSubtasks && (
          <SubtaskList
            todoId={id}
            subtasks={subtasks}
            onAddSubtask={onAddSubtask}
            onToggleSubtask={onToggleSubtask}
            onDeleteSubtask={onDeleteSubtask}
            onEditSubtask={onEditSubtask}
          />
        )}
        
        {/* Add subtask button (when no subtasks yet) */}
        {!subtasks.length && (
          <div className="mt-2">
            <button
              onClick={() => {
                onToggleSubtaskVisibility(id);
                // Short delay to make sure visibility is toggled before adding
                setTimeout(() => {
                  onAddSubtask(id, "");
                }, 10);
              }}
              className="text-xs text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 transition-colors flex items-center gap-1"
            >
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              {t('addSubtasks')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoItem;
