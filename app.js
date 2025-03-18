// Booking Form Logic
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
    displayBookings();  // Refresh the list dynamically

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

// Fetch and Display Booking Data
async function displayBookings() {
    const bookingList = document.getElementById('booking-list');
    bookingList.innerHTML = '';

    // Add local storage bookings
    const storedBookings = JSON.parse(localStorage.getItem('bookings')) || [];
    storedBookings.forEach(booking => {
        const listItem = document.createElement('li');
        listItem.textContent = `📝 ${booking.name} - ${booking.date}`;
        bookingList.appendChild(listItem);
    });

    // Fetch mock API data for dynamic entries
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const users = await response.json();

        users.forEach(user => {
            const listItem = document.createElement('li');
            listItem.textContent = `📅 ${user.name} - Sample Date: ${new Date().toISOString().split('T')[0]}`;
            bookingList.appendChild(listItem);
        });
    } catch (error) {
        displayMessage("❌ Failed to fetch booking data from the API.", 'error');
    }
}

// Load booking list when page loads
document.addEventListener('DOMContentLoaded', displayBookings);
