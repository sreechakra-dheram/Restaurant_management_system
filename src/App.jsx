import React, { useState } from "react";
import SeatsInfo from "./components/SeatsInfo";
import ReservationForm from "./components/ReservationForm";
import ReservationTable from "./components/ReservationTable";
import "./App.css";

const App = () => {
    const totalSeats = 20;
    const [seatsLeft, setSeatsLeft] = useState(totalSeats);
    const [reservations, setReservations] = useState([]);
    const [confirmationMessage, setConfirmationMessage] = useState("");

    const handleReservation = (name, phone, guestCount) => {
        if (guestCount > seatsLeft) {
            alert("Not enough seats available!");
            return;
        }

        if (reservations.some((res) => res.name === name)) {
            alert("This name already has a reservation!");
            return;
        }

        const newReservation = {
            name,
            phone,
            guestCount,
            checkinTime: new Date().toLocaleTimeString(),
            checkoutTime: null,
        };

        setReservations([...reservations, newReservation]);
        setSeatsLeft(seatsLeft - guestCount);
        setConfirmationMessage("");
    };

    const handleCheckout = (name) => {
        setReservations((prevReservations) =>
            prevReservations.map((res) =>
                res.name === name && !res.checkoutTime
                    ? { ...res, checkoutTime: new Date().toLocaleTimeString() }
                    : res
            )
        );

        const reservation = reservations.find((res) => res.name === name);
        if (reservation && !reservation.checkoutTime) {
            setSeatsLeft((prevSeats) => prevSeats + reservation.guestCount);
        }

        setConfirmationMessage(`Your booking is confirmed! Thank you, ${name}.`);
    };

    const handleDelete = (name) => {
        const reservation = reservations.find((res) => res.name === name);
        if (reservation && !reservation.checkoutTime) {
            setSeatsLeft(seatsLeft + reservation.guestCount);
        }
        setReservations(reservations.filter((res) => res.name !== name));
    };

    return (
        <div className="container">
            <h1>Restaurant Reservation System</h1>
            <SeatsInfo seatsLeft={seatsLeft} totalSeats={totalSeats} />
            <ReservationForm onReserve={handleReservation} />
            {confirmationMessage && <p className="confirmation">{confirmationMessage}</p>}
            <ReservationTable reservations={reservations} onCheckout={handleCheckout} onDelete={handleDelete} />
        </div>
    );
};

export default App;
