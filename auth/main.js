import User from "../src/api/user";
import { Fragment } from "../src/util/component";
import { handleFormSubmit } from "../src/util/handler";

// const user = new User();
const name = await User.getName();

document.querySelector("fieldset").append(
  (() => {
    const mainContent = Fragment({ userName: !!name });

    if (!name) {
      handleFormSubmit("auth", User.setName);
    } else {
      handleFormSubmit("switch", User.delete, mainContent);

      mainContent.querySelector("#name").value = name;
    }

    return mainContent;
  })()
);

// console.log(JSON.stringify(await reqApi("/user")));
// console.log(document.cookie.includes("n9grgteapblsab3vuhaunhghfc"));
