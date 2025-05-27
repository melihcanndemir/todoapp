import React from "react";
import { IoMdClose } from "react-icons/io";

interface TagDisplayProps {
  tag: string;
  onRemove?: () => void;
  onClick?: () => void;
  removable?: boolean;
  selected?: boolean;
  className?: string;
}

const TagDisplay: React.FC<TagDisplayProps> = ({
  tag,
  onRemove,
  onClick,
  removable = false,
  selected = false,
  className = "",
}) => {
  // Generate a consistent pastel color based on the tag name
  const getTagColor = (tag: string) => {
    let hash = 0;
    for (let i = 0; i < tag.length; i++) {
      hash = tag.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    // Generate HSL color with high lightness for pastel effect
    // Keep saturation moderate for both light/dark mode visibility
    const h = hash % 360;
    return `hsl(${h}, 70%, 65%)`;
  };

  const bgColor = getTagColor(tag);
  
  // Calculate text color based on background brightness for accessibility
  const textColor = "rgba(0, 0, 0, 0.7)";
  
  return (
    <div
      className={`inline-flex items-center px-2 py-1 rounded-full text-sm 
                 ${selected ? "ring-2 ring-blue-500" : ""} 
                 ${onClick ? "cursor-pointer" : ""} 
                 transition-all duration-200 
                 ${className}`}
      style={{ 
        backgroundColor: bgColor,
        color: textColor,
      }}
      onClick={onClick}
    >
      {tag}
      {removable && onRemove && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="ml-1 rounded-full hover:bg-black/10 p-0.5 transition-colors"
          aria-label="Remove tag"
        >
          <IoMdClose size={14} />
        </button>
      )}
    </div>
  );
};

export default TagDisplay;
