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
    const res = await this.req(options.path || this.defPath, {
      ...this.defOptions,
      ...options,
    });

    (({ method } = options) => {
      if (method && method != "GET") this.render(res);
    })();

    return res;
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
            new URLSearchParams(),
          )}`
        : "";
    })();

    const req = new Request(
      `${import.meta.env.VITE_API_URL}${path}${query}`,
      options,
    );

    const res = await fetch(req);
    if (!res.ok) {
      throw new Error(await res.text());
    }

    const contentType = res.headers.get("content-type");
    if (!contentType) {
      return;
    } else if (contentType.includes("json")) {
      return await res.json();
    } else if (contentType.includes("text")) {
      return await res.text();
    }
  }
}
