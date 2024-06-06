import Comment from "../api/comment";
import { Fragment, setChildrenOf } from "../util/component";
import { addSubmitHandler } from "../util/form";

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
  const editor = Fragment("#editor");
  const setChildren = setChildrenOf.bind(editor);
  const prevComment = container.firstElementChild;
  const renderNextComment = (nextContent) => {
    setChildrenOf.call(prevComment, ".content", "textContent", nextContent);

    container.replaceChildren(prevComment);
    container.focus();
    container.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  setChildren("button", "textContent", "save");
  setChildren("[name=content]", "value", comment.content);
  setChildren("[name=content]", "autofocus");
  addSubmitHandler.call(editor, "editComment", (form) =>
    new Comment(renderNextComment).edit(comment.id, form)
  );

  container.replaceChildren(editor);
}
