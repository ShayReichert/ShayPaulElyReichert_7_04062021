import { isElementExist } from "../../functions/helpers";

class MainSearch {
  /**
   * Create new main research logic
   */
  constructor() {}

  /**
   * Hide cards if the search term or the tags does not appear in the recipe.
   * @param {HTMLElement} input
   * @param {Number} t0 First time code for performance test
   */
  getFilterData(input, t0) {
    const allRecipeCards = Array.from(document.querySelectorAll(".cards-section .card"));

    allRecipeCards.map((card) => {
      if (
        this.isRecipeContainSearchTerm(input, card) &&
        this.isRecipeContainActiveTags("ingredients", card) &&
        this.isRecipeContainActiveTags("appliance", card) &&
        this.isRecipeContainActiveTags("ustensils", card)
      ) {
        card.classList.remove("hide");
      } else {
        card.classList.add("hide");
      }
    });

    this.handleNoResult();

    const t1 = performance.now(); // performance test
    // --- Uncomment the line below and open the console to activate test mode. --- //
    // console.log("L'algo searchFromDOM a demandé " + (t1 - t0) + " millisecondes."); // performance test
  }

  /**
   * Return true if the recipe card contain the search value.
   * @param {HTMLElement} input
   * @param {HTMLElement} card Div element (single recipe card to test)
   */
  isRecipeContainSearchTerm(input, card) {
    const searchValue = input.value;
    const recipeName = card.querySelector(".card-title").textContent;
    const recipeDescription = card.querySelector(".card-recipe").textContent;
    const recipeIngredients = card.querySelector(".card-ingredients").textContent;

    if (
      recipeName.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1 ||
      recipeDescription.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1 ||
      recipeIngredients.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1
    ) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Return true if the recipe card contain the active tag(s).
   * @param {string} tagCategory Tag category
   * @param {HTMLElement} card Div element (single recipe card to test)
   */
  isRecipeContainActiveTags(tagCategory, card) {
    const classColor = this.setClassName(tagCategory);
    const allActiveTags = Array.from(document.querySelectorAll(`.tags-wrapper .btn.${classColor}-bg`));
    const recipeContent = card.querySelector(`.card-${tagCategory}`).textContent;

    let isCardContainThisTag = [];
    let isCardContainsAllActiveTags = true;

    allActiveTags.map((tag) => {
      if (isElementExist(tag)) {
        if (recipeContent.toLowerCase().indexOf(tag.textContent.toLowerCase()) !== -1) {
          isCardContainThisTag.push(true);
        } else {
          isCardContainThisTag.push(false);
        }
      }
    });

    isCardContainsAllActiveTags = isCardContainThisTag.reduce((sum, next) => sum && next, true);

    return isCardContainsAllActiveTags;
  }

  /**
   * Return the correct tag's classname, according to the tag category.
   * @param {string} tagCategory Tag category
   */
  setClassName(tagCategory) {
    let className = "";

    switch (tagCategory) {
      case "ingredients":
        className = "primary";
        break;
      case "appliance":
        className = "success";
        break;
      case "ustensils":
      default:
        className = "danger";
    }

    return className;
  }

  /**
   * Show a "no result" text if no recipe match the input value.
   */
  handleNoResult() {
    const allRecipeCards = Array.from(document.querySelectorAll(".cards-section .card"));
    const noResultText = document.querySelector(".no-result");

    if (allRecipeCards.every((card) => card.classList.contains("hide"))) {
      noResultText.classList.remove("hide");
    } else {
      noResultText.classList.add("hide");
    }
  }
}

export default MainSearch;
