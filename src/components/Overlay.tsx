import React, { useRef, useEffect } from "react";

interface OverlayProps {
  dateKey: string;
  position: { top: number; left: number };
  onClose: () => void;
}

const Overlay: React.FC<OverlayProps> = ({ dateKey, position, onClose }) => {
  const overlayRef = useRef<HTMLDivElement>(null);

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
      }}
    >
      <strong>{dateKey}</strong>
      <p style={{ margin: "0.5rem 0 0" }}>Hello world</p>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default Overlay;
