type FormInputProps = {
  title: string;
  setTitle: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
  handleForm: (e: React.FormEvent<HTMLFormElement>) => void;
  error: string | null;
  emptyFields: string[];
};

const FormInput = ({
  emptyFields,
  title,
  setTitle,
  description,
  setDescription,
  handleForm,
  error,
}: FormInputProps) => {
  return (
    <form className="create" onSubmit={handleForm}>
      <h3>Add a new note</h3>
      <div className="create-group">
        <div>
          <label>Note Title:</label>
          <input
            className={emptyFields.includes("title") ? "error" : ""}
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </div>
        <div>
          <label>Note Description:</label>
          <input
            type="text"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
        </div>
      </div>
      <button type="submit">Add</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default FormInput;
