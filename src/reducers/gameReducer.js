import {
  FETCH_QUESTIONS_REQUEST,
  FETCH_QUESTIONS_SUCCESS,
  FETCH_QUESTIONS_FAILURE,
  SUBMIT_ANSWER,
} from '../actions/gameActions';

const initialState = {
  questions: [],
  currentQuestion: null,
  score: 0,
  loading: false,
  error: null,
};

const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_QUESTIONS_REQUEST:
      return { ...state, loading: true };
    case FETCH_QUESTIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        questions: action.payload,
        currentQuestion: action.payload[0],
      };
    case FETCH_QUESTIONS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case SUBMIT_ANSWER:
      return {
        ...state,
        score: state.score + (action.payload.correct ? 1 : 0),
        currentQuestion: state.questions[state.questions.indexOf(state.currentQuestion) + 1],
      };
    default:
      return state;
  }
};

export default gameReducer;