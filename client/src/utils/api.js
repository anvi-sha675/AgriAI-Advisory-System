export function getApiBaseUrl() {
  let url = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
  url = url.trim().replace(/\/+$/, "");
  if (!url.endsWith("/api")) {
    url += "/api";
  }
  return url;
}

const API_BASE = getApiBaseUrl();
const TOKEN_KEY = "agriai-token";

function getToken() {
  return window.localStorage.getItem(TOKEN_KEY);
}

export function normalizeIds(value) {
  if (Array.isArray(value)) return value.map(normalizeIds);
  if (value && typeof value === "object") {
    const out = {};
    for (const [k, v] of Object.entries(value)) out[k] = normalizeIds(v);
    if (out._id !== undefined && out.id === undefined) out.id = out._id;
    return out;
  }
  return value;
}

async function request(path, { method = "GET", body } = {}) {
  const token = getToken();
  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(data.message || `Request failed (${res.status})`);
    err.status = res.status;
    err.fieldErrors = data.errors; // zod validation errors, when present
    throw err;
  }
  return normalizeIds(data.data);
}

export const api = {
  get: (path) => request(path),
  post: (path, body) => request(path, { method: "POST", body }),
  patch: (path, body) => request(path, { method: "PATCH", body }),
  delete: (path) => request(path, { method: "DELETE" }),
};
