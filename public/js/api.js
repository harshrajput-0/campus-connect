const API_BASE = "/api";

// SEND REQUEST 
async function apiRequest(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  let data = null;
  try {
    data = await res.json();
  } catch (error) {
    console.log(error.message)
  }

  if (!res.ok) {
    const message = (data && data.message) || "Something went wrong. Please try again.";
    throw new Error(message);
  }

  return data;
}

const CampusConnectAPI = {
  getEvents(category) {
    const query = category && category !== "All" ? `?category=${encodeURIComponent(category)}` : "";
    return apiRequest(`/events${query}`);
  },

  getEventById(id) {
    return apiRequest(`/events/${encodeURIComponent(id)}`);
  },

  register(payload) {
    return apiRequest(`/registrations`, {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  getRegistrationsByEmail(email) {
    return apiRequest(`/registrations?email=${encodeURIComponent(email)}`);
  },
};