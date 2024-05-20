import { getDeepCloned } from "../util/component";
import { reqApi } from "../util/req";

/**
 * @param {HTMLTemplateElement} template
 */
export default async function Nav() {
  const nav = getDeepCloned(".nav");
  const userName = await reqApi("/user/name", { credentials: "include" });

  nav.querySelector(".userName").textContent = userName;
  if (userName === null) {
    nav.querySelector("[data-user=true]").remove();
  } else {
    nav.querySelector("[data-user=false]").remove();
    nav.querySelector(".logOut").onclick = (e) => {
      reqApi("/user/session", { method: "DELETE" });
    };
    nav.querySelector(".editName").onSubmit = (e) => {
      e.preventDefault();

      reqApi("/user/name", { method: "PUT" });
    };
  }

  return nav;
}
