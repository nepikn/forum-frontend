import { reqApi } from "../util/req";

export default class User {
  constructor(render) {
    // this.render = render;
    return new Proxy(this, {
      get(target, p, receiver) {
        return !["get"].includes(p)
          ? async (...args) => {
              const res = await target[p](...args);
              // debugger;
              render();
            }
          : Reflect.get(...arguments);
      },
    });
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

  signUp = async (passwd) => {
    return (res = await User.req({ method: "POST", queries: { passwd } }));
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

    return res;
  }

  async signIn(passwd) {
    return User.req({ method: "PUT", queries: { passwd } });
  }

  delete = async () => {
    return User.req({ method: "DELETE" });
  };

  logOut = async () => {
    return User.req({ method: "DELETE", path: "/session" });
  };
}
