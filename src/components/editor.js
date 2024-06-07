import { FragmentOf, setChildrenOf } from "../util/component";
import { addSubmitHandlerOf } from "../util/form";

export default function Editor({
  state: { userName, val = "", buttonText = "comment", focus = false },
  handler,
}) {
  const editor = FragmentOf("#editor");
  const setChildren = setChildrenOf.bind(editor);

  setChildren(".userName", "textContent", userName);
  setChildren("button", "textContent", buttonText);
  setChildren("[name=content]", "autofocus", focus);
  setChildren("[name=content]", "value", val);
  addSubmitHandlerOf.call(editor, "editComment", handler.submit);

  return editor;
}
