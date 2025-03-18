// Save Booking
export function saveBooking(booking) {
    const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
    bookings.push(booking);
    localStorage.setItem('bookings', JSON.stringify(bookings));
}

// Display Message
export function displayMessage(message, type) {
    const messageBox = document.createElement('div');
    messageBox.textContent = message;
    messageBox.className = type === 'success' ? 'success' : 'error';

    document.body.insertBefore(messageBox, document.getElementById('booking-form').parentElement);

    setTimeout(() => {
        messageBox.remove();
    }, 3000);
}
