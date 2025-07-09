import { useState } from "react";
import { useIntlayer } from "react-intlayer";
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
  const content = useIntlayer("app");
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
        placeholder={content.addTodo.value}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <TextArea
        placeholder={content.addDescription.value}
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
          <option value="work">{content.work.value}</option>
          <option value="school">{content.school.value}</option>
          <option value="personal">{content.personal.value}</option>
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
          <option value="low">{content.priorityLow.value}</option>
          <option value="medium">{content.priorityMedium.value}</option>
          <option value="high">{content.priorityHigh.value}</option>
        </Select>
      </div>
      <TagInput
        tags={tags}
        onChange={setTags}
        placeholder={content.addTags.value}
      />
      <div className="flex gap-2">
        <DatePicker
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          min={new Date().toISOString().split("T")[0]}
          className="flex-1"
        />
        <Button onClick={handleAdd}>{content.addButton}</Button>
      </div>
    </div>
  );
};

export default TodoInput;
