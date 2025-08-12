import React, { createContext, type ReactNode, type Reducer, useReducer } from "react";
import type { Note } from "../types";

interface NoteContextType {
  notes: Note[] | null;
  setNotes: React.Dispatch<{ type: string; payload: Note[] | string }>;
}

export const noteReducer = (
  state: { notes: Note[] | null },
  action: { type: string; payload: Note[] | string }
) => {
  switch (action.type) {
    case "CREATE_NOTE":
      return {
        notes: [action.payload as unknown as Note, ...(state.notes || [])],
      };
    case "NOTE_FILLER":
      return {
        notes: action.payload as Note[],
      };
    case "DELETE_NOTE":
      return {
        notes: state.notes?.filter((note) => note._id !== action.payload),
      };
    default:
      return state;
  }
};

export const NoteContext = createContext<NoteContextType>({
  notes: null,
  setNotes: () => {},
});

export const NotContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(
    noteReducer as Reducer<
      { notes: Note[] | null },
      { type: string; payload: Note[] | string }
    >,
    {
      notes: [],
    }
  );
  return (
    <NoteContext.Provider value={{ ...state, setNotes: dispatch }}>
      {children}
    </NoteContext.Provider>
  );
};
