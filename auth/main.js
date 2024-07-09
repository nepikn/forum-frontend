import User from "../src/api/user";
import { FragmentOf } from "../src/util/component";
import { addSubmitHandlerOf } from "../src/util/form";
import "../src/index.css";

const user = new User(render);
const authForm = document.querySelector("#auth");

(async () => await render())();

async function render() {
  if ((await user.get("id")) != null) {
    window.location.replace("/");
    return;
  }

  const name = await user.get("name");
  const authState = await user.getAuthState();
  const content = FragmentOf({ userName: !!name });

  if (name) {
    content.querySelector("[name=name]").value = name;
    content.querySelector("#name").textContent = name;
    content.querySelector("[data-authState]").textContent = (() => {
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

    addSubmitHandlerOf.call(content, "switch", user.logOut);
    addSubmitHandlerOf(authForm, (form) =>
      authState == "signUp" ? user.signUp(form) : user.signIn(form)
    );
  } else {
    addSubmitHandlerOf(authForm, (form) => user.setSessionName(form));
  }

  authForm.querySelector(".temp-userName").replaceChildren(content);
  authForm.querySelector("[autofocus]")?.focus();
}
