const registrationForm = document.getElementById("registrationForm");
const eventSelect = document.getElementById("eventId");
const formMessage = document.getElementById("formMessage");
const submitButton = document.getElementById("submitButton");

const EMAILREGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONEREGEX = /^[6-9]\d{9}$/;

// To show message on form 
function showMessage(text, type) {
    formMessage.textContent = text;
    formMessage.className = `form-message ${type}`;
    formMessage.hidden = false;
}

// Fucntion to create Options inside Select element
async function loadEventOptions() {
    const params = new URLSearchParams(window.location.search);
    const preselectedEventId = params.get("eventId") || "";

    try {
        const events = await CampusConnectAPI.getEvents();

        if (events.length === 0) {
            eventSelect.innerHTML = `<option value="">-- No events available right now --</option>`;
            return;
        }

        eventSelect.innerHTML =
            `<option value="">-- Choose an Event --</option>` +
            events
                .map((event) => `<option value="${event._id}">${event.name} (${event.category})</option>`)
                .join("");

        if (preselectedEventId) {
            eventSelect.value = preselectedEventId;
        }
    } catch (err) {
        console.error(err);
        eventSelect.innerHTML = `<option value="">-- Could not load events --</option>`;
    }
}

// EVENT HANDLER FOR SUBMITTING FORM
registrationForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    formMessage.hidden = true;

    // Getting value 
    const studentName = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const eventId = eventSelect.value;

    // Validating Fields
    if (studentName.length < 5) {
        showMessage("Student name must be at least 5 characters.", "error");
        return;
    }

    if (!EMAILREGEX.test(email)) {
        showMessage("Please enter a valid email address.", "error");
        return;
    }

    if (!PHONEREGEX.test(phone)) {
        showMessage("Please enter a valid 10 digit phone number.", "error");
        return;
    }

    if (!eventId) {
        showMessage("Please select an event.", "error");
        return;
    }

    submitButton.disabled = true;
    submitButton.textContent = "Submitting...";

    // Calling Backend API
    try {
        await CampusConnectAPI.register({ studentName, email, phone, eventId });
        showMessage("You're registered! Check your dashboard to see your events.", "success");
        registrationForm.reset();
        loadEventOptions();
    } catch (err) {
        showMessage(err.message, "error");
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = "Submit Registration";
    }
});

loadEventOptions();