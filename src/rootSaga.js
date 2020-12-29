import { all } from 'redux-saga/effects';
import homeSaga from './components/Home/saga';
import selectionSaga from './components/SeatSelection/saga';

export default function* rootSaga() {
    yield all([homeSaga(), selectionSaga()]);
}