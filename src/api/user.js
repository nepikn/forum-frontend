import { Handler } from "../util/api";

export default class User extends Handler {
  constructor(render) {
    super();
    this.render = render;
  }

  /**
   * @param {RequestInit & { queries: {}, path, validate }} options
   */
  async handleReq(path, options = {}) {
    const res = await super.handleReq(path, this.render, {
      credentials: "include",
      ...options,
    });

    ((validate = options.validate) => {
      if (validate && !validate(res)) {
        throw new Error(`server: ${res}`);
      }
    })();

    return res;
  }

  signUp = (passwd) => {
    return this.handleReq("/user", {
      method: "POST",
      queries: { passwd },
      validate: (res) => Number.parseInt(res),
    });
  };

  get(key, queries = {}) {
    return this.handleReq(`/user${key && `/${key}`}`, {
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

    return this.handleReq(`/user/${key}`, {
      method: "PUT",
      queries: { value, ...queries },
      validate: (res) => res === true || res === value,
    });
  }

  signIn(passwd) {
    return this.handleReq("/session", { method: "POST", queries: { passwd } });
  }

  logOut = () => {
    return this.handleReq("/session", { method: "DELETE" });
  };

  getAuthState() {
    return this.handleReq("/session/authState");
  }
}
