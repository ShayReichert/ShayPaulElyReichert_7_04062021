import TagButton from "./classes/TagButton.js";
import TagsDropdown from "./classes/TagDropdown.js";
import RecipeCard from "./classes/Card";
import { loadData, getAveragetWidthItem } from "./functions/helpers.js";

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
    this.searchInput = document.querySelector(".search-input");
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
    this.searchBtn.addEventListener("click", (e) => e.preventDefault());
    this.searchInput.addEventListener("keyup", this.handleFilter.bind(this));

    this.initData();
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
    const isShow = inputGroup.querySelector(".dropdown-menu").classList.contains("show");

    if (!isShow) {
      const allTags = Array.from(inputGroup.querySelectorAll(".dropdown-item"));
      const averagetWidthItem = getAveragetWidthItem(allTags);

      const numberOfTags = inputGroup.querySelectorAll(".dropdown-item").length;
      const numberOfColumns = Math.ceil(numberOfTags / 10);

      const newInputSize = numberOfColumns * averagetWidthItem;

      input.style.width = newInputSize + "px";
    } else {
      input.style.width = "auto";
    }
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

    this.resetWidthOfInputs();
    this.addEventListenerOnNewTagsButton();
  }

  /**
   * resetWidthOfInputs Function
   * Reset the width of all dropdowns input to their original width
   */
  resetWidthOfInputs() {
    const allInput = Array.from(document.querySelectorAll(".dropdowns-wrapper .form-control"));
    allInput.map((input) => {
      input.style.width = "auto";
    });
  }

  /**
   * addEventListenerOnNewTagsButton Function
   * Add a event listener to the new tags button created.
   *
   */
  addEventListenerOnNewTagsButton() {
    const tagButtons = Array.from(this.tagsWrapper.querySelectorAll(".btn"));
    tagButtons.map((btn) => btn.addEventListener("click", this.deleteTag));
  }

  /**
   * addEventListenerOnNewTagsItems Function
   * Add a event listener to the new tags item created.
   *
   */
  addEventListenerOnNewTagsItems() {
    const dropDownItem = Array.from(document.querySelectorAll(".dropdown-item"));
    dropDownItem.map((item) => item.addEventListener("click", this.handleClickOnItems.bind(this)));
  }

  /**
   * deleteTag Function
   * Delete the clicked tag.
   */
  deleteTag() {
    this.remove();
  }

  /**
   * initData Function
   * Fetch recipe data.
   */
  initData() {
    (async function () {
      return await loadData();
    })().then((result) => {
      this.createTagsDropdown(result);
      this.createCards(result);
    });
  }

  /**
   * createTagsDropdown Function
   * Dropdown tags created from data.
   * @param {array} data
   */
  createTagsDropdown(data) {
    const ingredientsWrapper = document.querySelector(".dropdown-menu-ingredients");
    const applianceWrapper = document.querySelector(".dropdown-menu-appliance");
    const ustensilsWrapper = document.querySelector(".dropdown-menu-ustensils");
    const allDropdowns = [ingredientsWrapper, applianceWrapper, ustensilsWrapper];

    allDropdowns.map((dropdown) => {
      dropdown.innerHTML = "";
    });

    new TagsDropdown(ingredientsWrapper, data, "ingredients", "ingredient").createTags();
    new TagsDropdown(applianceWrapper, data, "appliance").createTags();
    new TagsDropdown(ustensilsWrapper, data, "ustensils").createTags();

    this.addEventListenerOnNewTagsItems();
  }

  /**
   * createCards Function
   * Cards created from data.
   * @param  {array} data
   */
  createCards(data) {
    const cardWrapper = document.querySelector(".card-deck");
    cardWrapper.innerHTML = "";

    data.map((recette) => {
      const cardRecette = new RecipeCard(cardWrapper, recette);
      cardRecette.createCard();
    });
  }

  //////// FILTER LOGIC ////////

  /**
   * handleFilter Function
   * Trigger search function if the lenght of the word is greater than or equal to 3.
   * If no words are typed, show all results.
   */
  handleFilter() {
    const searchValue = this.searchInput.value;

    if (searchValue.length === 0) {
      this.initData();
    } else if (searchValue.length < 3) {
      return;
    } else {
      this.initFilterData(searchValue);
    }
  }

  /**
   * initFilterData Function
   * Fetch recipe data and filter data with the user's search
   * @param  {string} searchValue
   */
  initFilterData(searchValue) {
    (async function () {
      return await loadData();
    })().then((result) => {
      this.getFilterData(result, searchValue);
    });
  }

  /**
   * getFilterData Function
   * Filter the data according to their name and description field
   * @param  {array} data
   * @param  {string} searchValue
   */
  getFilterData(data, searchValue) {
    const filterData = data.filter((recipe) => {
      return recipe.name.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1 || recipe.description.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1;
    });

    this.createCards(filterData);
  }
}

export default Home;
