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
  const section = document.createElement("section");
  const list = await List({
    state: { userId, page, commentPerPage },
    handler,
  });
  const nav = await CommentNav({
    section,
    state: { userId, page, commentPerPage },
    handler,
  });

  section.append(list, nav);

  return section;
}

async function CommentNav({
  section,
  state: { userId, page, commentPerPage },
  handler,
}) {
  const nav = document.createElement("nav");
  const prev = document.createElement("button");
  const next = document.createElement("button");
  const length = await handler.comment.getLength();

  prev.onclick = async () =>
    section.replaceWith(
      await Comments({
        state: { userId, page: Math.max(1, page - 1), commentPerPage },
        handler,
      })
    );
  next.onclick = async () =>
    section.replaceWith(
      await Comments({
        state: {
          userId,
          page: Math.min(Math.ceil(length / commentPerPage), page + 1),
          commentPerPage,
        },
        handler,
      })
    );
  prev.textContent = "◄";
  next.textContent = "►";

  nav.style.width = "max-content";
  nav.style.marginInline = "auto";
  nav.style.marginTop = "2rem";
  nav.append(prev, page, next);

  return nav;
}

async function List({ state: { userId, page, commentPerPage }, handler }) {
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
        val: container.querySelector("[data-content]").textContent,
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
