import "./index.css";
import Comments from "./components/comments";
import Nav from "./components/nav";

const appTitle = import.meta.env.VITE_GITHUB_REPO.split("-")
  .map((s) => s[0].toUpperCase() + s.slice(1))
  .join(" ");
const app = document.querySelector("#app");

document.querySelector("title").innerText = appTitle;

app.append(await Nav());
app.append(await Comments(0, 1));
