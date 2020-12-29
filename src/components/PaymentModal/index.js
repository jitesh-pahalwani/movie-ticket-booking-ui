import { useEffect, useState } from 'react';
import Modal from 'react-modal';

import './index.css';

const PaymentModal = (props) => {
    const [cardNumber, setCardNumber] = useState("");
    const [secondsLeft, setSecondsLeft] = useState(60 * 3);
    const { modalIsOpen, closeModal, amount, isLoading, apiError, onPayClick, isBookingComplete } = props;

    var paymentTimeout;

    useEffect(() => {
        var secondsLeft = 180;
        paymentTimeout = setInterval(() => {
            secondsLeft--;
            setSecondsLeft(secondsLeft - 1);

            if (secondsLeft === 0) {
                onCancelButtonClick();
            }
        }, 1000);
    }, []);

    const onCardNumberInput = (e) => {
        setCardNumber(e.target.value);
    }

    const onCancelButtonClick = () => {
        clearInterval(paymentTimeout);
        closeModal();
    }

    const onPayButtonClick = () => {
        clearInterval(paymentTimeout);
        onPayClick();
    }

    const payButtonStyle = {
        backgroundColor: cardNumber.length === 16 ? "#006600" : "lightgray"
    }

    return (
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            className="Modal"
            overlayClassName="Overlay"
            ariaHideApp={false}
        >
            <div className="modal-contents">
                {!isBookingComplete ?
                    <h2>Complete your payment</h2>
                    : null}
                {!isBookingComplete ?
                    <div>Amount to be paid: {amount}</div>
                    : null}
                {isLoading ? <div className="seatSelection-msg">Loading...</div> :
                    apiError ? <div className="seatSelection-msg">An error occurred. Please try after some time.</div> :
                        isBookingComplete ? <div className="modal-successMsg">Booking done successfully</div> :
                            <><div>We will hold your seats for {secondsLeft} seconds, after which the seats will be released.</div>
                                <input placeholder="Enter card number" maxLength="16" size="16" onChange={onCardNumberInput} /></>}
                {!isBookingComplete ?
                    <button
                        style={payButtonStyle}
                        disabled={cardNumber.length !== 16 || isLoading}
                        onClick={onPayButtonClick}>
                        Pay
                    </button>
                    : null}
                {!isBookingComplete ?
                    <button
                        className="modal-cancelButton"
                        disabled={isLoading}
                        onClick={onCancelButtonClick}>
                        Cancel
                    </button>
                    : null}
            </div>

        </Modal>
    )
};

export default PaymentModal;