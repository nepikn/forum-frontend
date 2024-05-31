/**
 * @param {HTMLElement} elem
 * @param {string} src
 */
export function replaceTitle(elem, src) {
  const appTitle = src
    .split("-")
    .map((s) => s[0].toUpperCase() + s.slice(1))
    .join(" ");

  elem.closest("html").querySelector("title").textContent = appTitle;
}
