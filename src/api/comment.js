import { Handler } from "../util/api";

export default class Comment extends Handler {
  defPath = "/comment";
  defOptions = {
    credentials: "include",
  };

  constructor(render) {
    super();
    this.render = render;
  }

  add(contentOrForm) {
    return super.handlePost({ queries: { content: contentOrForm } });
  }

  get(queries = {}) {
    return super.handleReq({ queries });
  }

  getLength() {
    return super.handleReq({ path: `${this.defPath}/length` });
  }

  /**
   * @param {null|string|HTMLFormElement} contentOrForm
   */
  edit(id, contentOrForm) {
    return super.handlePut({
      path: `${this.defPath}/${id}`,
      queries: { content: contentOrForm },
    });
  }

  delete(id) {
    return super.handleDelete({
      path: `${this.defPath}/${id}`,
    });
  }
}
