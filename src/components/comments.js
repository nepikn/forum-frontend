import { Fragment } from "../util/component";
import { reqApi } from "../util/api";

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
      const nextCard = Fragment("#comment");

      nextCard.querySelector(".commentator").textContent = comment.commentator;
      nextCard.querySelector(".content").textContent = comment.content;

      return nextCard;
    })
  );

  return section;
}

export async function getComments(page, commentPerPage) {
  return reqApi("/comment", { queries: { page, commentPerPage } });
}
