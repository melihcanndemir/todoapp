import React, { useState, useRef } from "react";
import type { KeyboardEvent } from "react";
import { useTranslation } from "react-i18next";
import TagDisplay from "./TagDisplay";

interface TagInputProps {
  tags: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
}

const TagInput: React.FC<TagInputProps> = ({
  tags,
  onChange,
  placeholder,
}) => {
  const { t } = useTranslation();
  const [inputValue, setInputValue] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const addTag = (tag: string) => {
    const trimmedTag = tag.trim().toLowerCase();
    if (trimmedTag && !tags.includes(trimmedTag)) {
      onChange([...tags, trimmedTag]);
    }
    setInputValue("");
  };

  const removeTag = (tagToRemove: string) => {
    onChange(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(inputValue);
    } else if (e.key === "Backspace" && !inputValue && tags.length > 0) {
      // Remove last tag when backspace is pressed and input is empty
      removeTag(tags[tags.length - 1]);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData("text");
    const pastedTags = pastedText.split(/,|\s+/).filter(tag => tag.trim());
    
    pastedTags.forEach(tag => {
      addTag(tag);
    });
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-wrap items-center gap-2 p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 min-h-[40px]">
        {tags.map((tag, index) => (
          <TagDisplay 
            key={index} 
            tag={tag} 
            onRemove={() => removeTag(tag)} 
            removable 
          />
        ))}
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          onBlur={() => inputValue && addTag(inputValue)}
          placeholder={tags.length === 0 ? (placeholder || t("addTags")) : ""}
          className="flex-grow outline-none bg-transparent min-w-[120px]"
        />
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
        {t("pressEnterOrComma")}
      </p>
    </div>
  );
};

export default TagInput;
