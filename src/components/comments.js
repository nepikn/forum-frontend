import Comment from "../api/comment";
import { FragmentOf, setChildrenOf } from "../util/component";
import { addSubmitHandlerOf } from "../util/form";
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
  state: { userId, page, commentPerPage },
  handler,
}) {
  /** @type {comment[]} */
  const comments = await handler.comment.get({ page, commentPerPage });
  const list = document.createElement("ul");
  list.style.display = "grid";
  list.style.gap = ".5rem";
  list.style.minWidth = "75%";

  list.append(
    ...comments.map((comment) => CommentCard(comment, userId, handler))
  );

  return list;
}

function CommentCard(comment, userId, handler) {
  const container = document.createElement("li");
  const setChildren = setChildrenOf.bind(container);
  const addSubmitHandler = addSubmitHandlerOf.bind(container);

  container.append(FragmentOf("#comment"));

  setChildren(".commentator", "textContent", comment.commentator);
  setChildren(".content", "textContent", comment.content);
  setChildren("[name=id]", "value", comment.id);

  if (userId == comment.user_id) {
    container.append(FragmentOf.call(container, "#userMenu"));

    setChildren("#editComment button", "onclick", () => {
      renderEditor(container, comment);
    });
    addSubmitHandler("delComment", () => handler.comment.delete(comment.id));
  }

  return container;
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
