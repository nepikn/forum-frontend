import { reqApi } from "../util/req";

export default class User {
  constructor(render) {
    this.render = render;
  }

  /**
   * @param {RequestInit & { queries: {}, path }} options
   */
  static req(options) {
    return reqApi(`/user${options.path ?? ""}`, {
      credentials: "include",
      ...options,
    });
  }

  add = async (queries) => {
    const res = await User.req({ method: "POST", queries });

    this.render();
  };

  async get(key, queries = {}) {
    const res = await User.req({ path: key && `/${key}`, queries });

    if (key != "authState") {
      return res;
    }

    switch (res) {
      case true:
        return "signIn";
      case false:
        return "signUp";
      default:
        return res;
    }
  }

  /**
   * @param {null|string|HTMLFormElement} valueOrForm
   */
  async set(key, valueOrForm, queries = {}) {
    const value =
      valueOrForm instanceof HTMLFormElement
        ? valueOrForm.elements.namedItem(key).value
        : valueOrForm;

    const res = await User.req({
      path: key && `/${key}`,
      method: "PUT",
      queries: { value, ...queries },
    });

    if (res != value) {
      throw new Error("");
    }

    this.render();
  }

  delete = async () => {
    const res = await User.req({ method: "DELETE" });

    this.render();
  };
}
