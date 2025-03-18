import { saveBooking, displayMessage } from './app.js';

beforeEach(() => {
    // Mock the required HTML structure for Jest tests
    document.body.innerHTML = `
        <div>
            <form id="booking-form">
                <input id="name" />
                <input id="date" type="date" />
                <button type="submit">Submit</button>
            </form>
            <div id="messages"></div>
        </div>
    `;
});

// Test booking form submission with valid data
test('Booking form should submit correctly with valid data', () => {
    const form = document.getElementById('booking-form');
    const nameInput = document.getElementById('name');
    const dateInput = document.getElementById('date');

    nameInput.value = 'John Doe';
    dateInput.value = '2024-04-20';

    form.dispatchEvent(new Event('submit'));

    expect(document.querySelector('.success').textContent)
        .toBe('✅ Booking confirmed for John Doe on 2024-04-20!');
});

// Test booking form with empty fields
test('Booking form should show error for empty fields', () => {
    const form = document.getElementById('booking-form');

    form.dispatchEvent(new Event('submit'));

    expect(document.querySelector('.error').textContent)
        .toBe('❌ Please fill out all fields.');
});

// Test saveBooking functionality
beforeEach(() => {
    global.localStorage = {
        getItem: jest.fn(() => '[]'),
        setItem: jest.fn()
    };
});

test('saveBooking should correctly save data to localStorage', () => {
    const mockBooking = { name: 'Alice Doe', date: '2024-05-01' };

    saveBooking(mockBooking);

    expect(localStorage.setItem).toHaveBeenCalledWith(
        'bookings',
        JSON.stringify([mockBooking])
    );
});

// Test displayMessage functionality
test('displayMessage should correctly show success messages', () => {
    displayMessage('✅ Booking successful!', 'success');

    const messageBox = document.querySelector('.success');
    expect(messageBox).not.toBeNull();
    expect(messageBox.textContent).toBe('✅ Booking successful!');
});

test('displayMessage should correctly show error messages', () => {
    displayMessage('❌ Booking failed.', 'error');

    const messageBox = document.querySelector('.error');
    expect(messageBox).not.toBeNull();
    expect(messageBox.textContent).toBe('❌ Booking failed.');
});
