import React, { Suspense, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

import './index.css';

import Header from '../Header';
import Seat from '../Seat';
import { fetchAvailabilities, setSelectedSeats, lockSelectedSeats, releaseSelectedSeats, bookSelectedSeats } from './actions';

function SeatSelection({ allSeats, loading, apiError, fetchAvailabilities, setSelectedSeats, totalCost, bookSelectedSeats, lockSelectedSeats, releaseSelectedSeats, isBookingComplete }) {
    const [isModalOpen, openModal] = useState(false);
    const PaymentModal = React.lazy(() => import('../PaymentModal'));

    useEffect(() => {
        fetchAvailabilities();
    }, []);

    const onSeatClick = (seatNumber) => {
        setSelectedSeats(seatNumber);
    }

    const renderSeats = () => {
        return allSeats.map((seat) => <Seat key={seat.seat_number} {...seat} onSeatClick={() => onSeatClick(seat.seat_number)} />);
    }

    const onMakePaymentClick = () => {
        lockSelectedSeats();
        openModal(true);
    }

    const onPaymentModalClose = () => {
        releaseSelectedSeats();
        openModal(false);
    }

    const onPayClick = () => {
        bookSelectedSeats();
    }

    const buttonColor = {
        backgroundColor: totalCost > 0 ? "#006600" : "lightgray"
    }

    return (
        <div>
            {isModalOpen ?
                <Suspense fallback={<div className="seatSelection-msg">Loading...</div>}>
                    <PaymentModal
                        modalIsOpen={isModalOpen}
                        closeModal={onPaymentModalClose}
                        onPayClick={onPayClick}
                        amount={totalCost}
                        isLoading={loading}
                        apiError={apiError}
                        isBookingComplete={isBookingComplete} />
                </Suspense>
                : null}
            <Header />
            {loading ? <div className="seatSelection-msg">Loading...</div> :
                apiError ? <div className="seatSelection-msg">An error occurred. Please try after some time.</div> :
                    <div className="seatSelection-container">
                        <div className="seatSelection-screen">Screen this way!</div>
                        <div className="seatSelection-seatsParent">
                            {renderSeats()}
                        </div>
                        <div className="seatSelection-sampleSeats">
                            <div className="seatSelection-sampleSeatWrapper">
                                <Seat status="empty" /> Available
                            </div>
                            <div className="seatSelection-sampleSeatWrapper">
                                <Seat status="reserved" /> Unavailable
                            </div>
                            <div className="seatSelection-sampleSeatWrapper">
                                <Seat status="selected" /> Selected
                            </div>
                        </div>
                        <div className="seatSelection-cost">
                            Total Price: {totalCost}
                        </div>
                        <button style={buttonColor} onClick={onMakePaymentClick} disabled={totalCost === 0}>Make Payment</button>
                    </div>
            }
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        allSeats: state.selectionReducer.allSeats,
        selectedSeats: state.selectionReducer.selectedSeats,
        loading: state.selectionReducer.loading,
        apiError: state.selectionReducer.error,
        totalCost: state.selectionReducer.totalCost,
        isBookingComplete: state.selectionReducer.isBookingComplete
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAvailabilities: () => dispatch(fetchAvailabilities()),
        setSelectedSeats: (data) => dispatch(setSelectedSeats(data)),
        lockSelectedSeats: () => dispatch(lockSelectedSeats()),
        releaseSelectedSeats: () => dispatch(releaseSelectedSeats()),
        bookSelectedSeats: () => dispatch(bookSelectedSeats())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SeatSelection))
