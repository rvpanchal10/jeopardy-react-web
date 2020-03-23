import { combineReducers } from 'redux';

import { JserviceStateReducer } from './jservice.reducer';

const rootReducer = combineReducers({
    game: JserviceStateReducer
});

export default rootReducer;
