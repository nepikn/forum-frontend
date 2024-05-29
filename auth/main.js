import User from "../src/api/user";
import { Fragment } from "../src/util/component";
import { handleFormSubmit } from "../src/util/handler";

// const user = new User();
const name = await User.get("name");

document.querySelector("fieldset").append(
  await (async () => {
    const mainContent = Fragment({ userName: !!name });

    if (!name) {
      handleFormSubmit("auth", User.setName);
      return mainContent;
    }

    const signInState = (await User.get("signInState", { name })).toString();

    handleFormSubmit("switch", User.delete, mainContent);

    mainContent.querySelector("#name").value = name;
    mainContent.querySelectorAll("[data-signInState]").forEach((child) => {
      if (child.dataset.signinstate != signInState) {
        mainContent.removeChild(child);
      }
      // debugger;
    });

    return mainContent;
  })()
);

// console.log(JSON.stringify(await reqApi("/user")));
// console.log(document.cookie.includes("n9grgteapblsab3vuhaunhghfc"));
