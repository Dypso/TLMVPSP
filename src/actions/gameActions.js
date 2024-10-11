import axios from 'axios';
import { API_URL } from '../config';

export const FETCH_QUESTIONS_REQUEST = 'FETCH_QUESTIONS_REQUEST';
export const FETCH_QUESTIONS_SUCCESS = 'FETCH_QUESTIONS_SUCCESS';
export const FETCH_QUESTIONS_FAILURE = 'FETCH_QUESTIONS_FAILURE';
export const SUBMIT_ANSWER = 'SUBMIT_ANSWER';

export const fetchQuestions = () => async (dispatch) => {
  dispatch({ type: FETCH_QUESTIONS_REQUEST });
  try {
    const response = await axios.get(`${API_URL}/questions`);
    dispatch({ type: FETCH_QUESTIONS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_QUESTIONS_FAILURE, payload: error.message });
  }
};

export const submitAnswer = (questionId, answer) => async (dispatch) => {
  try {
    const response = await axios.post(`${API_URL}/answers`, { questionId, answer });
    dispatch({ type: SUBMIT_ANSWER, payload: response.data });
  } catch (error) {
    console.error('Error submitting answer:', error);
  }
};