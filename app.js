// Ensure the DOM is fully loaded before executing the code
document.addEventListener('DOMContentLoaded', function () {
    const bookingForm = document.getElementById('booking-form');

    if (bookingForm) {
        bookingForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const name = document.getElementById('name').value.trim();
            const date = document.getElementById('date').value;

            if (!name || !date) {
                displayMessage('❌ Please fill out all fields.', 'error');
                return;
            }

            const booking = { name, date };
            saveBooking(booking);

            displayMessage(`✅ Booking confirmed for ${name} on ${date}!`, 'success');
        });
    } else {
        console.warn('⚠️ Booking form not found in the DOM');
    }
});

// Save Booking Function
export function saveBooking(booking) {
    const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
    bookings.push(booking);
    localStorage.setItem('bookings', JSON.stringify(bookings));
}

// Display Message Function
export function displayMessage(message, type) {
    const messageBox = document.createElement('div');
    messageBox.textContent = message;
    messageBox.className = type === 'success' ? 'success' : 'error';

    const messagesContainer = document.getElementById('messages') || document.body;
    messagesContainer.appendChild(messageBox);

    setTimeout(() => {
        messageBox.remove();
    }, 3000);
}

export function displayBookings() {
    const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
    const bookingRecords = document.getElementById('booking-records');

    bookingRecords.innerHTML = ''; // Clear existing records

    bookings.forEach(booking => {
        const li = document.createElement('li');
        li.textContent = `${booking.name} - ${booking.date}`;
        bookingRecords.appendChild(li);
    });
}

// Initialize booking list display on page load
document.addEventListener('DOMContentLoaded', displayBookings);
