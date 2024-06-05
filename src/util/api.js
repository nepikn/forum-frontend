/**
 * @typedef ReqOptions
 * @type {RequestInit & {
 *  queries: Object.<string, string|HTMLFormElement>,
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
    return this.handleReq({
      method: "POST",
      ...options,
    });
  }

  /** @param {ReqOptions} options */
  handlePut(options = {}) {
    return this.handleReq({
      method: "PUT",
      ...options,
    });
  }

  /** @param {ReqOptions} options */
  handleDelete(options = {}) {
    return this.handleReq({
      method: "DELETE",
      ...options,
    });
  }

  /** @param {ReqOptions} options */
  async handleReq(options = {}) {
    const json = await this.req(options.path || this.defPath, {
      ...this.defOptions,
      ...options,
    });

    // if (json["successful"] === false) {
    //   throw new Error(`server: ${json["message"]}`);
    // }

    (({ method } = options) => {
      if (method && method != "GET") this.render();
    })();

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
