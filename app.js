document.getElementById('booking-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const date = document.getElementById('date').value;

    if (!name) {
        displayMessage("❌ Please enter your name.", 'error');
        return;
    }

    if (!date) {
        displayMessage("❌ Please select a date.", 'error');
        return;
    }

    const booking = { name, date };
    saveBooking(booking);

    displayMessage(`✅ Booking confirmed for ${name} on ${date}!`, 'success');

    document.getElementById('booking-form').reset();
});

// Save data in Local Storage
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
