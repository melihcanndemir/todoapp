import { useState } from "react";
import { useTranslation } from "react-i18next";
import SubtaskItem from "./SubtaskItem";
import type { Subtask } from "./SubtaskItem";

interface SubtaskListProps {
  todoId: number;
  subtasks: Subtask[];
  onAddSubtask: (todoId: number, text: string) => void;
  onToggleSubtask: (todoId: number, subtaskId: number) => void;
  onDeleteSubtask: (todoId: number, subtaskId: number) => void;
  onEditSubtask: (todoId: number, subtaskId: number, text: string) => void;
}

const SubtaskList = ({
  todoId,
  subtasks,
  onAddSubtask,
  onToggleSubtask,
  onDeleteSubtask,
  onEditSubtask,
}: SubtaskListProps) => {
  const { t } = useTranslation();
  const [newSubtaskText, setNewSubtaskText] = useState("");

  const handleAddSubtask = () => {
    if (newSubtaskText.trim()) {
      onAddSubtask(todoId, newSubtaskText.trim());
      setNewSubtaskText("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAddSubtask();
    }
  };

  return (
    <div className="pl-7 pr-2 pb-2 mt-2">
      <div className="flex items-center mb-2">
        <input
          type="text"
          value={newSubtaskText}
          onChange={(e) => setNewSubtaskText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={t("addSubtask")}
          className="flex-1 px-3 py-1 text-sm rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600"
        />
        <button
          onClick={handleAddSubtask}
          disabled={!newSubtaskText.trim()}
          className="ml-2 px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {t("add")}
        </button>
      </div>
      
      {subtasks.length > 0 ? (
        <div className="space-y-1 animate-fade-in">
          {subtasks.map((subtask) => (
            <SubtaskItem
              key={subtask.id}
              subtask={subtask}
              onToggle={(subtaskId) => onToggleSubtask(todoId, subtaskId)}
              onDelete={(subtaskId) => onDeleteSubtask(todoId, subtaskId)}
              onEdit={(subtaskId, text) => onEditSubtask(todoId, subtaskId, text)}
            />
          ))}
        </div>
      ) : (
        <div className="text-sm text-gray-500 dark:text-gray-400 italic">
          {t("noSubtasks")}
        </div>
      )}
    </div>
  );
};

export default SubtaskList;
