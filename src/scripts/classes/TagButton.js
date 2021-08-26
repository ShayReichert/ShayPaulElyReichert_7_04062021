import { createImageElement } from "../functions/helpers.js";
import close from "../../assets/close-vector.svg";

/**
 * TagButton Component
 */
class TagButton {
  /**
   * Create button from a tag clicked in the dropdown component
   * @param {HTMLElement} parentElement Wrapper HTML element
   * @param {string} tagValue Tag value
   * @param {string} className Tag class name
   */
  constructor(parentElement, tagValue, className) {
    if (parentElement === null || typeof parentElement !== "object") {
      console.error("The first parameter of the TagButton must be a valid HTML element (such as a div or section).");
      return;
    }
    this.parentElement = parentElement;
    this.tagValue = tagValue;
    this.className = className;
  }

  /**
   * Create a tag button
   */
  createTagButtons() {
    if (this.isTagNotAlreadyClick()) {
      this.parentElement.append(this.getTagButtonContent());
    } else {
      return;
    }
  }

  /**
   * Check that the clicked tag has not already been clicked.
   */
  isTagNotAlreadyClick() {
    const allTagButtons = Array.from(document.querySelectorAll(".tags-wrapper .btn"));
    return allTagButtons.every((tagButton) => tagButton.textContent !== this.tagValue);
  }

  /**
   * Generate the DOM element of the tag button
   */
  getTagButtonContent(format = "button") {
    const tagNode = document.createElement(format);
    tagNode.className = "btn";
    tagNode.className += " " + this.className;
    tagNode.setAttribute("type", "submit");

    const tagContent = document.createTextNode(this.tagValue);
    tagNode.appendChild(tagContent);

    // Create the <img> html element for the close Icon
    const closeIcon = createImageElement(close, "", "close-btn");
    tagNode.append(closeIcon);

    return tagNode;
  }
}

export default TagButton;
