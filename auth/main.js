import User from "../src/api/user";
import { Fragment } from "../src/util/component";
import { handleFormSubmit } from "../src/util/handler";

const user = new User(render);
const userId = await user.get("id");
const authForm = document.querySelector("#auth");

if (userId != null) {
  window.location.replace("/");
}

await render();

async function render() {
  const name = await user.get("name");
  const authState = await user.get("authState");
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
      : () => {
          const passwd = authForm.elements.namedItem("passwd").value;

          return authState == "signUp"
            ? user.add({ passwd })
            : user.set(null, null, { passwd });
        }
  );
}
