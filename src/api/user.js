import { Handler } from "../util/api";

export default class User extends Handler {
  constructor(render) {
    super();
    this.render = render;
  }

  /**
   * @param {RequestInit & { queries: {}, path }} options
   */
  handleReq(path, options) {
    return super.handleReq(path, this.render, {
      credentials: "include",
      ...options,
    });
  }

  signUp = async (passwd) => {
    return this.handleReq("/user", {
      method: "POST",
      queries: { passwd },
    });
  };

  async get(key, queries = {}) {
    return this.handleReq(`/user${key && `/${key}`}`, {
      queries,
    });
  }

  /**
   * @param {null|string|HTMLFormElement} valueOrForm
   */
  async set(key, valueOrForm, queries = {}) {
    const value =
      valueOrForm instanceof HTMLFormElement
        ? valueOrForm.elements.namedItem(key).value
        : valueOrForm;

    const res = await this.handleReq(`/user/${key}`, {
      method: "PUT",
      queries: { value, ...queries },
    });

    if (res != true && res != value) {
      throw new Error(`server: ${res}`);
    }

    return res;
  }

  async signIn(passwd) {
    return this.handleReq("/session", { method: "POST", queries: { passwd } });
  }

  logOut = async () => {
    return this.handleReq("/session", { method: "DELETE" });
  };

  async getAuthState() {
    return this.handleReq("/session/authState");
  }
}
