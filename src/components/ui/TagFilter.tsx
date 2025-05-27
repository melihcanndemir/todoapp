import React from "react";
import { useTranslation } from "react-i18next";
import TagDisplay from "./TagDisplay";

interface TagFilterProps {
  availableTags: string[];
  selectedTags: string[];
  onTagSelect: (tag: string) => void;
}

const TagFilter: React.FC<TagFilterProps> = ({
  availableTags,
  selectedTags,
  onTagSelect,
}) => {
  const { t } = useTranslation();

  if (availableTags.length === 0) {
    return null;
  }

  return (
    <div className="mb-4">
      <p className="text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
        {t("filterByTag")}:
      </p>
      <div className="flex flex-wrap gap-2">
        {availableTags.map((tag) => (
          <TagDisplay
            key={tag}
            tag={tag}
            onClick={() => onTagSelect(tag)}
            selected={selectedTags.includes(tag)}
            className="cursor-pointer hover:ring-1 hover:ring-gray-400 dark:hover:ring-gray-500"
          />
        ))}
        {selectedTags.length > 0 && (
          <button
            onClick={() => selectedTags.forEach(tag => onTagSelect(tag))}
            className="text-xs text-blue-600 dark:text-blue-400 hover:underline px-2 py-1"
          >
            {t("clearFilters")}
          </button>
        )}
      </div>
    </div>
  );
};

export default TagFilter;
