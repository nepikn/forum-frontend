import { getTemplate } from "../util/component";
import { reqApiJson } from "../util/req";

/**
 * @param {HTMLTemplateElement} template
 */
export default async function Nav() {
  const nav = getTemplate(".nav").content.cloneNode(true);
  const userName = await reqApiJson("/user/name", { credentials: "include" });

  nav.querySelector(".userName").innerText = userName;
  if (userName === null) {
    nav.querySelector("[data-user=true]").remove();
  } else {
    nav.querySelector("[data-user=false]").remove();
    nav.querySelector(".logOut").onclick = (e) => {
      reqApiJson("/user/session", { method: "DELETE" });
    };
    nav.querySelector(".editName").onSubmit = (e) => {
      e.preventDefault();

      reqApiJson("/user/name", { method: "PUT" });
    };
  }

  return nav;
}
