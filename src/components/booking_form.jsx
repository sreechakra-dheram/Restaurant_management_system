import React, { useState } from "react";

const ReservationForm = ({ onReserve }) => {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [guestCount, setGuestCount] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !phone || !guestCount) {
            alert("Please fill all the fields!");
            return;
        }
        onReserve(name, phone, parseInt(guestCount, 10));
        setName("");
        setPhone("");
        setGuestCount("");
    };

    return (
        <form onSubmit={handleSubmit} className="reservation-form">
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <input type="text" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
            <input type="number" placeholder="Guests" value={guestCount} onChange={(e) => setGuestCount(e.target.value)} />
            <button type="submit">Reserve</button>
        </form>
    );
};

export default ReservationForm;
