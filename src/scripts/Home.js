import { TagsDropdown, RecipeCard, MainSearch, TagsFiltering, TagsSearch } from "./classes/index.js";
import { loadData } from "./functions/helpers.js";
import { closeDropdownOnBodyClick, handleFocusOnDropdownInputs, setWidthOfInput, resetWidthOfInputs, createNewTag, deleteTag } from "./functions/dropdowns.js";

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
   * Add an eventListener to clickable elements.
   */
  addEventListenerOnElements() {
    this.body.addEventListener("click", () => closeDropdownOnBodyClick());
    this.dropdownInputs.map((input) => input.addEventListener("click", (e) => handleFocusOnDropdownInputs(e)));
    this.dropdownInputs.map((input) => input.addEventListener("keyup", (e) => handleFocusOnDropdownInputs(e)));
    this.dropdownInputs.map((input) => input.addEventListener("keyup", this.handleSearchOnDropdown));
    this.dropdownArrows.map((arrow) => arrow.addEventListener("click", (e) => setWidthOfInput(e)));
    this.dropDownItem.map((item) => item.addEventListener("click", this.handleClickOnItems.bind(this)));
    this.tagButtons.map((btn) => btn.addEventListener("click", this.handleDeleteTag.bind(this)));
    this.searchForm.addEventListener("submit", (e) => e.preventDefault());
    this.searchInput.addEventListener("keyup", this.handleSearch.bind(this));

    this.initData();
  }

  /**
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
   * Recipe cards created from data.
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
   * Add a event listener to the new tags item created.
   *
   */
  addEventListenerOnNewTagsItems() {
    const dropDownItem = Array.from(document.querySelectorAll(".dropdown-item"));
    dropDownItem.map((item) => item.addEventListener("click", this.handleClickOnItems.bind(this)));
  }

  /**
   * Manage the creation of new tags when clicking on an item in the dropdown list.
   */
  handleClickOnItems(e) {
    createNewTag(e);
    resetWidthOfInputs();
    this.addEventListenerOnNewTagsButton();
    this.handleSearch();
  }

  /**
   * Add a event listener to the new tags button created.
   */
  addEventListenerOnNewTagsButton() {
    const tagButtons = Array.from(this.tagsWrapper.querySelectorAll(".btn"));
    tagButtons.map((btn) => btn.addEventListener("click", this.handleDeleteTag.bind(this)));
  }

  /**
   * Delete the clicked tag.
   */
  handleDeleteTag(e) {
    deleteTag(e);
    this.handleSearch();
  }

  /**
   * Create a new search if the user enters a value in the search bar or click on tags filter.
   */
  handleSearch(tagValue) {
    const t0 = performance.now(); // performance test
    const myMainSearch = new MainSearch();
    const myTagsFiltering = new TagsFiltering();

    // Check length of search (if the search is from input)
    if (tagValue instanceof KeyboardEvent) {
      const searchValue = this.searchInput.value;

      if (searchValue.length === 0) {
        this.handleSearch();
      } else if (searchValue.length < 3) {
        return;
      }
    }

    myMainSearch.getFilterData(this.searchInput, t0);
    myTagsFiltering.showRecipeTagsOnly();
  }

  /**
   * Create a new tag's search when the user enters a value in dropdowns inputs.
   */
  handleSearchOnDropdown(e) {
    const searchValue = e.target.value;
    const myTagSearch = new TagsSearch();
    myTagSearch.getFilterTags(searchValue, e);
  }
}

export default Home;
