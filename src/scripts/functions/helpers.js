import recipes from "../../recipes.js";

/**
 * loadData Function
 * Handle data loading
 */
const loadData = function () {
  return new Promise((resolve, reject) => {
    const allRecipes = [...recipes];

    if (allRecipes) {
      resolve(allRecipes);
    } else {
      reject("Error loading data");
    }
  });
};

/**
 * Create a node element with custom content.
 * @param {HTMLElement} format Wrapper HTML element
 * @param {string} content Content for the wrapper HTML element
 * @param {string} className Class of the HTML element
 */
function createHTMLNodeElement(format = "div", content = "", className = "") {
  const elementNode = document.createElement(format);
  const elementContent = document.createTextNode(content);
  elementNode.setAttribute("class", className);
  elementNode.appendChild(elementContent);
  return elementNode;
}

/**
 * Create nodes elements with custom content.
 * @param {HTMLElement} format Wrapper HTML element
 * @param {Array} contentElements Array of HTML element
 * @param {string} className Class of the HTML element
 */
function createNodesElements(format = "div", contentElements = [], className = "") {
  const elementNode = document.createElement(format);

  elementNode.setAttribute("class", className);
  contentElements.map((element) => {
    elementNode.append(element);
  });
  return elementNode;
}

/**
 * Generate an <img> element, with a custom class and alternative text.
 * @param {string} path Path of the image
 * @param {string} alt Alternative text of the image
 * @param {string} className Class of the image element
 */
function createImageElement(path = "", alt = "", className = "icon") {
  const icon = document.createElement("img");
  icon.setAttribute("src", path);
  icon.setAttribute("class", className);
  icon.setAttribute("alt", alt);
  return icon;
}

export { loadData, createImageElement, createHTMLNodeElement, createNodesElements };
