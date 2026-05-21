const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api';

async function getJson(path) {
  const response = await fetch(`${API_BASE}${path}`);
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }
  return response.json();
}

export function fetchBooks() {
  return getJson('/books');
}

export function fetchProjects() {
  return getJson('/projects');
}

export function fetchHobbies() {
  return getJson('/hobbies');
}

export function fetchHobbyPhotos() {
  return getJson('/hobby-photos');
}

export function fetchWatching() {
  return getJson('/watching');
}
