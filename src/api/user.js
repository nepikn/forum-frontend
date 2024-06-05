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

  signUp = (passwdOrForm) => {
    return super.handlePost({ queries: { passwd: passwdOrForm } });
  };

  get(key = "", queries = {}) {
    return super.handleReq({
      path: `/user${key && `/${key}`}`,
      queries,
    });
  }

  /**
   * @param {null|string|HTMLFormElement} valueOrForm
   */
  set(props) {
    return super.handlePut({
      queries: props,
    });
  }

  signIn(passwdOrForm) {
    return super.handlePost({
      path: "/session",
      queries: { passwd: passwdOrForm },
    });
  }

  getAuthState() {
    return super.handleReq({ path: "/session/authState" });
  }

  setSessionName(nameOrForm) {
    return super.handlePut({
      path: "/session",
      queries: { name: nameOrForm },
    });
  }

  logOut = () => {
    return super.handleDelete({ path: "/session" });
  };
}
