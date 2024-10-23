module.exports = {
  url: "",

  elements: {
    productList: "#product_list",
    gridView: "#grid",
    listView: "#list",
    sortByDropDown: "#selectProductSort",
    searchTitle: "#center_column > h1 > span.lighter",
  },

  data: {
    searchMatches: 0,
  },

  commands: [
    {
      setUrl(currUrl) {
        this.url = currUrl;
        return this;
      },

      getSearchResults(callback) {
        const browser = this.api;
        browser.elements(
          "css selector",
          `${this.elements.productList} > *`,
          (result) => {
            this.data.searchMatches = result.value.length;
            if (callback) {
              callback(this.data.searchMatches);
            }
          }
        );
        return this;
      },

      chooseSort(value) {
        //this function takes value as a parameter counting from top of the drop down list to bottom starting at 1
        return this.click("@sortByDropDown").click(
          `#selectProductSort > option:nth-child(${value + 1})`
        );
      },

      chooseView(view) {
        if (view.toLowerCase() === "grid") {
          return this.click("@gridView");
        } else if (view.toLowerCase() === "list") {
          return this.click("@listView");
        }
      },
      verifyGridView() {
        return this.verify.cssClassPresent(
          "@gridView",
          "selected",
          "Grid view is selected"
        );
      },
      verifyListView() {
        return this.verify.cssClassPresent(
          "@listView",
          "selected",
          "List view is selected"
        );
      },
      verifySortSelection(value) {
        return this.verify.attributeEquals(
          `#selectProductSort > option:nth-child(${value + 1})`,
          "selected",
          "true",
          "Sort selection made successfully"
        );
      },
    },
  ],
};
