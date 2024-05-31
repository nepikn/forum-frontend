import "./index.css";
import Comments from "./components/comments";
import Nav from "./components/nav";
import { replaceTitle } from "./util/page";
import User from "./api/user";

const app = document.querySelector("#app");
const user = new User(render);

replaceTitle(app, import.meta.env.VITE_GITHUB_REPO);
await render();

async function render() {
  app.replaceChildren(await Nav({ user }));
  app.append(await Comments(0, 1));
}
