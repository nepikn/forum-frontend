import { getTemplate } from "../util/component";
import { reqApiJson } from "../util/req";

/**
 * @param {HTMLTemplateElement} template
 * @param {string} curUserId
 * @param {number} page
 * @param {number} countPerPage
 */
export default async function Comments(curUserId, page, commentPerPage = 5) {
  const comments = await getComments(page, commentPerPage);
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

export async function getComments(page, commentPerPage) {
  return reqApiJson("/comment", { queries: { page, commentPerPage } });
}
