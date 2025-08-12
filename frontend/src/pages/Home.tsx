import { useEffect, useState } from "react";
import { BaseURL } from "../api";
import type { Note } from "../types";
import NoteDetail from "../components/NoteDetail";
import NoteForm from "../components/NoteForm";
import { useNoteContext } from "../hooks/useNoteContext";
import { useAuthContext } from "../hooks/useAuthContext";

const Home = () => {
  // const [notes, setNotes] = useState<Note[]>([]);
  const { notes, setNotes: dispatch } = useNoteContext();
  const { user } = useAuthContext() as any;
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await BaseURL.get("/notes", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        console.log(response);
        dispatch({ type: "NOTE_FILLER", payload: response.data });
      } catch (error) {
        console.error("Veri alınırken hata oluştu:", error);
      }
    };

    if (user) {
      fetchNotes();
    }
  }, [dispatch, user]);

  return (
    <div className="pages">
      <div>
        <NoteForm />
      </div>
      <div className="notlar">
        {notes?.map((note) => (
          <NoteDetail note={note} key={note._id} />
        ))}
      </div>
    </div>
  );
};

export default Home;
