/**
 * @param {string} path
 * @param {RequestInit & { queries: {} }} options
 * @returns
 */
export async function reqApi(path, options = {}) {
  const query = ((queries) => {
    return queries
      ? `?${Object.entries(queries).reduce(
          /** @param {URLSearchParams} searchParams */
          (searchParams, query) => {
            searchParams.append(...query);
            return searchParams;
          },
          new URLSearchParams()
        )}`
      : "";
  })(options.queries);

  const req = new Request(
    `${import.meta.env.VITE_API_URL}${path}${query}`,
    options
  );

  const res = await fetch(req);
  const json = res.json();

  // debugger;
  if (!res.ok) {
    throw new Error(await json);
  }

  return json;
}
