/**
 * @typedef ReqOptions
 * @type {RequestInit & {
 *  queries: Object.<string, string|HTMLFormElement>,
 *  invalidate,
 *  path
 * }}
 */
export class Handler {
  defPath;
  /** @type {ReqOptions} */
  defOptions;
  render;

  /** @param {ReqOptions} options */
  handlePost(options = {}) {
    const path = options.path ?? this.defPath;

    return this.handleChildReq(path, this.render, {
      method: "POST",
      invalidate: (res) =>
        typeof res != "boolean" && isNaN(Number.parseInt(res)),
      ...this.defOptions,
      ...options,
    });
  }

  /** @param {ReqOptions} options */
  async handleChildReq(path, render, options = {}) {
    const json = await this.req(path, options);

    if (options.invalidate && options.invalidate(json)) {
      throw new Error(`server: ${json}`);
    }

    if (options.method && options.method != "GET") render();

    return json;
  }

  /** @param {ReqOptions} options */
  async req(path, options) {
    const query = ((queries = options.queries) => {
      return queries
        ? `?${Object.entries(queries).reduce(
            /** @param {URLSearchParams} searchParams */
            (searchParams, [key, valOrForm]) => {
              const val =
                valOrForm instanceof HTMLFormElement
                  ? valOrForm.elements.namedItem(key).value
                  : valOrForm;

              searchParams.append(key, val);
              return searchParams;
            },
            new URLSearchParams()
          )}`
        : "";
    })();

    const req = new Request(
      `${import.meta.env.VITE_API_URL}${path}${query}`,
      options
    );

    const res = await fetch(req);
    const json = res.json();

    if (!res.ok) {
      throw new Error(await json);
    }
    return json;
  }
}

/**
 * @param {string} path
 * @param {RequestInit & { queries: {} }} options
 * @returns
 */
export async function reqApi(path, options = {}) {
  const query = ((queries = options.queries) => {
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
  })();

  const req = new Request(
    `${import.meta.env.VITE_API_URL}${path}${query}`,
    options
  );

  const res = await fetch(req);
  const json = res.json();

  if (!res.ok) {
    throw new Error(await json);
  }

  return json;
}
