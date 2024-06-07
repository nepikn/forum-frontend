import { FragmentOf } from "../util/component";
import { addSubmitHandlerOf } from "../util/form";

export default async function Nav({ state: { userName }, handler: { user } }) {
  const nav = FragmentOf("#nav");

  nav.querySelector(".userName").textContent = userName;
  if (userName === null) {
    nav.querySelector("[data-user=true]").remove();
  } else {
    nav.querySelector("[data-user=false]").remove();
    nav.querySelector(".logout").onclick = user.logOut;
    addSubmitHandlerOf.call(nav, "editName", (form) =>
      user.set({ name: form })
    );
  }

  return nav;
}
