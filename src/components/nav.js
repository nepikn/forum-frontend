import { getTemplate } from "../util/component";
import { fetchApiJson } from "../util/fetch";

/**
 * @param {HTMLTemplateElement} template
 */
export default async function Nav() {
  const nav = getTemplate(".nav").content.cloneNode(true);
  const userName = await fetchApiJson("/user/name", "GET");

  if (userName === null) {
    nav.querySelector("[data-user=true]").remove();
  } else {
    nav.querySelector("[data-user=false]").remove();
    nav.querySelector(".logOut").onclick = fetchApiJson.bind(
      undefined,
      "/user/session",
      "DELETE"
    );
    nav.querySelector(".editName").onSubmit = (e) => {
      e.preventDefault();

      fetchApiJson("/user/name", "PUT");
    };
  }

  return nav;
}
