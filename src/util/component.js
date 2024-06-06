export function setChildrenOf(selector, key, val = true) {
  (this ?? document).querySelectorAll(selector).forEach((elem) => {
    elem[key] = val;
  });
}

/**
 * @param {string} selectorOrDatasetName
 * @param {string} datasetValue
 * @returns {DocumentFragment}
 */
export function Fragment(selectorStrOrObj) {
  const selector =
    typeof selectorStrOrObj == "object"
      ? Object.entries(selectorStrOrObj).reduce(
          (prevSelector, [name, value]) =>
            `${prevSelector}[data-${name}=${value}]`,
          ""
        )
      : selectorStrOrObj;

  return document.querySelector(`template${selector}`).content.cloneNode(true);
}
