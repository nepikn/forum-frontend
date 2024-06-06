import Comment from "../api/comment";
import { Fragment, setChildrenOf } from "../util/component";
import Editor from "./editor";

/**
 * @typedef comment
 * @type {{id, user_id, content, is_deleted, commentator}}
 */

/**
 * @param {{state, handler: {
 *   comment: Comment
 * }}} param0
 */
export default async function Comments({
  state: { curUserId, page, commentPerPage },
  handler: { comment },
}) {
  /** @type {comment[]} */
  const comments = await comment.get({ page, commentPerPage });
  const list = document.createElement("ul");

  list.append(
    ...comments.map((comment) => {
      const container = document.createElement("li");
      const setChildren = setChildrenOf.bind(container);

      container.append(Fragment("#comment"));
      // todo: remove some menus

      setChildren(".commentator", "textContent", comment.commentator);
      setChildren(".content", "textContent", comment.content);
      setChildren("[name=id]", "value", comment.id);
      setChildren("#editComment [type=button]", "onclick", () => {
        renderEditor(container, comment);
      });

      return container;
    })
  );

  return list;
}

/**
 * @param {HTMLElement} container
 * @param {comment} comment
 */
function renderEditor(container, comment) {
  const prevComment = container.firstElementChild;
  const handler = new Comment((res) => renderNextComment(res));

  container.replaceChildren(
    Editor({
      state: {
        userName: comment.commentator,
        val: comment.content,
        focus: true,
      },
      handler: {
        submit: (form) => handler.edit(comment.id, form),
      },
    })
  );

  function renderNextComment(nextContent) {
    setChildrenOf.call(prevComment, ".content", "textContent", nextContent);

    container.replaceChildren(prevComment);
    container.scrollIntoView({ behavior: "smooth", block: "center" });
  }
}
