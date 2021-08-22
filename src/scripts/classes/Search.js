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
   * Return true if the recipe card contain the search value.
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
   * TAGS FILTERING : Show only tags that appear in visible recipes (after filtering the search).
   */
  showRecipeTagsOnly() {
    const allDropdownTags = Array.from(document.querySelectorAll(".dropdown-section .dropdown-item"));

    allDropdownTags.map((tag) => {
      const tagCategory = this.setTagCategory(tag);
      const thisTagIsInAVisibleRecipe = this.isInAVisibleRecipe(tag.textContent, tagCategory);

      if (thisTagIsInAVisibleRecipe) {
        tag.classList.remove("hide");
      } else {
        tag.classList.add("hide");
      }
    });
  }

  /**
   * TAGS FILTERING: Returns true if the tag appears in the ingredients, appliance, or ustensils of at least one visible recipe.
   */
  isInAVisibleRecipe(tag, tagCategory) {
    const activeCards = Array.from(document.querySelectorAll(".cards-section .card:not(.hide)"));

    const arrayOfBooleans = activeCards.map((card) => {
      const recipeTagCategory = card.querySelector(`.card-${tagCategory}`).textContent;

      if (recipeTagCategory.toLowerCase().indexOf(tag.toLowerCase()) !== -1) {
        return true;
      } else {
        return false;
      }
    });

    return arrayOfBooleans.some((elem) => elem);
  }

  /**
   * TAGS FILTERING: Return the correct tag's category, according to the tag class name.
   */
  setTagCategory(tag) {
    let tagClassNames = tag.classList;
    let tagCategory = "";

    if (tagClassNames.contains("primary-bg")) {
      tagCategory = "ingredients";
    } else if (tagClassNames.contains("success-bg")) {
      tagCategory = "appliance";
    } else {
      tagCategory = "ustensils";
    }

    return tagCategory;
  }
}

export default Search;
