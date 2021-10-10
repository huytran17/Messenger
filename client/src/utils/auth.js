export const deleteAllStorage = () => {
  sessionStorage.removeItem("token");

  localStorage.removeItem("token");

  window.location.reload();
};
