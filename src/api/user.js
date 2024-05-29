import { reqApi } from "../util/req";

export default class User {
  // constructor() {
  //   this.base = "/user";
  //   // Object.assign(this, reqApi("/user"));
  // }
  /** @type {RequestInit & {queries: {}}} */
  static options = { credentials: "include" };

  /**
   * @param {RequestInit & { queries: {}, path }} options
   * @returns
   */
  static req(options) {
    return reqApi(`/user${options.path ?? ""}`, {
      ...User.options,
      ...options,
    });
  }

  static add(form) {
    // todo
    return;
  }

  static get(prop, conds = {}) {
    return User.req({ path: prop && `/${prop}`, queries: conds });
  }

  static set(prop, conds = {}) {
    // todo
    return;
  }

  /**
   * @param {null|string|HTMLFormElement} valueOrForm
   */
  static setName(valueOrForm) {
    const name =
      valueOrForm instanceof HTMLFormElement
        ? valueOrForm.elements.namedItem("name").value
        : valueOrForm;

    return User.req({
      path: "/name",
      method: "PUT",
      queries: { value: name },
    });
  }

  static delete() {
    return User.req({ method: "DELETE" });
  }
}
