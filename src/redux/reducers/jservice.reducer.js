import { Map } from 'immutable';

const SET_LOADER_VISIBILITY = 'SET_LOADER_VISIBILITY';

const GET_RANDOM_QUESTIONS_SUCCESS = 'GET_RANDOM_QUESTIONS_SUCCESS';
const GET_RANDOM_QUESTION_FAILURE = 'GET_RANDOM_QUESTION_FAILURE';

const GET_CATEGORY_BY_ID_SUCCESS = 'GET_CATEGORY_BY_ID_SUCCESS';
const GET_CATEGORY_BY_ID_FAILURE = 'GET_CATEGORY_BY_ID_FAILURE';

export const setLoaderVisibility = value => ({ type: SET_LOADER_VISIBILITY, payload: value });

export const getRandomQuestionsSuccess = value => ({ type: GET_RANDOM_QUESTIONS_SUCCESS, payload: value });
export const getRandomQuestionsFailure = value => ({ type: GET_RANDOM_QUESTION_FAILURE });

export const getCategoryByIdSuccess = value => ({ type: GET_CATEGORY_BY_ID_SUCCESS, payload: value });
export const getCategoryByIdFailure = value => ({ type: GET_CATEGORY_BY_ID_FAILURE });

// Initial state
export const initialState = Map({
    loaderVisibility: false,
    message: '',
    questions: {
        message: '',
        items: []
    },
    categories: {
        items: [],
        message: ''
    }
}).toJS();

export function JserviceStateReducer(state = initialState, action) {
    switch (action.type) {
        case GET_RANDOM_QUESTIONS_SUCCESS:
            return {
                ...state,
                questions: {
                    items: action.payload,
                    message: ''
                }
            };
        case GET_RANDOM_QUESTION_FAILURE:
            return {
                ...state,
                questions: {
                    message: 'No Record Found',
                    items: []
                }
            };
        case GET_CATEGORY_BY_ID_SUCCESS:
            if (state.categories.items && state.categories.items.length > 0) {
                return {
                    ...state,
                    categories: {
                        ...state.categories,
                        items: [...state.categories.items, action.payload]
                    }
                };
            } else {
                return {
                    ...state,
                    categories: {
                        items: [action.payload],
                        message: ''
                    }
                };
            }

        case GET_CATEGORY_BY_ID_FAILURE:
            return {
                ...state,
                categories: {
                    message: 'No Record Found',
                    items: []
                }
            };
        default:
            return state;
    }
}

