import "./index.css";
import Comments from "./ui/comments";

const appTitle = import.meta.env.VITE_GITHUB_REPO.split("-")
  .map((s) => s[0].toUpperCase() + s.slice(1))
  .join(" ");
const app = document.querySelector("#app");

document.querySelector("title").innerText = appTitle;
app.append(await Comments(document.querySelector("template.comment"), 0, 1));
