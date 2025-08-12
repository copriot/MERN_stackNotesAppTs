import { useState } from "react";
import FormInput from "./FormInput";
import { BaseURL } from "../api";
import { useNoteContext } from "../hooks/useNoteContext";
import { useAuthContext } from "../hooks/useAuthContext";
interface CustomError extends Error {
  emptyFields?: string[];
}

const NoteForm = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [emptyFields, setEmptyFields] = useState<string[]>([]);
  const { setNotes: dispatch } = useNoteContext();
  const { user } = useAuthContext() as any;
  const handleForm = async (e: any) => {
    e.preventDefault();
    if (!user) {
      setError("You must be logged in");
      return;
    }

    const note = { title, description };
    // console.log(note);
    try {
      const response = await BaseURL.post("/notes", note, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      setTitle("");
      setDescription("");
      setError(null);
      dispatch({ type: "CREATE_NOTE", payload: response.data });
    } catch (error) {
      console.log("dsadsada", error);
      setError(error instanceof Error ? error.message : "An unknown error occurred");
      setEmptyFields((error as CustomError).emptyFields || []);
    }
  };

  return (
    <FormInput
      emptyFields={emptyFields}
      title={title}
      setTitle={setTitle}
      description={description}
      setDescription={setDescription}
      handleForm={handleForm}
      error={error}
    />
  );
};

export default NoteForm;
