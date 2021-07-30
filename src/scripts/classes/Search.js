import { isElementExist } from "../functions/helpers";

class Search {
  /**
   * Create new search logic
   */
  constructor() {}

  /**
   * Init a search from search input.
   */
  searchWithInput(searchValue, t0) {
    this.getFilterData(searchValue, t0);
  }

  /**
   * Hide cards if the search term does not appear in the recipe.
   */
  getFilterData(searchValue, t0) {
    const allRecipeCards = Array.from(document.querySelectorAll(".cards-section .card"));

    allRecipeCards.map((card) => {
      // console.log(this.isRecipeContainIngredientsTags(card));

      if (this.isRecipeContainSearchTerm(searchValue, card) && this.isRecipeContainIngredientsTags(card)) {
        card.classList.remove("hide");
      } else {
        card.classList.add("hide");
      }
    });

    const t1 = performance.now();
    // console.log("L'algo searchFromDOM a demandé " + (t1 - t0) + " millisecondes.");
  }

  isRecipeContainSearchTerm(searchValue, card) {
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

  isRecipeContainIngredientsTags(card) {
    const activeTag = document.querySelector(".tags-wrapper .btn");
    const recipeIngredients = card.querySelector(".card-ingredients").textContent;

    if (isElementExist(activeTag)) {
      if (recipeIngredients.toLowerCase().indexOf(activeTag.textContent.toLowerCase()) !== -1) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }
}

export default Search;
