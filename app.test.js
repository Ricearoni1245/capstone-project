import { saveBooking } from './app.js';

test('saves a booking in local storage', () => {
    const mockBooking = { name: 'John Doe', date: '2024-04-15' };
    saveBooking(mockBooking);

    const savedBookings = JSON.parse(localStorage.getItem('bookings'));
    expect(savedBookings).toContainEqual(mockBooking);
});
