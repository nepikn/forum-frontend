import { Handler } from "../util/api";

export default class User extends Handler {
  defPath = "/user";
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
  handleReq(path, options = {}) {
    return super.handleChildReq(path, this.render, {
      credentials: "include",
      ...options,
    });
  }

  signUp = (passwdOrForm) => {
    return super.handlePost({ queries: { passwd: passwdOrForm } });
  };

  get(key = "", queries = {}) {
    return this.handleReq(`/user${key && `/${key}`}`, {
      queries,
    });
  }

  /**
   * @param {null|string|HTMLFormElement} valueOrForm
   */
  set(key, valueOrForm) {
    const value =
      valueOrForm instanceof HTMLFormElement
        ? valueOrForm.elements.namedItem(key).value
        : valueOrForm;

    return this.handleReq(`/user/${key}`, {
      method: "PUT",
      queries: { value },
      invalidate: (res) => res !== true && res !== value,
    });
  }

  signIn(passwdOrForm) {
    return super.handlePost({
      path: "/session",
      queries: { passwd: passwdOrForm },
    });
  }

  logOut = () => {
    return this.handleReq("/session", { method: "DELETE" });
  };

  getAuthState() {
    return this.handleReq("/session/authState");
  }
}
