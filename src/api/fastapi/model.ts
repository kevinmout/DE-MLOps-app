import { Feedback } from "../models/Feedback";
import { TextInput } from "../models/TextInput";
import { useCreate, useFetch } from "../react-query/hooks";

const apiUrl = process.env["REACT_APP_BACKEND_MODEL_API_URL"];

// Summary:
//    Create a new text
// Parameters (with mutation function):
export const usePostText = (options: any = {}) => {
  return useCreate<TextInput>(`${apiUrl}/classify/text`, options);
};

// Summary:
//    Create new feedback
// Parameters (with mutation function):
export const usePostFeedback = (options: any = {}) => {
  return useCreate<Feedback>(`${apiUrl}/post/feedback`, options);
};

// Summary:
//    Refresh the model
// Parameters (with mutation function):
export const useRefreshModel = (options: any = {}) => {
  return useFetch(`${apiUrl}/refresh/model`, {}, options);
};
