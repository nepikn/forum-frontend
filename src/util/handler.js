import User from "../api/user";

export function handleFormSubmit(
  formOrFormId,
  submitHandler,
  formRoot = document
) {
  (formOrFormId instanceof HTMLFormElement
    ? formOrFormId
    : formRoot.querySelector(`form#${formOrFormId}`)
  ).addEventListener("submit", async (e) => {
    e.preventDefault();

    const res = await submitHandler(e.target);
    // debugger;

    window.location.reload();
  });
}
