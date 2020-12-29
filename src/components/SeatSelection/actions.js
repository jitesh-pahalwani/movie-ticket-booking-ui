import SelectionActions from './actions.types';

export function setSelectedMovie(data) {
    return {
        type: SelectionActions.SET_SELECTED_MOVIE,
        payload: data
    }
}

export function setSelectedVenue(data) {
    return {
        type: SelectionActions.SET_SELECTED_VENUE,
        payload: data
    }
}

export function setSelectedSeats(data) {
    return {
        type: SelectionActions.SET_SELECTED_SEATS,
        payload: data
    }
}

export function fetchVenues() {
    return {
        type: SelectionActions.FETCH_VENUES
    }
}

export function fetchVenuesSuccess(data) {
    return {
        type: SelectionActions.FETCH_VENUES_SUCCESS,
        payload: data
    }
}

export function fetchVenuesFailure(data) {
    return {
        type: SelectionActions.FETCH_VENUES_FAILURE,
        payload: data
    }
}

export function fetchAvailabilities(data) {
    return {
        type: SelectionActions.FETCH_AVAILABILITIES,
        payload: data
    }
}

export function fetchAvailabilitiesSuccess(data) {
    return {
        type: SelectionActions.FETCH_AVAILABILITIES_SUCCESS,
        payload: data
    }
}

export function fetchAvailabilitiesFailure(data) {
    return {
        type: SelectionActions.FETCH_AVAILABILITIES_FAILURE,
        payload: data
    }
}

export function lockSelectedSeats() {
    return {
        type: SelectionActions.MODIFY_AVAILABILITIES,
        payload: 'locked'
    }
}

export function releaseSelectedSeats() {
    return {
        type: SelectionActions.MODIFY_AVAILABILITIES,
        payload: 'empty'
    }
}

export function bookSelectedSeats() {
    return {
        type: SelectionActions.MODIFY_AVAILABILITIES,
        payload: 'reserved'
    }
}

export function modifyAvailabilitesSuccess() {
    return {
        type: SelectionActions.MODIFY_AVAILABILITIES_SUCCESS,
        payload: 'reserved'
    }
}

export function modifyAvailabilitesFailure() {
    return {
        type: SelectionActions.MODIFY_AVAILABILITIES_FAILURE,
        payload: 'reserved'
    }
}