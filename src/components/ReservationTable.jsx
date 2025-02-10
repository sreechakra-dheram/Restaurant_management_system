import React from "react";

const ReservationTable = ({ reservations, onCheckout, onDelete }) => {
    return (
        <table className="reservation-table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Guests</th>
                    <th>Check-in Time</th>
                    <th>Checkout</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {reservations.map((res, index) => (
                    <tr key={index}>
                        <td>{res.name}</td>
                        <td>{res.phone}</td>
                        <td>{res.guestCount}</td>
                        <td>{res.checkinTime}</td>
                        <td>
                            {!res.checkoutTime ? (
                                <button onClick={() => onCheckout(res.name)}>Click to Checkout</button>
                            ) : (
                                `Checked out at ${res.checkoutTime}`
                            )}
                        </td>
                        <td>
                            <button className="delete-btn" onClick={() => onDelete(res.name)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ReservationTable;
