import User from "../api/user";

export function handleFormSubmit(formId, submitHandler, formRoot = document) {
  formRoot
    .querySelector(`form#${formId}`)
    .addEventListener("submit", async (e) => {
      e.preventDefault();

      const res = await submitHandler(e.target);
      // debugger;

      window.location.reload();
    });
}
