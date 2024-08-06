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
  section.style.scrollMarginTop = "0";

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
  const pageFloor = 1;
  const pageCeil = Math.max(pageFloor, Math.ceil(length / commentPerPage));

  prev.onclick = () => navigate(Math.max(pageFloor, page - 1));
  next.onclick = () => navigate(Math.min(pageCeil, page + 1));
  prev.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5">
      <path fill-rule="evenodd" d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z" clip-rule="evenodd" />
    </svg>
  `;
  next.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5">
      <path fill-rule="evenodd" d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
    </svg>
  `;
  prev.disabled = page == pageFloor;
  next.disabled = page == pageCeil;

  nav.style.width = "max-content";
  nav.style.marginInline = "auto";
  nav.style.marginTop = "2rem";
  nav.style.display = "flex";
  nav.style.alignItems = "center";
  nav.append(prev, page, next);

  return nav;

  async function navigate(page) {
    section.replaceWith(
      await Comments({
        state: {
          userId,
          page,
          commentPerPage,
        },
        handler,
      })
    );
    window.scrollTo(0, 0);
  }
}

async function List({ state: { userId, page, commentPerPage }, handler }) {
  const comments = await handler.comment.get({ page, commentPerPage });
  if (!comments) {
    const p = document.createElement("p");
    p.textContent = "no comments :(";
    p.style.textAlign = "center";
    return p;
  }

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
