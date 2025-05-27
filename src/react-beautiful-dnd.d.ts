declare module 'react-beautiful-dnd' {
  import * as React from 'react';

  export interface DraggableStateSnapshot {
    isDragging: boolean;
    draggingOver: string | null;
  }

  export interface DroppableProvided {
    innerRef: (element: HTMLElement | null) => void;
    droppableProps: Record<string, unknown>;
    placeholder?: React.ReactElement;
  }

  export interface DraggableProvided {
    innerRef: (element: HTMLElement | null) => void;
    draggableProps: {
      style?: React.CSSProperties;
    } & Record<string, unknown>;
    dragHandleProps: Record<string, unknown> | null;
  }

  export interface DropResult {
    source: { index: number };
    destination: { index: number } | null;
  }

  export const DragDropContext: React.ComponentType<{
    onDragEnd: (result: DropResult) => void;
    children: React.ReactNode;
  }>;

  export const Droppable: React.ComponentType<{
    droppableId: string;
    children: (provided: DroppableProvided) => React.ReactNode;
  }>;

  export const Draggable: React.ComponentType<{
    draggableId: string;
    index: number;
    children: (
      provided: DraggableProvided,
      snapshot: DraggableStateSnapshot
    ) => React.ReactNode;
  }>;
}
