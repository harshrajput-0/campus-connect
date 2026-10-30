const eventSearch = document.getElementById("eventSearch");
const eventFilters = document.querySelectorAll(".events-filter");
const eventsEmpty = document.getElementById("eventsEmpty");
const eventsLoading = document.getElementById("eventsLoading");
const eventsError = document.getElementById("eventsError");
const eventsGrid = document.getElementById("eventsGrid");
const eventCount = document.getElementById("eventCount");

let allEvents = [];
let selectedEventCategory = "All";


function formatDate(isoDate) {
  if (!isoDate) return "Date to be announced";
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return "Date to be announced";
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function eventCardHTML(event) {
  const image = event.image || "./images/tech.jpg";

  return `
    <article class="event-card" data-category="${event.category}">
      <div class="event-image">
        <img src="${image}" alt="${event.name}" loading="lazy">
        <span class="event-category">${event.category}</span>
      </div>

      <div class="event-card-body">
        <div class="event-meta">
          <span>◷ ${formatDate(event.date)}${event.time ? " · " + event.time : ""}</span>
        </div>

        <h3>${event.name}</h3>
        <p class="event-description">${event.description}</p>

        <div class="event-details">
          <span>⌖ ${event.location}</span>
          <span>▦ ${event.category}</span>
        </div>

        <a href="register.html?eventId=${event._id}" class="event-register-button">
          Register Now <span aria-hidden="true">→</span>
        </a>
      </div>
    </article>
  `;
}

// RENDER EVENT CARDS 
function renderEvents() {
  const searchText = eventSearch.value.trim().toLowerCase();

  const visibleEvents = allEvents.filter((event) => {
    const matchesCategory =
      selectedEventCategory === "All" || event.category === selectedEventCategory;

    const searchableText = [event.name, event.description, event.category, event.location]
      .join(" ")
      .toLowerCase();

    const matchesSearch = searchableText.includes(searchText);

    return matchesCategory && matchesSearch;
  });

  eventsGrid.innerHTML = visibleEvents.map(eventCardHTML).join("");
  eventsGrid.hidden = visibleEvents.length === 0;
  eventsEmpty.hidden = visibleEvents.length > 0;

  eventCount.textContent = visibleEvents.length + (visibleEvents.length === 1 ? " event" : " events");
}

// LOAD EVENTS 
async function loadEvents() {
  eventsLoading.hidden = false;
  eventsError.hidden = true;
  eventsGrid.hidden = true;
  eventsEmpty.hidden = true;

  try {
    allEvents = await CampusConnectAPI.getEvents();
    eventsLoading.hidden = true;
    renderEvents();
  } catch (err) {
    console.error(err);
    eventsLoading.hidden = true;
    eventsError.hidden = false;
  }
}

eventFilters.forEach(function (button) {
  button.addEventListener("click", function () {
    selectedEventCategory = button.dataset.category;

    eventFilters.forEach(function (filterButton) {
      filterButton.classList.remove("active");
    });

    button.classList.add("active");
    renderEvents();
  });
});

eventSearch.addEventListener("input", renderEvents);

loadEvents();
