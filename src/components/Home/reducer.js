import HomeActions from './actions.types';

const initialState = {
    loading: true,
    error: false,
    allMovies: [],
};

export default function homeReducer(state = initialState, action) {
    switch (action.type) {
        case HomeActions.FETCH_MOVIES:
            return {
                ...state,
                loading: true
            }
        case HomeActions.FETCH_MOVIES_SUCCESS:
            return {
                ...state,
                loading: false,
                allMovies: action.payload
            }
        case HomeActions.FETCH_MOVIES_FAILURE:
            return {
                ...state,
                loading: false,
                error: true
            }
        default:
            return initialState
    }
}