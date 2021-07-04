/**
 * RecipeCard Component
 */

import { createImageElement, createHTMLNodeElement, createNodesElements } from "../functions/helpers.js";

class RecipeCard {
  /**
   * Recipe card
   * @param {HTMLElement} parentElement Wrapper HTML element
   * @param {Object} recipeData Recipe data
   */
  constructor(parentElement, recipeData) {
    if (parentElement === null || typeof parentElement !== "object") {
      console.error("The first parameter of the RecipeCard must be a valid HTML element (such as a div or section).");
      return;
    }
    this.parentElement = parentElement;
    // this.allData = recipeData;
    this.id = recipeData.id;
    this.name = recipeData.name;
    this.time = recipeData.time;
    this.ingredients = recipeData.ingredients;
    this.description = recipeData.description;
  }

  /**
   * Create a recipe card
   */
  createCard() {
    const cardImage = this.getTheImage();
    const cardBody = this.getCardBody();
    const elements = [cardImage, cardBody];

    const card = createNodesElements("div", elements, "card");
    this.parentElement.append(card);
  }

  /**
   * Generate the <img> placeholder of the card
   */
  getTheImage() {
    return createImageElement("assets/images/placeholder.png", "Card image cap", "card-img-top");
  }

  /**
   * Generate the body of the card
   */
  getCardBody(format) {
    const firstRow = this.getFirstRow();
    const secondRow = this.getSecondRow();
    const elements = [firstRow, secondRow];

    return createNodesElements(format, elements, "card-body");
  }

  /**
   * Generate the first row of the card
   */
  getFirstRow(format) {
    const title = this.getRecipeTitle("h1");
    const time = this.getRecipeTime("div");
    const elements = [title, time];

    return createNodesElements(format, elements, "first-row");
  }

  /**
   * Generate the first row of the card
   */
  getSecondRow(format) {
    const ingredients = this.getRecipeIngredients("div");
    const description = this.getRecipeDescription("p");
    const elements = [ingredients, description];

    return createNodesElements(format, elements, "second-row");
  }

  /**
   * Generate the html of the recipe title
   */
  getRecipeTitle(format = "h1") {
    const className = "card-title";
    return createHTMLNodeElement(format, this.name, className);
  }

  /**
   * Generate the html of the recipe time
   */
  getRecipeTime(format = "div") {
    const className = "card-timer";
    const timeNode = createHTMLNodeElement(format, ` ${this.time} min`, className);

    // Create the <img> html element for the clock Icon
    const clockIcon = createImageElement("./assets/clock.svg", "", "clock-icon");
    timeNode.prepend(clockIcon);
    return timeNode;
  }

  /**
   * Generate the html of the recipe ingredients
   */
  getRecipeIngredients(format = "div") {
    const ingredientsWrapperNode = document.createElement(format);
    ingredientsWrapperNode.setAttribute("class", "card-ingredients");
    const ingredientsList = document.createElement("ul");

    this.ingredients.map((item) => {
      let ingredientName = "";
      const ingredientQuantity = item.quantity ? item.quantity : "";
      const ingredientUnit = item.unit ? item.unit : "";

      if (!item.quantity && !item.unit) {
        ingredientName = item.ingredient;
      } else {
        ingredientName = `${item.ingredient}: `;
      }

      const ingredientNode = createHTMLNodeElement("li", ` ${ingredientQuantity} ${ingredientUnit}`);
      const ingredientNameNode = createHTMLNodeElement("span", ingredientName);

      ingredientNode.prepend(ingredientNameNode);
      ingredientsList.append(ingredientNode);
    });

    ingredientsWrapperNode.appendChild(ingredientsList);
    return ingredientsWrapperNode;
  }

  /**
   * Generate the html of the recipe description
   */
  getRecipeDescription(format = "p") {
    const className = "card-recipe";
    return createHTMLNodeElement(format, this.description, className);
  }
}

export default RecipeCard;
