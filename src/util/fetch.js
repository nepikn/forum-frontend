export async function fetchApiJson(path, method, query = "") {
  return (
    await fetch(
      `${import.meta.env.VITE_API_URL}${path}${query && "?" + query}`,
      { method }
    )
  ).json();
}
