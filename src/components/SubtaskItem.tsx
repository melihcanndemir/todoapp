import { useState } from "react";
import { useIntlayer } from "react-intlayer";

export interface Subtask {
  id: number;
  text: string;
  done: boolean;
}

interface SubtaskItemProps {
  subtask: Subtask;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, text: string) => void;
}

const SubtaskItem = ({
  subtask,
  onToggle,
  onDelete,
  onEdit,
}: SubtaskItemProps) => {
  const content = useIntlayer("app");
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(subtask.text);

  const handleSave = () => {
    if (editedText.trim()) {
      onEdit(subtask.id, editedText);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditedText(subtask.text);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="flex flex-col p-2 border dark:border-gray-700 rounded-lg mt-1 bg-gray-100 dark:bg-gray-800/70">
        <input
          type="text"
          value={editedText}
          onChange={(e) => setEditedText(e.target.value)}
          className="w-full px-2 py-1 mb-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600"
          placeholder={content.subtaskText.value}
          autoFocus
        />
        <div className="flex gap-2 justify-end">
          <button
            onClick={handleCancel}
            className="px-2 py-1 text-xs text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
          >
            {content.cancel.value}
          </button>
          <button
            onClick={handleSave}
            className="px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {content.save.value}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 p-2 border dark:border-gray-700 rounded-lg mt-1 bg-gray-100 dark:bg-gray-800/70 transition-all duration-200">
      <input
        type="checkbox"
        checked={subtask.done}
        onChange={() => onToggle(subtask.id)}
        className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:checked:bg-blue-600"
      />
      <span
        className={`flex-1 text-sm text-gray-900 dark:text-gray-100 ${
          subtask.done ? "line-through text-gray-500 dark:text-gray-400" : ""
        }`}
      >
        {subtask.text}
      </span>
      <div className="flex items-center gap-1">
        <button
          onClick={() => setIsEditing(true)}
          className="text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
          title={content.edit.value}
        >
          <svg
            className="w-4 h-4"
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
          onClick={() => onDelete(subtask.id)}
          className="text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 transition-colors"
          title={content.delete.value}
        >
          <svg
            className="w-4 h-4"
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
  );
};

export default SubtaskItem;
