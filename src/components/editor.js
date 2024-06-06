import { Fragment, setChildrenOf } from "../util/component";
import { addSubmitHandler } from "../util/form";

export default function Editor({
  state: { userName, val = "", buttonText = "comment", focus = false },
  handler,
}) {
  const editor = Fragment("#editor");
  const setChildren = setChildrenOf.bind(editor);

  setChildren(".userName", "textContent", userName);
  setChildren("button", "textContent", buttonText);
  setChildren("[name=content]", "autofocus", focus);
  setChildren("[name=content]", "value", val);
  addSubmitHandler.call(editor, "editComment", handler.submit);

  return editor;
}
