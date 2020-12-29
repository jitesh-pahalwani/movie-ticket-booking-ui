import { put, takeEvery } from 'redux-saga/effects';

import HomeActions from './actions.types';
import { BASE_URL } from '../../constants';

function* fetchMovies() {
    try {
        const apiResult = yield fetch(`${BASE_URL}/get-movies`).then(res => res.json());
        yield put({
            type: HomeActions.FETCH_MOVIES_SUCCESS, payload: apiResult
        });
    } catch (err) {
        yield put({
            type: HomeActions.FETCH_MOVIES_FAILURE, payload: err
        });
    }
}

export default function* homeSaga() {
    yield takeEvery(HomeActions.FETCH_MOVIES, fetchMovies);
}