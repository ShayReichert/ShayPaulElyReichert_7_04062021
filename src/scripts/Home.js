import TagButton from "./classes/TagButton.js";
import TagsDropdown from "./classes/TagDropdown.js";
import RecipeCard from "./classes/Card";
import Search from "./classes/Search";
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
    this.body = document.querySelector("body");
    this.dropdownsWrapper = document.querySelector(".dropdowns-wrapper");
    this.dropdownInputs = Array.from(this.dropdownsWrapper.querySelectorAll(".form-control"));
    this.dropdownArrows = Array.from(document.querySelectorAll(".dropdown-toggle"));
    this.tagsWrapper = document.querySelector(".tags-wrapper");
    this.dropDownItem = Array.from(document.querySelectorAll(".dropdown-item"));
    this.tagButtons = Array.from(this.tagsWrapper.querySelectorAll(".btn"));
    this.searchForm = document.querySelector(".search-section .form-inline");
    this.searchInput = document.querySelector(".search-input");
  }

  /**
   * addEventListenerOnElements Function
   * Add an eventListener to clickable elements.
   */
  addEventListenerOnElements() {
    this.body.addEventListener("click", this.closeDropdownOnBodyClick);
    this.dropdownInputs.map((input) => input.addEventListener("click", this.handleClickOnDropdownInputs.bind(this)));
    this.dropdownInputs.map((input) => input.addEventListener("keyup", this.handleSearchOnDropdown));
    this.dropdownArrows.map((arrow) => arrow.addEventListener("click", this.setWidthOfInput));
    this.dropDownItem.map((item) => item.addEventListener("click", this.handleClickOnItems.bind(this)));
    this.tagButtons.map((btn) => btn.addEventListener("click", this.deleteTag.bind(this)));
    this.searchForm.addEventListener("submit", (e) => e.preventDefault());
    this.searchInput.addEventListener("keyup", this.handleSearch.bind(this));

    this.initData();
  }

  /**
   * closeDropdownOnBodyClick Function
   * On click on body page, close open dropdowns
   */
  closeDropdownOnBodyClick() {
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
   * handleClickOnDropdownInputs Function
   * On click on the input, manage the behavior of the dropdowns
   */
  handleClickOnDropdownInputs(e) {
    const self = e.target;

    this.clearInputOnClick(self);
    this.openDropdown(e, self);
  }

  /**
   * clearInputOnClick Function
   * Replace the input value with the placeholder value (if there is currently no search).
   */
  clearInputOnClick(self) {
    if (self.value === "Ingrédients" || self.value === "Appareil" || self.value === "Ustensiles") {
      self.value = "";
    }
  }

  /**
   * openDropdown Function
   * Open the dropdown (if it is not already open)
   */
  openDropdown(e, self) {
    e.stopPropagation();
    const isDropdownOpen = self.parentNode.querySelector(".dropdown-toggle").classList.contains("show");

    if (!isDropdownOpen) {
      self.parentNode.querySelector(".dropdown-toggle").click();
      self.focus();
    }
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

    if (window.screen.width >= 1200 && !isShow) {
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
    this.handleSearch();
  }

  /**
   * resetWidthOfInputs Function
   * Reset the width of all dropdowns input to their original width.
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
    tagButtons.map((btn) => btn.addEventListener("click", this.deleteTag.bind(this)));
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
  deleteTag(e) {
    let self = e.target;

    if (e.target.classList.contains("close-btn")) {
      if (e.target.parentElement) {
        e.target.parentElement.remove();
      }
      self.remove();
    }

    self.remove();
    this.handleSearch();
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

  /**
   * handleSearch Function
   * Create a new search if the user enters a value in the search bar or click on tags filter.
   */
  handleSearch(tagValue) {
    const t0 = performance.now();
    const mySearch = new Search();

    // Check length of search (if the search is from input)
    if (tagValue instanceof KeyboardEvent) {
      const searchValue = this.searchInput.value;

      if (searchValue.length === 0) {
        this.initData();
      } else if (searchValue.length < 3) {
        return;
      }
    }

    mySearch.getFilterData(this.searchInput, t0);
    mySearch.showRecipeTagsOnly();
  }

  /**
   * handleSearchOnDropdown Function
   * Description
   */
  handleSearchOnDropdown(e) {
    const searchValue = e.target.value;
    const myTagSearch = new Search();
    myTagSearch.getFilterTags(searchValue, e);
  }
}

export default Home;
