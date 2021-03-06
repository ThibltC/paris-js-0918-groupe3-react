import { GET_ORIGINAL_QUESTIONS, POST_NEW_QUESTION, POST_NEW_OFFER } from "../actions/types";

const initialState = {
  questionsList: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ORIGINAL_QUESTIONS:
      return {
        ...state,
        questionsList: action.questionsList
      };
    case POST_NEW_QUESTION:
      return {
        ...state,
        questionsList: state.questionsList.concat(action.newQuestion)
      };
    case POST_NEW_OFFER:
      return state;
    default: 
      return state;
  }
};
