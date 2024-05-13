import { getTemplate } from "../util/component";
import { fetchApiJson } from "../util/fetch";

/**
 * @param {HTMLTemplateElement} template
 * @param {string} curUserId
 * @param {number} page
 * @param {number} countPerPage
 */
export default async function Comments(curUserId, page, countPerPage = 5) {
  const comments = await getComments(page, countPerPage);
  const section = document.createElement("section");

  section.append(
    ...comments.map((comment) => {
      /** @type {DocumentFragment} */
      const nextCard = getTemplate(".comment").content.cloneNode(true);

      nextCard.querySelector(".commentator").innerText = comment.commentator;
      nextCard.querySelector(".content").innerText = comment.content;

      return nextCard;
    })
  );

  return section;
}

export async function getComments(page, countPerPage) {
  const query = new URLSearchParams();

  query.append("page", page);
  query.append("commentPerPage", countPerPage);

  return fetchApiJson("/comment", "GET", query);
}
