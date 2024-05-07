import { getComments } from "../api/comment";

/**
 * @param {HTMLTemplateElement} template
 * @param {string} curUserId
 * @param {number} page
 * @param {number} countPerPage
 */
export default async function Comments(
  template,
  curUserId,
  page,
  countPerPage = 5
) {
  const comments = await getComments(page, countPerPage);
  const section = document.createElement("section");

  section.append(
    ...comments.map((comment) => {
      /** @type {DocumentFragment} */
      const nextCard = template.content.cloneNode(true);

      nextCard.querySelector(".commentator").innerText = comment.commentator;
      nextCard.querySelector(".content").innerText = comment.content;

      return nextCard;
    })
  );

  return section;
}
