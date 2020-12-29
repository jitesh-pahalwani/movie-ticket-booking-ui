import SelectionActions from './actions.types';

const initialState = {
    loading: true,
    error: false,
    allSeats: [],
    allVenues: [],
    selectedMovie: {},
    selectedVenue: "",
    selectedSeats: [],
    totalCost: 0,
    isBookingComplete: false
};

export default function selectionReducer(state = initialState, action) {
    switch (action.type) {
        case SelectionActions.SET_SELECTED_MOVIE:
            return {
                ...state,
                selectedMovie: action.payload
            }
        case SelectionActions.SET_SELECTED_VENUE:
            return {
                ...state,
                selectedVenue: action.payload
            }
        case SelectionActions.SET_SELECTED_SEATS:
            const { selectedSeats, allSeats } = state;
            const newSeatsArray = state.selectedSeats;
            if (newSeatsArray.includes(action.payload)) {
                newSeatsArray.splice(newSeatsArray.indexOf(action.payload), 1);
            } else {
                newSeatsArray.push(action.payload);
            }
            const newCost = selectedSeats.length * allSeats[0].cost;

            return {
                ...state,
                selectedSeats: newSeatsArray,
                totalCost: newCost
            }
        case SelectionActions.FETCH_VENUES:
            return {
                ...state,
                loading: true
            }
        case SelectionActions.FETCH_VENUES_SUCCESS:
            return {
                ...state,
                loading: false,
                allVenues: action.payload
            }
        case SelectionActions.FETCH_VENUES_FAILURE:
            return {
                ...state,
                loading: false,
                error: true
            }
        case SelectionActions.FETCH_AVAILABILITIES:
            return {
                ...state,
                loading: true
            }
        case SelectionActions.FETCH_AVAILABILITIES_SUCCESS:
            return {
                ...state,
                loading: false,
                allSeats: action.payload
            }
        case SelectionActions.FETCH_AVAILABILITIES_FAILURE:
            return {
                ...state,
                loading: false,
                error: true
            }
        case SelectionActions.MODIFY_AVAILABILITIES:
            return {
                ...state,
                loading: true
            }
        case SelectionActions.MODIFY_AVAILABILITIES_SUCCESS:
            return {
                ...state,
                loading: false,
                isBookingComplete: action.payload.seatStatus === 'reserved',
                totalCost: action.payload.seatStatus === 'empty' ? 0 : state.totalCost,
                selectedSeats: action.payload.seatStatus === 'empty' ? [] : state.selectedSeats,
            }
        case SelectionActions.MODIFY_AVAILABILITIES_FAILURE:
            return {
                ...state,
                loading: false,
                error: true
            }
        default:
            return initialState
    }
}