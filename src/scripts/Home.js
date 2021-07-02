import TagButton from "./classes/Tag.js";
import RecipeCard from "./classes/Card";
import { loadData } from "./functions/helpers.js";

/**
 * Home Component
 * @property {HTMLElement} dropdownsWrapper
 * @property {array} dropdownInputs
 * @property {array} dropdownArrows
 * @property {HTMLElement} tagsWrapper
 * @property {array} dropDownItem
 * @property {array} tagButtons
 */
class Home {
  constructor() {
    this.dropdownsWrapper = document.querySelector(".dropdowns-wrapper");
    this.dropdownInputs = Array.from(this.dropdownsWrapper.querySelectorAll(".form-control"));
    this.dropdownArrows = Array.from(document.querySelectorAll(".dropdown-toggle"));
    this.tagsWrapper = document.querySelector(".tags-wrapper");
    this.dropDownItem = Array.from(document.querySelectorAll(".dropdown-item"));
    this.tagButtons = Array.from(this.tagsWrapper.querySelectorAll(".btn"));
    this.searchBtn = document.querySelector(".search-btn");
  }

  /**
   * addEventListenerOnElements Function
   * Add an eventListener to clickable elements.
   */
  addEventListenerOnElements() {
    this.dropdownInputs.map((input) => input.addEventListener("click", this.clearInputOnClick));
    this.dropdownArrows.map((arrow) => arrow.addEventListener("click", this.setWidthOfInput));
    this.dropDownItem.map((item) => item.addEventListener("click", this.handleClickOnItems.bind(this)));
    this.tagButtons.map((btn) => btn.addEventListener("click", this.deleteTag));
    this.searchBtn.addEventListener("click", (e) => e.preventDefault);

    this.initDataCards();
  }

  /**
   * clearInputOnClick Function
   * Replace the input value with the placeholder value.
   */
  clearInputOnClick() {
    this.value = "";
  }

  /**
   * setSizeOfInput Function
   * Adjusts the width of the input component when the dropdown is unfolded,
   * according to the width of the dropdown (according to the number of column).
   *
   */
  setWidthOfInput() {
    const inputGroup = this.parentNode.parentNode;
    const input = inputGroup.querySelector(".form-control");
    const columnWidth = inputGroup.querySelector(".dropdown-col").offsetWidth;
    const numberOfColumns = inputGroup.querySelectorAll(".dropdown-col").length;
    const newSize = numberOfColumns * columnWidth;

    input.style.minWidth = newSize + "px";
  }

  /**
   * handleClickOnItems Function
   * Manage the creation of new tags when clicking on an item in the dropdown list.
   */
  handleClickOnItems(e) {
    const self = e.target;
    const tagValue = self.textContent;
    const classValue = self.classList[1];
    const tagsWrapper = document.querySelector(".tags-wrapper");

    const cardTag = new TagButton(tagsWrapper, tagValue, classValue);
    cardTag.createTagButtons();

    this.addEventListenerOnNewTags();
  }

  /**
   * addEventListenerOnNewTags Function
   * Add a event listener to the new tags created.
   *
   */
  addEventListenerOnNewTags() {
    const tagButtons = Array.from(this.tagsWrapper.querySelectorAll(".btn"));
    tagButtons.map((btn) => btn.addEventListener("click", this.deleteTag));
  }

  /**
   * deleteTag Function
   * Delete the clicked tag.
   */
  deleteTag() {
    this.remove();
  }

  /**
   * initDataCards Function
   * Fetch recipe data.
   */
  initDataCards() {
    (async function () {
      return await loadData();
    })().then((result) => this.createCard(result));
  }

  /**
   * createCard Function
   * Cards created from data.
   * @param  {array} data
   */
  createCard(data) {
    const cardWrapper = document.querySelector(".card-deck");
    cardWrapper.innerHTML = "";

    data.map((recette) => {
      const cardRecette = new RecipeCard(cardWrapper, recette);
      cardRecette.createCard();
    });
  }
}

export default Home;
