import Comment from "./api/comment";
import User from "./api/user";
import Comments from "./components/comments";
import Editor from "./components/editor";
import Nav from "./components/nav";
import "./index.css";
import { replaceTitle } from "./util/page";

const app = document.querySelector("#app");
const user = new User(render);
const comment = new Comment(render);

replaceTitle(app, import.meta.env.VITE_GITHUB_REPO);
await render();

async function render() {
  const userName = await user.get("name");
  const children = await Promise.all([
    Nav({ state: { userName }, handler: { user } }),
    Comments({
      state: { curUserId: 0, page: 1, commentPerPage: 5 },
      handler: { comment },
    }),
    Editor({
      state: { userName },
      handler: { submit: (form) => comment.add(form) },
    }),
  ]);

  app.replaceChildren(...children);
}
