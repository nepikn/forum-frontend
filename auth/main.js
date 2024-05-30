import User from "../src/api/user";
import { Fragment } from "../src/util/component";
import { handleFormSubmit } from "../src/util/handler";

const authForm = document.querySelector("#auth");
const user = new User(render);

await render();

async function render() {
  const name = await user.get("name");
  const authState = await user.get("authState", { name });
  const content = Fragment({ userName: !!name });

  if (name) {
    handleFormSubmit("switch", user.delete, content);

    content.querySelector("#name").value = name;
    content.querySelectorAll("[data-authState]").forEach((child) => {
      if (child.dataset.authstate != authState) {
        content.removeChild(child);
      }
    });
  }
  // debugger;

  authForm.querySelector(".main").replaceChildren(content);
  authForm.querySelector("[autofocus]")?.focus();
  handleFormSubmit(
    authForm,
    !name
      ? () => user.set("name", authForm)
      : authState == "false"
        ? user.add
        : user.set
  );
}
