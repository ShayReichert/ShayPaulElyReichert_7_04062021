/**
 * TagsDropdown Component
 */

import { createHTMLNodeElement, createNodesElements } from "../functions/helpers.js";

class TagsDropdown {
  /**
   * Create a dropdown with all unique values from a category (fetch from data)
   * @param {HTMLElement} parentElement Wrapper HTML element
   * @param {Object} recipeData Recipe data
   * @param {string} className Tag class name
   */

  constructor(parentElement, recipeData, category, subcategory) {
    if (parentElement === null || typeof parentElement !== "object") {
      console.error("The first parameter of the TagsDropdown must be a valid HTML element (such as a div or section).");
      return;
    }
    this.parentElement = parentElement;
    this.allData = recipeData;
    this.category = category;
    this.key = subcategory;
  }

  /**
   * Create a dropdown with all tags
   */
  createTags() {
    const tagsData = this.getTagsData();
    // const tagsElement = this.getTagsElement(tagsData, this.category);
    const tagsElement = this.getTagsElementWork(tagsData, this.category);

    const colWrapper = createNodesElements("div", tagsElement, "dropdown-col");

    this.parentElement.append(colWrapper);
  }

  /**
   * Get corresponding values from recipes data
   */
  getTagsData() {
    let allDataArray = [];

    this.allData.map((recipe) => {
      let recipeCategory = "";

      if (recipe[this.category][0][this.key]) {
        recipeCategory = recipe[this.category][0][this.key];
      } else {
        recipeCategory = recipe[this.category];
      }

      allDataArray.push(recipeCategory);
    });

    const flatArray = allDataArray.flat();

    return this.getCleanDataArray(flatArray);
  }

  /**
   * Remove text between parentesis and duplicate values
   */
  getCleanDataArray(dirtyData) {
    let cleanArray = [];

    dirtyData.map((item) => {
      cleanArray.push(item.replace(/\(.[^(]*\)/g, "").toLowerCase());
      // ajouter regex pour virer les points à la fin
    });

    const uniqueValuesArray = [...new Set(cleanArray)];

    return uniqueValuesArray;
  }

  /**
   * Generate the html of all tags in dropdown
   */
  //   getTagsElementTEst(data, category) {
  //     const classColor = this.setClassName(category);
  //     const className = `dropdown-item ${classColor}-bg`;

  //     // let tenLinks = [];
  //     let colsArray = [];

  //     data.map((item, index) => {
  //       const isEndsWithZero = index % 10 === 0;

  //       if (isEndsWithZero) {
  //         let colWrapperNode = document.createElement("div");
  //         colWrapperNode.setAttribute("class", "dropdown-col");
  //         colsArray.push(colWrapperNode);
  //       }
  //     });

  //     console.log(colsArray.length);
  //     // créer un array avec [colsArray.length] d'arrays.
  //     // itérer sur cet array ?

  //     colsArray.map((col) => {
  //       while (col.childElementCount < 10) {
  //         data.map((item) => {
  //           const linkElement = createHTMLNodeElement("a", item, className);
  //           col.append(linkElement);
  //         });
  //       }
  //     });

  //     // console.log(test);

  //     // return colsArray;
  //   }

  /**
   * Generate the html of all tags in dropdown
   */
  getTagsElementWork(data, category) {
    const classColor = this.setClassName(category);
    const className = `dropdown-item ${classColor}-bg`;

    return data.map((item) => {
      return createHTMLNodeElement("a", item, className);
    });
  }

  /**
   * Set the class name of elements in the dropdown according to their category
   */
  setClassName(category) {
    let bootstrapClassName = "";

    switch (category) {
      case "ingredients":
        bootstrapClassName = "primary";
        break;
      case "ustensils":
        bootstrapClassName = "danger";
        break;
      case "appliance":
        bootstrapClassName = "success";
        break;
      default:
        console.error("Invalid dropdown tags category !");
    }

    return bootstrapClassName;
  }
}

export default TagsDropdown;
