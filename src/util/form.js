export function addSubmitHandlerOf(formOrFormId, submitHandler) {
  (formOrFormId instanceof HTMLFormElement
    ? formOrFormId
    : (this ?? document).querySelector(`form#${formOrFormId}`)
  ).addEventListener("submit", async (e) => {
    e.preventDefault();

    const res = await submitHandler(e.target);
  });
}
