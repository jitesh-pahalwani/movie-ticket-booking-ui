import { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

import './index.css';

import Header from '../Header';
import MovieTile from '../MovieTile'
import { fetchMovies } from './actions';
import { setSelectedMovie } from '../SeatSelection/actions';

function Home({ fetchMovies, allMovies, history, loading, apiError, setSelectedMovie }) {

    useEffect(() => {
        fetchMovies();
    }, []);

    const showMovieInfo = (selectedMovie) => {
        setSelectedMovie(selectedMovie);
        history.push('/movie-ticket-booking-ui/details');
    }

    const renderMovies = () => {
        return allMovies.map((movie) => <MovieTile key={movie._id} {...movie} onMovieClick={() => showMovieInfo(movie)} />);
    }

    return (
        <div>
            <Header />
            <div className="home-bodyTitle">Which movie would you like to see today?</div>
            {loading ? <div className="home-msg">Loading...</div> :
                apiError ? <div className="home-msg">An error occurred. Please try after some time.</div> :
                    <div className="home-tilesParent">
                        {renderMovies()}
                    </div>
            }
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        loading: state.homeReducer.loading,
        allMovies: state.homeReducer.allMovies,
        apiError: state.homeReducer.error,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchMovies: () => dispatch(fetchMovies()),
        setSelectedMovie: (data) => dispatch(setSelectedMovie(data)),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home))
