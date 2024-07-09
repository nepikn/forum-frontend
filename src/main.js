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
(async () => await render())();

async function render() {
  const { name: userName, id: userId } = await user.get();
  const children = await Promise.all([
    Nav({ state: { userName }, handler: { user } }),
    Comments({
      state: { userId, page: 1, commentPerPage: 5 },
      handler: { comment },
    }),
    userId
      ? Editor({
          state: { userName },
          handler: { submit: (form) => comment.add(form) },
        })
      : "",
  ]);

  app.replaceChildren(...children);
}
