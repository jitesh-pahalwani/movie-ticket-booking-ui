import { useState } from 'react';
import './index.css';

const seatColors = {
    empty: "white",
    selected: "#006600",
    reserved: "lightgray",
    locked: "lightgray"
}

const Seat = (props) => {
    const [seatStatus, setStatus] = useState(props.status);

    const seatStyle = {
        backgroundColor: seatColors[seatStatus]
    };

    const onSeatSelection = () => {
        props.onSeatClick();
        if (seatStatus === "empty") {
            setStatus("selected");
        } else if (seatStatus === "selected") {
            setStatus("empty");
        }
    }

    return (
        <div className="seat" style={seatStyle} onClick={onSeatSelection} />
    )
};

export default Seat;