/**
 * @typedef slot
 * @type {{
 *  state: {
 *    [key: string]: {
 *      [selector: string]: string;
 *    }
 *  }
 *  handler: {
 *    [type: string]: {
 *      [id: string]: (target)=>;
 *    }
 *  }
 * }}
 */
export default class Component {
  root;

  /**
   * @param {(form) =>} handler
   */
  addSubmitHandler(formId, handler) {
    this.callDescs(
      `form#${formId}`,
      "addEventListener",
      "submit",
      () => async (e) => {
        e.preventDefault();

        const res = await handler(e.target);
      },
    );
  }

  /**
   * @param {slot & {render?: boolean}} options
   */
  replaceDescs(tempId, options) {
    this.callDescs(
      `[data-for-temp=${tempId}]`,
      ...((options.render ?? true)
        ? [
            "replaceChildren",
            () => new Component(tempId, options).root,
          ]
        : ["replaceWith", ""]),
    );
  }

  setDescs(selector, key, val) {
    this.#iterateDescs(selector, (elem) => (elem[key] = val));
  }

  callDescs(selector, method, ...args) {
    this.#iterateDescs(selector, (elem) =>
      elem[method](
        ...args.map((arg) =>
          typeof arg == "function" ? arg() : arg,
        ),
      ),
    );
  }

  #iterateDescs(selector, cb) {
    this.root.querySelectorAll(selector).forEach(cb);
  }

  /**
   * @param {slot} slot
   */
  constructor(tempId, slot = {}) {
    this.root = Component.Fragment(tempId);

    Object.entries(slot.state ?? {}).forEach(([key, vals]) => {
      Object.entries(vals).forEach(([selector, val]) =>
        this.setDescs(getSelector(key, selector), key, val),
      );
    });

    Object.entries(slot.handler ?? {}).forEach(
      ([type, handlers]) => {
        Object.entries(handlers).forEach(([id, cb]) =>
          this.callDescs(
            `#${id}`,
            "addEventListener",
            type,
            () => (e) => {
              if (type == "submit") {
                e.preventDefault();
              }

              cb(e.target);
            },
          ),
        );
      },
    );

    function getSelector(key, selector) {
      switch (key) {
        case "textContent":
          return `[data-${selector}]`;
        case "value":
          return `[name=${selector}]`;
        default:
          throw new Error("");
      }
    }
  }

  /**
   * @returns {DocumentFragment}
   */
  static Fragment(tempId) {
    return document
      .querySelector(`template#${tempId}`)
      .content.cloneNode(true);
  }
}

export function swapDescByTempOf(tempId) {
  const root = this ?? document;

  root
    .querySelectorAll(`[data-for-temp=${tempId}]`)
    .forEach((elem) => {
      elem.replaceChildren(FragmentOf(`#${tempId}`));
    });
}

export function removeChildrenOf(selector) {
  const root = this ?? document;
  root.querySelectorAll(selector).forEach((elem) => {
    root.removeChild(elem);
  });
}

export function setChildrenOf(selector, key, val = true) {
  (this ?? document)
    .querySelectorAll(selector)
    .forEach((elem) => {
      elem[key] = val;
    });
}

/**
 * @param {string} selectorOrDatasetName
 * @param {string} datasetValue
 * @returns {DocumentFragment}
 */
export function FragmentOf(selectorStrOrObj) {
  const selector =
    typeof selectorStrOrObj == "object"
      ? Object.entries(selectorStrOrObj).reduce(
          (prevSelector, [name, value]) =>
            `${prevSelector}[data-${name}=${value}]`,
          "",
        )
      : selectorStrOrObj;

  return (this ?? document)
    .querySelector(`template${selector}`)
    .content.cloneNode(true);
}
