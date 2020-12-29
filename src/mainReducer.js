import { combineReducers } from 'redux';
import homeReducer from './components/Home/reducer';
import selectionReducer from './components/SeatSelection/reducer';

const mainReducer = combineReducers({
    homeReducer: homeReducer,
    selectionReducer: selectionReducer,
});

export default mainReducer