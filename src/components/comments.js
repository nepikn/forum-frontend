import Comment from "../api/comment";
import { Fragment } from "../util/component";

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
