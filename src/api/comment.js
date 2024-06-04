import { Handler } from "../util/api";

export default class Comment extends Handler {
  constructor(render) {
    super();
    this.render = render;
  }

  /**
   * @param {RequestInit & { queries: {}, path, validate }} options
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
    const content =
      contentOrForm instanceof HTMLFormElement
        ? contentOrForm.elements.namedItem("content").value
        : contentOrForm;

    return this.handleReq("", {
      method: "POST",
      queries: { content },
    });
  }

  get(key = "", queries = {}) {
    return this.handleReq(key, {
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
      validate: (res) => res === true || res === value,
    });
  }

  signIn(passwd) {
    return this.handleReq("/session", {
      method: "POST",
      queries: { passwd },
    });
  }

  logOut = () => {
    return this.handleReq("/session", { method: "DELETE" });
  };

  getAuthState() {
    return this.handleReq("/session/authState");
  }
}
