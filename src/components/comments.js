import { Fragment } from "../util/component";
import { reqApi } from "../util/api";
import Comment from "../api/comment";

/**
 * @param {{state, handler: {
 *   comment: Comment
 * }}} param0
 */
export default async function Comments({
  state: { curUserId, page, commentPerPage },
  handler: { comment },
}) {
  const comments = await comment.get({ page, commentPerPage });
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
