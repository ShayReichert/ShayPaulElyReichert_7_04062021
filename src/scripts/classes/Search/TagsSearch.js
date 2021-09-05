class TagsSearch {
  /**
   * Create new tags research logic
   */
  constructor() {}

  /**
   * Hide tag if the search term does not match.
   * @param {string} searchValue
   * @param {MouseEvent} e
   */
  getFilterTags(searchValue, e) {
    const allDropdownTags = Array.from(e.target.parentNode.querySelectorAll(".dropdown-item"));

    allDropdownTags.map((tag) => {
      if (this.isTagContainSearchTerm(searchValue, tag)) {
        tag.classList.remove("hideSearch");
      } else {
        tag.classList.add("hideSearch");
      }
    });
  }

  /**
   * Hide tag if the search term does not match.
   * @param {string} searchValue
   * @param {HTMLElement} tag Tag Button HTML Element
   */
  isTagContainSearchTerm(searchValue, tag) {
    const tagValue = tag.textContent;

    if (tagValue.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1) {
      return true;
    } else {
      return false;
    }
  }
}

export default TagsSearch;
