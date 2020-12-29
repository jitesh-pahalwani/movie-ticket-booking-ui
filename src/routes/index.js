import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from '../components/Home';
import MovieDetail from '../components/MovieDetail';
import SeatSelection from '../components/SeatSelection';

export const Routes = () => (
    <Router>
        <Route exact path='/'>
            <Home />
        </Route>
        <Route exact path='/details'>
            <MovieDetail />
        </Route>
        <Route exact path='/seats'>
            <SeatSelection />
        </Route>
    </Router>
)