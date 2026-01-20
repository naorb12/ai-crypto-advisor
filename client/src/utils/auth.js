export function isLoggedIn() {
  return sessionStorage.getItem("token") !== null;
}
