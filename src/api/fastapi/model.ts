import { TextInput } from "../models/TextInput";
import { useCreate } from "../react-query/hooks";

const apiUrl = process.env["REACT_APP_BACKEND_MODEL_API_URL"];

// Summary:
//    Create a new text
// Parameters (with mutation function):
export const usePostText = (options: any = {}) => {
  return useCreate<TextInput>(`${apiUrl}/post/text`, options);
};
