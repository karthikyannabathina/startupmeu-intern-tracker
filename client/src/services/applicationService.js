const API_URL = import.meta.env.VITE_API_URL || "";
const BASE = `${API_URL}/api/applications`;

// One shared helper: fetch, parse JSON, unwrap the { success, data, errors } envelope
async function request(url, options = {}) {
  const res = await fetch(url, options);

  let body;
  try {
    body = await res.json();
  } catch {
    throw new Error("Unexpected response from server");
  }

  if (!body.success) {
    const details =
      Array.isArray(body.errors) && body.errors.length
        ? body.errors.map((e) => e.message).join(" ")
        : "";
    throw new Error(details || body.message || "Request failed");
  }

  return body.data;
}

const jsonRequest = (method, data) => ({
  method,
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(data),
});

export function getApplications(search = "", status = "") {
  const params = new URLSearchParams();
  if (search.trim()) params.set("search", search.trim());
  if (status) params.set("status", status);
  const query = params.toString();
  return request(query ? `${BASE}?${query}` : BASE);
}

export const getStats = () => request(`${BASE}/stats`);
export const createApplication = (data) =>
  request(BASE, jsonRequest("POST", data));
export const updateApplication = (id, data) =>
  request(`${BASE}/${id}`, jsonRequest("PUT", data));
export const deleteApplication = (id) =>
  request(`${BASE}/${id}`, { method: "DELETE" });
