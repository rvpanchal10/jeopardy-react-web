import { get } from '../helpers/api';
import { toast } from 'react-toastify';

import * as JserviceStateReducer from '../redux/reducers/jservice.reducer';

const commonErrorMsg = 'Something went wrong, please try again.';

function getRandomQuestions(params, callback) {
    return async(dispatch) => {
        dispatch(JserviceStateReducer.setLoaderVisibility(true));
        get('random', params).then(res => {
            dispatch(JserviceStateReducer.setLoaderVisibility(false));
            if (res && res.status === 200) {
                dispatch(JserviceStateReducer.getRandomQuestionsSuccess(res.data));
                callback(res.data);
            } else {
                dispatch(JserviceStateReducer.getRandomQuestionsFailure());
                toast.error(commonErrorMsg, {
                    position: toast.POSITION.TOP_RIGHT
                });
                callback([]);
            }
        }).catch(err => {
            dispatch(JserviceStateReducer.setLoaderVisibility(false));
            dispatch(JserviceStateReducer.getRandomQuestionsFailure());
            toast.error(commonErrorMsg, {
                position: toast.POSITION.TOP_RIGHT
            });
            callback([]);
        });
    };
}

function getCategoryById(params, callback) {
    return async(dispatch) => {
        dispatch(JserviceStateReducer.setLoaderVisibility(true));
        get('category', params).then(res => {
            dispatch(JserviceStateReducer.setLoaderVisibility(false));
            if (res && res.status === 200) {
                dispatch(JserviceStateReducer.getCategoryByIdSuccess(res.data));
                callback(res.data);
            } else {
                dispatch(JserviceStateReducer.getCategoryByIdFailure());
                toast.error(commonErrorMsg, {
                    position: toast.POSITION.TOP_RIGHT
                });
                callback({});
            }
        }).catch(err => {
            dispatch(JserviceStateReducer.setLoaderVisibility(false));
            dispatch(JserviceStateReducer.getCategoryByIdFailure());
            toast.error(commonErrorMsg, {
                position: toast.POSITION.TOP_RIGHT
            });
            callback({});
        });
    };
}

export const jServiceActions = {
    getRandomQuestions,
    getCategoryById
};
