import { BaseURL } from "../api";
import { useNoteContext } from "../hooks/useNoteContext";
import type { Note } from "../types";
import moment from "moment";
import { useAuthContext } from "../hooks/useAuthContext";
import { useState } from "react";
// Türkçe locale'i aktif et - component dışında
moment.locale("tr");

type Props = {
  note: Note;
};

const NoteDetail = ({ note }: Props) => {
  const [error, setError] = useState<string | null>(null);
  const { setNotes: dispatch } = useNoteContext();
  const { user } = useAuthContext() as any;
  const handleDelete = async () => {
    if (!user) {
      setError("You must be logged in");
      return;
    }
    try {
      await BaseURL.delete(`/notes/${note._id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      dispatch({ type: "DELETE_NOTE", payload: note._id });
    } catch (error) {
      console.log(error);
    }
  };

  // Tarihi Türkçe ve fromNow() ile formatla
  const formatDate = (date: string) => {
    return moment(date).locale("tr").fromNow();
  };

  return (
    <div className="not-detay">
      <h4>{note.title}</h4>
      <p>{note.description}</p>
      <p className="zaman">{formatDate(note.createdAt)}</p>
      <span onClick={handleDelete}>
        <span className="material-symbols-outlined delete-icon">delete_sweep</span>
      </span>
    </div>
  );
};

export default NoteDetail;
