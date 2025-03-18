// Booking Form Logic
document.getElementById('booking-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const date = document.getElementById('date').value;

    if (name && date) {
        const booking = {
            name: name,
            date: date
        };

        // Save booking in local storage
        saveBooking(booking);

        // Display confirmation message
        displayMessage(`✅ Booking confirmed for ${name} on ${date}!`, 'success');

        // Clear form fields
        document.getElementById('booking-form').reset();
    } else {
        displayMessage("❌ Please fill in all fields.", 'error');
    }
});

// Save booking data in Local Storage
function saveBooking(booking) {
    const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
    bookings.push(booking);
    localStorage.setItem('bookings', JSON.stringify(bookings));
}

// Display confirmation or error messages
function displayMessage(message, type) {
    const messageBox = document.createElement('div');
    messageBox.textContent = message;
    messageBox.className = type === 'success' ? 'success' : 'error';

    document.body.insertBefore(messageBox, document.getElementById('booking-form').parentElement);

    setTimeout(() => {
        messageBox.remove();
    }, 3000);
}
