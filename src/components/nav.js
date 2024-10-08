import { FragmentOf } from "../util/component";
import { handleSubmitOf } from "../util/form";

export default async function Nav({
  state: { userName },
  handler: { user },
}) {
  const nav = FragmentOf("#nav");

  nav.querySelector(".userName").textContent = userName;
  if (userName == null) {
    nav.querySelector("[data-user=true]").remove();
    nav.querySelector("#auth").href = "/auth/";
  } else {
    nav.querySelector("[data-user=false]").remove();
    nav.querySelector(".logout").onclick = user.logOut;
    handleSubmitOf.call(nav, "editName", (form) =>
      user.set({ name: form }),
    );
  }

  return nav;
}
