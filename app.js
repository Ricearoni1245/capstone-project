document.getElementById('booking-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const date = document.getElementById('date').value;

    if (name && date) {
        alert(`Booking confirmed for ${name} on ${date}!`);
    } else {
        alert("Please fill in all the fields.");
    }
});
