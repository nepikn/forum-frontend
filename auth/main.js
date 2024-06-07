import User from "../src/api/user";
import { FragmentOf } from "../src/util/component";
import { addSubmitHandlerOf } from "../src/util/form";

const user = new User(render);
const authForm = document.querySelector("#auth");

await render();

async function render() {
  if ((await user.get("id")) != null) {
    window.location.replace("/");
  }

  const name = await user.get("name");
  const authState = await user.getAuthState();
  const content = FragmentOf({ userName: !!name });

  if (name) {
    addSubmitHandlerOf.call(content, "switch", user.logOut);

    content.querySelector("#name").value = name;
    content.querySelectorAll("[data-authState]").forEach((child) => {
      if (child.dataset.authstate != authState) {
        content.removeChild(child);
      }
    });
  }

  addSubmitHandlerOf(authForm, (form) =>
    !name
      ? user.setSessionName(form)
      : authState == "signUp"
        ? user.signUp(form)
        : user.signIn(form)
  );

  authForm.querySelector(".main").replaceChildren(content);
  authForm.querySelector("[autofocus]")?.focus();
}
