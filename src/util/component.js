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
export const getDeepCloned = (selectorOrDatasetName, datasetValue) => {
  const selector =
    datasetValue !== undefined
      ? `[data-${selectorOrDatasetName}=${datasetValue}]`
      : selectorOrDatasetName;
  // debugger;
  return getTemplate(selector).content.cloneNode(true);
};
