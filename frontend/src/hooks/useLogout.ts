import { useAuthContext } from "./useAuthContext";
import { useNoteContext } from "./useNoteContext";
export const useLogout = () => {
  const { dispatch } = useAuthContext() as any;
  const { dispatch: noteDispatch } = useNoteContext() as any;
  const logout = () => {
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
    noteDispatch({ type: "NOTE_FILLER", payload: null });
  };
  return { logout };
};
