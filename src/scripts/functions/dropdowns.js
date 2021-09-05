import { getAveragetWidthItem } from "./helpers.js";
import { TagButton } from "../classes/index";

/**
 * On click on body page, close open dropdowns
 */
function closeDropdownOnBodyClick() {
  const allDropdown = Array.from(document.querySelectorAll(".dropdowns-wrapper .form-control"));

  allDropdown.map((input) => {
    const isDropdownOpen = input.parentNode.querySelector(".input-group-append").classList.contains("show");

    if (isDropdownOpen) {
      input.parentNode.querySelector(".dropdown-toggle").click();
      input.style.width = "auto";
    }
  });
}

/**
 * On click on the input, manage the behavior of the dropdowns
 * @param {MouseEvent} e
 */
function handleFocusOnDropdownInputs(e) {
  const self = e.target;

  if (e.type === "click" || e.keyCode == 9) {
    clearInputOnClick(self);
    openDropdown(e, self);
  } else {
    return;
  }
}

/**
 * Replace the input value with the placeholder value (if there is currently no search).
 * @param {HTMLElement} self  input to clear
 */
function clearInputOnClick(self) {
  if (self.value === "Ingrédients" || self.value === "Appareil" || self.value === "Ustensiles") {
    self.value = "";
  }
}

/**
 * Open the dropdown (if it is not already open)
 * @param {MouseEvent} e
 * @param {HTMLElement} self Input clicked
 */
function openDropdown(e, self) {
  e.stopPropagation();
  const isDropdownOpen = self.parentNode.querySelector(".dropdown-toggle").classList.contains("show");

  if (!isDropdownOpen) {
    self.parentNode.querySelector(".dropdown-toggle").click();
    self.focus();
  }
}

/**
 * Adjusts the width of the input component when the dropdown is unfolded,
 * according to the width of the dropdown (according to the number of column).
 * @param {MouseEvent} e
 */
function setWidthOfInput(e) {
  const self = e.target;
  const inputGroup = self.parentNode.parentNode;
  const input = inputGroup.querySelector(".form-control");
  const isShow = inputGroup.querySelector(".dropdown-menu").classList.contains("show");

  if (window.screen.width >= 1200 && !isShow && input) {
    const allTags = Array.from(inputGroup.querySelectorAll(".dropdown-item"));
    const averagetWidthItem = getAveragetWidthItem(allTags);

    const numberOfTags = inputGroup.querySelectorAll(".dropdown-item").length;
    const numberOfColumns = Math.ceil(numberOfTags / 10);

    const newInputSize = numberOfColumns * averagetWidthItem;

    input.style.width = newInputSize + "px";
  } else {
    if (input) {
      input.style.width = "auto";
    }
  }
}

/**
 * Reset the width of all dropdowns input to their original width.
 */
function resetWidthOfInputs() {
  const allInput = Array.from(document.querySelectorAll(".dropdowns-wrapper .form-control"));
  allInput.map((input) => {
    input.style.width = "auto";
  });
}

/**
 * Create a new tag button on click on a tag item.
 * @param {MouseEvent} e
 */
function createNewTag(e) {
  const self = e.target;
  const tagValue = self.textContent;
  const classValue = self.classList[1];
  const tagsWrapper = document.querySelector(".tags-wrapper");
  const cardTag = new TagButton(tagsWrapper, tagValue, classValue);
  cardTag.createTagButtons();
}

/**
 * Delete the clicked tag.
 * @param {MouseEvent} e
 */
function deleteTag(e) {
  let self = e.target;

  if (e.target.classList.contains("close-btn")) {
    if (e.target.parentElement) {
      e.target.parentElement.remove();
    }
    self.remove();
  }

  self.remove();
}

export { closeDropdownOnBodyClick, handleFocusOnDropdownInputs, setWidthOfInput, resetWidthOfInputs, createNewTag, deleteTag };
