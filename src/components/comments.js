import Comment from "../api/comment";
import Component, { setChildrenOf } from "../util/component";
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

  list.append(
    ...comments.map((comment) => CommentCard(comment, userId, handler))
  );

  return list;
}

function CommentCard(comment, userId, handler) {
  const container = new Component("comment", {
    state: {
      textContent: {
        commentator: comment.commentator,
        content: comment.content,
      },
      value: {
        id: comment.id,
      },
    },
  });

  const card = container.root.firstElementChild;

  container.replaceDescs("userMenu", {
    render: userId == comment.user_id,
    handler: {
      click: {
        renderEditor: () => {
          renderEditor(card, comment);
        },
      },
      submit: {
        delComment: () => handler.comment.delete(comment.id),
      },
    },
  });

  return container.root;
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
        val: comment.content,
        focus: true,
      },
      handler: {
        submit: (form) => handler.edit(comment.id, form),
      },
    })
  );

  function renderNextComment(nextContent) {
    setChildrenOf.call(
      prevComment,
      "[data-content]",
      "textContent",
      nextContent
    );

    container.replaceChildren(prevComment);
    container.scrollIntoView({ behavior: "smooth", block: "center" });
  }
}
