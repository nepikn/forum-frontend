import User from "../src/api/user";
import { Fragment } from "../src/util/component";
import { handleFormSubmit } from "../src/util/handler";

// const user = new User();
const authForm = document.querySelector("#auth");
const name = await User.get("name");
const signInState = (await User.get("signInState", { name })).toString();

authForm.querySelector(".main").append(
  await (async () => {
    const content = Fragment({ userName: !!name });

    if (!name) {
      handleFormSubmit("auth", User.setName);
      return content;
    }

    handleFormSubmit("switch", User.delete, content);

    content.querySelector("#name").value = name;
    content.querySelectorAll("[data-signInState]").forEach((child) => {
      if (child.dataset.signinstate != signInState) {
        content.removeChild(child);
      }
      // debugger;
    });

    return content;
  })()
);
handleFormSubmit(authForm, signInState == "false" ? User.add : User.set);
