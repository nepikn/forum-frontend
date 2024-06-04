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

  /**
   * @param {import("../util/api").ReqOptions} options
   */
  handleReq(subPath, options = {}) {
    return super.handleChildReq(
      `/comment${subPath && `/${subPath}`}`,
      this.render,
      {
        credentials: "include",
        ...options,
      }
    );
  }

  add(contentOrForm) {
    return super.handlePost({ queries: { content: contentOrForm } });
  }

  get(queries = {}) {
    return this.handleReq("", {
      queries,
    });
  }

  /**
   * @param {null|string|HTMLFormElement} valueOrForm
   */
  set(key, valueOrForm, queries = {}) {
    const value =
      valueOrForm instanceof HTMLFormElement
        ? valueOrForm.elements.namedItem(key).value
        : valueOrForm;

    return this.handleReq(key, {
      method: "PUT",
      queries: { value, ...queries },
      invalidate: (res) => res !== true && res !== value,
    });
  }
}
