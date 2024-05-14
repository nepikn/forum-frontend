/**
 * @param {string} path
 * @param {RequestInit & { queries: {} }} options
 * @returns
 */
export async function reqApiJson(path, options = {}) {
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

  // debugger;
  // for (const name of Object.keys(options)) {
  //   const option = options[name];

  //   switch (name) {
  //     case "queries":
  //       query = ;
  //       break;

  //     default:
  //       reqInit[name] = option;
  //       console.error("invalid option");
  //       break;
  //   }
  // }

  return (await fetch(req)).json();
}
