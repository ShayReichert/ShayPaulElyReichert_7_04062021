import { createImageElement, createHTMLNodeElement, createNodesElements } from "../functions/helpers.js";
import placeholder from "../../assets/images/placeholder.png";
import clock from "../../assets/clock.svg";

/**
 * RecipeCard Component
 */
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
    this.id = recipeData.id;
    this.name = recipeData.name;
    this.time = recipeData.time;
    this.ingredients = recipeData.ingredients;
    this.description = recipeData.description;
    this.appliance = recipeData.appliance;
    this.ustensils = recipeData.ustensils;
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
    return createImageElement(placeholder, "Card image cap", "card-img-top");
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
    const appliance = this.getRecipeAppliance("p");
    const ustensils = this.getRecipeUstensils("p");
    const elements = [ingredients, description, appliance, ustensils];

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
    const clockIcon = createImageElement(clock, "", "clock-icon");
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

  /**
   * Generate the html of the recipe appliance
   */
  getRecipeAppliance(format = "p") {
    const className = "card-appliance display-none";
    return createHTMLNodeElement(format, this.appliance, className);
  }

  /**
   * Generate the html of the recipe ustensils
   */
  getRecipeUstensils(format = "p") {
    const allUstensils = this.ustensils;
    const className = "card-ustensils display-none";
    const ustensilsList = document.createElement("ul");

    allUstensils.map((ustensil) => {
      const ustensilNode = createHTMLNodeElement("li", ustensil);
      ustensilsList.append(ustensilNode);
    });

    return createNodesElements(format, this.ustensils, className);
  }
}

export default RecipeCard;
