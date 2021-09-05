class TagFiltering {
  /**
   * Create a new filtering of the tags (according to the filtered recipes)
   */
  constructor() {}

  /**
   * Show only tags that appear in visible recipes (after filtering the search).
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
   * Returns true if the tag appears in the ingredients, appliance, or ustensils of at least one visible recipe.
   * @param {string} tag Tag text
   * @param {string} tagCategory Tag category
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
   * Return the correct tag's category, according to the tag class name.
   * @param {HTMLElement} tag Tag Button HTML Element
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

export default TagFiltering;
