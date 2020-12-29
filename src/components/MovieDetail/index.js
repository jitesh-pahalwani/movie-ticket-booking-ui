import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

import './index.css';

import Header from '../Header';
import { fetchVenues, setSelectedVenue } from '../SeatSelection/actions';

function MovieDetail({ selectedMovie, loading, apiError, fetchVenues, selectedVenue, allVenues, history, setSelectedVenue }) {
    const [currentVenue, setVenue] = useState(selectedVenue);

    useEffect(() => {
        fetchVenues();
    }, []);

    const imgStyle = {
        backgroundImage: `url(${selectedMovie.poster})`
    }

    const returnVenueStyle = (venue) => {
        return {
            backgroundColor: venue === currentVenue ? '#2E3147' : 'white',
            color: venue === currentVenue ? 'white' : 'black',
            border: venue === currentVenue ? 'none' : '1px solid #2E3147',
        }
    }

    const onVenueSelection = (venue) => {
        setVenue(venue);
        setSelectedVenue(venue);
    }

    const renderVenues = () => {
        return allVenues.map((venue) => <button key={venue} style={returnVenueStyle(venue)} onClick={() => onVenueSelection(venue)}>{venue}</button>);
    }

    const onBookSeatClick = () => {
        history.push('/movie-ticket-booking-ui/seats');
    }

    const buttonColor = {
        backgroundColor: currentVenue === "" ? "lightgray" : "#006600"
    }

    return (
        <div>
            <Header />
            {loading ? <div className="home-msg">Loading...</div> :
                apiError ? <div className="home-msg">An error occurred. Please try after some time.</div> :
                    <div>
                        <div className="details-tileContainer">
                            <div className="details-tileContent" style={imgStyle} />
                            <div className="details-rightDiv">
                                <div className="details-title">{selectedMovie.title}</div>
                                <div className="details-description">{selectedMovie.actors}</div>
                                <div className="details-description">{selectedMovie.rated}</div>
                                <div className="details-description">{selectedMovie.runtime}</div>
                                <div className="details-description">{selectedMovie.plot}</div>
                            </div>
                        </div>
                        <div className="details-selectVenueContainer">
                            <div className="details-selectVenue">Select a movie hall</div>
                            <div className="details-venuesWrapper">
                                {renderVenues()}
                            </div>
                            <button style={buttonColor} onClick={onBookSeatClick}>Book Seats</button>
                        </div>

                    </div>
            }
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        loading: state.selectionReducer.loading,
        allMovies: state.selectionReducer.allMovies,
        apiError: state.selectionReducer.error,
        selectedMovie: state.selectionReducer.selectedMovie,
        selectedVenue: state.selectionReducer.selectedVenue,
        allVenues: state.selectionReducer.allVenues
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchVenues: () => dispatch(fetchVenues()),
        setSelectedVenue: (data) => dispatch(setSelectedVenue(data))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MovieDetail))
