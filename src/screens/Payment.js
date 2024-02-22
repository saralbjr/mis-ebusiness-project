// PaymentGatewayPage.js
import React from 'react';
import { useHistory } from 'react-router-dom';

const PaymentGatewayPage = ({ orderedItems, totalAmount }) => {
    const history = useHistory();

    const handlePayment = (e) => {
        e.preventDefault();
        // Mock payment validation
        const paymentAmount = parseFloat(e.target.amount.value);
        if (paymentAmount === totalAmount) {
            // Payment successful
            alert('Payment Successful');
            history.push('/success');
        } else {
            // Payment failed
            alert('Payment Failed: Amount mismatch');
        }
    };

    return (
        <div>
            <h2>Payment Gateway</h2>
            <div>
                <h3>Ordered Items:</h3>
                <ul>
                    {orderedItems.map((item, index) => (
                        <li key={index}>{item.name} - Qty: {item.qty} - Size: {item.size} - Price: Rs.{item.price}</li>
                    ))}
                </ul>
                <h3>Total Amount: Rs.{totalAmount}</h3>
            </div>
            <form onSubmit={handlePayment}>
                <label htmlFor="amount">Enter Payment Amount:</label>
                <input type="number" id="amount" name="amount" required />
                <button type="submit">Make Payment</button>
            </form>
        </div>
    );
};

export default PaymentGatewayPage;
