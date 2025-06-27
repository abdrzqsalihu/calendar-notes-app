import React, { useRef, useEffect, useState } from "react";
import { useNoteContext } from "../context/NoteContext";

interface OverlayProps {
  dateKey: string;
  position: { top: number; left: number };
  onClose: () => void;
}

const Overlay: React.FC<OverlayProps> = ({ dateKey, position, onClose }) => {
  const { notes, setNote } = useNoteContext();
  const [value, setValue] = useState(notes[dateKey] || "");

  const overlayRef = useRef<HTMLDivElement>(null);

  // this update local state if note changes
  useEffect(() => {
    setValue(notes[dateKey] || "");
  }, [dateKey, notes]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        overlayRef.current &&
        !overlayRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <div
      className="overlay"
      ref={overlayRef}
      style={{
        position: "absolute",
        top: position.top,
        left: position.left,
        zIndex: 1000,
        background: "#fff",
        border: "1px solid #ccc",
        padding: "0.75rem",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        width: 250,
      }}
    >
      <strong>{dateKey}</strong>
      <textarea
        value={value}
        maxLength={100}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Enter note..."
        style={{
          marginTop: "0.5rem",
          width: "100%",
          height: "60px",
          resize: "none",
          borderRadius: "4px",
          padding: "0.4rem",
          border: "1px solid #ccc",
        }}
      />
      <div
        style={{
          marginTop: "0.5rem",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <button onClick={() => onClose()}>Close</button>
        <button
          onClick={() => {
            setNote(dateKey, value.trim());
            onClose();
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default Overlay;
