import User from "../src/api/user";
import { Fragment } from "../src/util/component";
import { addSubmitHandler } from "../src/util/form";

const user = new User(render);
const authForm = document.querySelector("#auth");

await render();

async function render() {
  if ((await user.get("id")) != null) {
    window.location.replace("/");
  }

  const name = await user.get("name");
  const authState = await user.getAuthState();
  const content = Fragment({ userName: !!name });

  if (name) {
    addSubmitHandler.call(content, "switch", user.logOut);

    content.querySelector("#name").value = name;
    content.querySelectorAll("[data-authState]").forEach((child) => {
      if (child.dataset.authstate != authState) {
        content.removeChild(child);
      }
    });
  }

  addSubmitHandler(
    authForm,
    !name
      ? (form) => user.set("name", form)
      : (form) => {
          const passwd = form.elements.namedItem("passwd").value;

          return authState == "signUp"
            ? user.signUp(passwd)
            : user.signIn(passwd);
        }
  );

  authForm.querySelector(".main").replaceChildren(content);
  authForm.querySelector("[autofocus]")?.focus();
}
