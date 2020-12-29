import HomeActions from './actions.types';

export function fetchMovies() {
    return {
        type: HomeActions.FETCH_MOVIES
    }
}

export function fetchMoviesSuccess(data) {
    return {
        type: HomeActions.FETCH_MOVIES_SUCCESS,
        payload: data
    }
}