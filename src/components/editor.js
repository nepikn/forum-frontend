import { FragmentOf, setChildrenOf } from "../util/component";
import { handleSubmitOf } from "../util/form";

export default function Editor({
  state: { val = "", buttonText = "Comment", focus = false },
  handler,
}) {
  const editor = FragmentOf("#editor");
  const setChildren = setChildrenOf.bind(editor);

  setChildren("button", "textContent", buttonText);
  setChildren("[name=content]", "autofocus", focus);
  setChildren("[name=content]", "value", val);
  handleSubmitOf.call(editor, "editComment", handler.submit);

  return editor;
}
