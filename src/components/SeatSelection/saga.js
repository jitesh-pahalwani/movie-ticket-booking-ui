import { put, takeEvery, select } from 'redux-saga/effects';

import SelectionActions from './actions.types';
import { BASE_URL } from '../../constants';

function* fetchVenues() {
    try {
        const apiResult = yield fetch(`${BASE_URL}/get-venues`).then(res => res.json());
        yield put({
            type: SelectionActions.FETCH_VENUES_SUCCESS, payload: apiResult
        });
    } catch (err) {
        yield put({
            type: SelectionActions.FETCH_VENUES_FAILURE, payload: err
        });
    }
}

function* fetchAvailabilities() {
    try {
        let movieId = yield select((state) => state.selectionReducer.selectedMovie.movie_id);
        let venue = yield select((state) => state.selectionReducer.selectedVenue);
        const apiResult = yield fetch(`${BASE_URL}/get-availability/${movieId}/${venue}`).then(res => res.json());
        yield put({
            type: SelectionActions.FETCH_AVAILABILITIES_SUCCESS, payload: apiResult
        });
    } catch (err) {
        yield put({
            type: SelectionActions.FETCH_AVAILABILITIES_FAILURE, payload: err
        });
    }
}

function* modifyAvailabilities(action) {
    try {
        let movieId = yield select((state) => state.selectionReducer.selectedMovie.movie_id);
        let venue = yield select((state) => state.selectionReducer.selectedVenue);
        let selectedSeats = yield select((state) => state.selectionReducer.selectedSeats);
        let reqBody = {
            movieId: movieId,
            venueName: venue,
            seatNumbers: selectedSeats,
            newStatus: action.payload
        };
        reqBody = JSON.stringify(reqBody);

        const apiResult = yield fetch(`${BASE_URL}/set-availability`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
            body: reqBody
        }).then(res => res.json());
        yield put({
            type: SelectionActions.MODIFY_AVAILABILITIES_SUCCESS, payload: { result: apiResult, seatStatus: action.payload }
        });
    } catch (err) {
        yield put({
            type: SelectionActions.MODIFY_AVAILABILITIES_FAILURE, payload: err
        });
    }
}

export default function* homeSaga() {
    yield takeEvery(SelectionActions.FETCH_VENUES, fetchVenues);
    yield takeEvery(SelectionActions.FETCH_AVAILABILITIES, fetchAvailabilities);
    yield takeEvery(SelectionActions.MODIFY_AVAILABILITIES, modifyAvailabilities);
}