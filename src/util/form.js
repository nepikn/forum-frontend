export function handleSubmitOf(formOrFormId, submitHandler) {
  (formOrFormId instanceof HTMLFormElement
    ? formOrFormId
    : (this ?? document).querySelector(`form#${formOrFormId}`)
  ).onsubmit = async (e) => {
    e.preventDefault();

    const res = await submitHandler(e.target);
  };
}
