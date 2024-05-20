import { reqApi } from "../util/req";

export default class User {
  // constructor() {
  //   this.base = "/user";
  //   // Object.assign(this, reqApi("/user"));
  // }
  /** @type {RequestInit & {queries: {}}} */
  static options = { credentials: "include" };

  static req(path = "", options) {
    return reqApi(`/user${path}`, { ...User.options, ...options });
  }

  static delete() {
    return User.req("", { method: "DELETE" });
  }

  static getName() {
    return User.req("/name");
  }

  /**
   * @param {null|string|HTMLFormElement} valueOrForm
   */
  static setName(valueOrForm) {
    const name =
      valueOrForm instanceof HTMLFormElement
        ? valueOrForm.elements.namedItem("name").value
        : valueOrForm;

    return User.req("/name", {
      method: "PUT",
      queries: { value: name },
    });
  }
}
