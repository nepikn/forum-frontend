import { Fragment } from "../util/component";
import { addSubmitHandler } from "../util/form";

export default async function Editor({
  state: { userName },
  handler: { comment },
}) {
  const editor = Fragment("#editor");

  editor.querySelector(".userName").textContent = userName;
  addSubmitHandler.call(editor, "addComment", (form) => comment.add(form));

  return editor;
}
