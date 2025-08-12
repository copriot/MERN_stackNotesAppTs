import { NoteContext } from "../contexts/NotContext";
import { useContext } from "react";

export const useNoteContext = () => {
  const context = useContext(NoteContext);
  if (!context) {
    throw new Error("useNoteContext must be used within a NoteContextProvider");
  }
  return context;
};
