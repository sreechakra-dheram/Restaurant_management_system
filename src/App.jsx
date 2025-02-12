import React, { useState } from "react";
import SeatsInfo from "./components/seats_data";
import ReservationForm from "./components/booking_form";
import ReservationTable from "./components/checkout_table";
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
        setSeatsLeft((prevSeats) => prevSeats - guestCount);  // ✅ Reduce seats only on booking
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

        setConfirmationMessage(`Your booking is confirmed! Thank you, ${name}.`);
    };

    const handleDelete = (name) => {
        const reservation = reservations.find((res) => res.name === name);
        if (reservation) {
            setSeatsLeft((prevSeats) => prevSeats + reservation.guestCount); // ✅ Only restore seats if deleting before checkout
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
