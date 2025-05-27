import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Input, Select, Button, TextArea, DatePicker } from "./ui";
import TagInput from "./ui/TagInput";

type Props = {
  onAdd: (
    text: string,
    description: string,
    category: "work" | "school" | "personal",
    priority: "low" | "medium" | "high",
    tags: string[],
    dueDate?: string
  ) => void;
};

const TodoInput = ({ onAdd }: Props) => {
  const { t } = useTranslation();
  const [text, setText] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<"work" | "school" | "personal">(
    "work"
  );
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");
  const [dueDate, setDueDate] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);

  const handleAdd = () => {
    if (text.trim() === "") return;
    onAdd(text, description, category, priority, tags, dueDate);
    setText("");
    setDescription("");
    setCategory("work");
    setPriority("medium");
    setDueDate("");
    setTags([]);
  };

  return (
    <div className="flex flex-col gap-3 mt-4">
      <Input
        placeholder={t("addTodo")}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <TextArea
        placeholder={t("addDescription")}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="resize-none"
        rows={2}
      />
      <div className="flex gap-2 mb-2">
        <Select
          value={category}
          onChange={(e) =>
            setCategory(e.target.value as "work" | "school" | "personal")
          }
        >
          <option value="work">{t("work")}</option>
          <option value="school">{t("school")}</option>
          <option value="personal">{t("personal")}</option>
        </Select>
        <Select
          value={priority}
          onChange={(e) => {
            const value = e.target.value;
            if (value === "low" || value === "medium" || value === "high") {
              setPriority(value);
            }
          }}
        >
          <option value="low">{t("priorityLow")}</option>
          <option value="medium">{t("priorityMedium")}</option>
          <option value="high">{t("priorityHigh")}</option>
        </Select>
      </div>
      <TagInput
        tags={tags}
        onChange={setTags}
        placeholder={t("addTags")}
      />
      <div className="flex gap-2">
        <DatePicker
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          min={new Date().toISOString().split("T")[0]}
          className="flex-1"
        />
        <Button onClick={handleAdd}>{t("addButton")}</Button>
      </div>
    </div>
  );
};

export default TodoInput;
