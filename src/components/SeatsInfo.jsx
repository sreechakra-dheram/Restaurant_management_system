import React from "react";

const SeatsInfo = ({ seatsLeft, totalSeats }) => {
    return (
        <div className="seats-info">
            <h2>Seats Left: {seatsLeft} / {totalSeats}</h2>
        </div>
    );
};

export default SeatsInfo;
