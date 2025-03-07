export function setToLocalStorage(field, value) {
  localStorage.setItem(field, JSON.stringify(value));
}

export function getFromLocalStorage(field) {
  return JSON.parse(localStorage.getItem(field));
}
