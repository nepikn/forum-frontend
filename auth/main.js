import User from "../src/api/user";
import { getDeepCloned } from "../src/util/component";
import { handleFormSubmit } from "../src/util/handler";
import { reqApi } from "../src/util/req";

// const user = new User();
const name = await User.getName();
const content = getDeepCloned("userName", !!name);

if (!name) {
  const form = document.querySelector("form#auth");

  form.addEventListener(
    "submit",
    handleFormSubmit.bind(form, User.setName)
    // (e) => handleFormSubmit(form, User.setName, e)
    // (e) => {
    //   handleFormSubmit(() => User.setName(this), e);
    // }
  );
} else {
  content
    .querySelector("form#userSwitch")
    .addEventListener("submit", handleFormSubmit.bind(undefined, User.delete));
  content.querySelector("#name").value = name;
}

document.querySelector("fieldset").append(content);
// console.log(JSON.stringify(await reqApi("/user")));
// console.log(document.cookie.includes("n9grgteapblsab3vuhaunhghfc"));
