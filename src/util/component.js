/**
 * @param {string} selector
 * @returns {HTMLTemplateElement}
 */
export function getTemplate(selector) {
  return document.querySelector(`template${selector}`);
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

  return getTemplate(selector).content.cloneNode(true);
}
