import { displayMessage } from './bookingUtils';

beforeEach(() => {
    document.body.innerHTML = `
        <div>
            <div id="booking-form"></div>
        </div>
    `;
});

test('displayMessage should create a success message', () => {
    displayMessage('✅ Booking successful!', 'success');

    const messageBox = document.querySelector('.success');
    expect(messageBox).not.toBeNull();
    expect(messageBox.textContent).toBe('✅ Booking successful!');
});

test('displayMessage should create an error message', () => {
    displayMessage('❌ Booking failed.', 'error');

    const messageBox = document.querySelector('.error');
    expect(messageBox).not.toBeNull();
    expect(messageBox.textContent).toBe('❌ Booking failed.');
});
