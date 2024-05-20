import User from "../api/user";

export async function handleFormSubmit(cb, e) {
  e.preventDefault();

  const res = await cb(this);
  // debugger;
  window.location.reload();
}
