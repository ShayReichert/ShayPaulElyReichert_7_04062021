import { isElementExist } from "../functions/helpers";

class Search {
  /**
   * Create new search logic
   */
  constructor() {}

  /**
   * Hide cards if the search term or the tags does not appear in the recipe.
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

    const t1 = performance.now();
    // console.log("L'algo searchFromDOM a demandé " + (t1 - t0) + " millisecondes.");
  }

  /**
   * Return true if the recipe card contain the search value
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
   * Return true if the recipe card contain the active tag(s)
   */
  isRecipeContainActiveTags(tagCategory, card) {
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

    const allActiveTags = Array.from(document.querySelectorAll(`.tags-wrapper .btn.${className}-bg`));
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
}

export default Search;
