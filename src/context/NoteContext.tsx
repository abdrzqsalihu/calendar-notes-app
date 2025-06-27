import React, { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface NoteContextType {
  notes: Record<string, string>;
  setNote: (dateKey: string, note: string) => void;
}

const NoteContext = createContext<NoteContextType | undefined>(undefined);

export const NoteProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [notes, setNotes] = useState<Record<string, string>>({});

  const setNote = (dateKey: string, note: string) => {
    setNotes((prev) => ({
      ...prev,
      [dateKey]: note,
    }));
  };

  return (
    <NoteContext.Provider value={{ notes, setNote }}>
      {children}
    </NoteContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useNoteContext = (): NoteContextType => {
  const context = useContext(NoteContext);
  if (!context)
    throw new Error("useNoteContext must be used inside a NoteProvider");
  return context;
};
