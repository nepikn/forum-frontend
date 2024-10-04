import User from "../src/api/user";
import "../src/index.css";
import { FragmentOf } from "../src/util/component";
import { handleSubmitOf } from "../src/util/form";

const user = new User(render);
const authForm = document.querySelector("#auth");

(async () => await render())();

async function render() {
  const { id, name } = await user.get();

  if (id != null) {
    window.location.replace("/");
    return;
  }

  const content = FragmentOf({ userName: !!name });

  if (name) {
    const authState = await user.getAuthState();

    content.querySelector("[name=name]").value = name;
    content.querySelector("#name").textContent = name;
    content.querySelector("[data-authState]").textContent =
      (() => {
        switch (authState) {
          case "signUp":
            return "Please create your password";
          case "signIn":
            return "Signing in ... Please enter your password";
          case "err":
            return "Wrong password ... Please retry";
          default:
            throw new Error("");
        }
      })();

    handleSubmitOf.call(content, "switch", user.logOut);
    handleSubmitOf(authForm, (form) =>
      authState == "signUp"
        ? user.signUp(form)
        : user.signIn(form),
    );
  } else {
    handleSubmitOf(authForm, (form) => user.setSessionName(form));
  }

  authForm
    .querySelector(".temp-userName")
    .replaceChildren(content);
  authForm.querySelector("[autofocus]")?.focus();
}
