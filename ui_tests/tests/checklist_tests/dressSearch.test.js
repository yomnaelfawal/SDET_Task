let searchPage;

module.exports = {
  "@tags": ["checklist", "search", "dress"],

  beforeEach: function (browser) {
    home = browser.page.homePage();
    home.navigate().search("Dress").submitSearch();
    let currUrl = "";
    browser.getCurrentUrl(function (result) {
      currUrl = result.value;
    });
    searchPage = browser.page.productPage();
    searchPage.setUrl(currUrl);
  },

  "Search Result Verification: Matches Test": function (Browser) {
    searchPage.getSearchResults(function (results) {
      //use assert so if no test matches are found, the test suite fails and stops execution
      searchPage.assert.ok(results > 0, "Search yields no results");
    });
  },

  "Search Result Verification: All Dresses Test": function (browser) {
    searchPage.getSearchResults(function (results) {
      for (let i = 1; i <= results; i++) {
        resultItem = browser.page.productItem();
        resultItem.getName(i, function (productName) {
          browser.verify.ok(
            productName.toLowerCase().includes("dress"),
            `Product ${i} with name ("${productName}") is not a dress`
          );
        });
      }
    });
  },

  "Sort Price Low to High Test": function (browser) {
    let prevPrice, currPrice;
    searchPage.chooseSort(1).getSearchResults(function (results) {
      resultItem = browser.page.productItem();
      resultItem.getPrice(1, function (price) {
        prevPrice = price;
        for (let i = 2; i <= results; i++) {
          resultItem = browser.page.productItem();
          resultItem.getPrice(i, function (price_iter) {
            currPrice = price_iter;
            resultItem.verify.ok(
              currPrice > prevPrice,
              `Dress at index ${i} is not sorted correctly. Previous price: ${prevPrice}, Current price: ${currPrice}`
            );
            prevPrice = currPrice;
          });
        }
      });
    });
  },

  "Sort Price High to Low Test": function (browser) {
    let prevPrice, currPrice;
    searchPage.chooseSort(2).getSearchResults(function (results) {
      resultItem = browser.page.productItem();
      resultItem.getPrice(1, function (price) {
        prevPrice = price;
        for (let i = 2; i <= results; i++) {
          resultItem = browser.page.productItem();
          resultItem.getPrice(i, function (price_iter) {
            currPrice = price_iter;
            resultItem.verify.ok(
              currPrice < prevPrice,
              `Dress at index ${i} is not sorted correctly. Previous price: ${prevPrice}, Current price: ${currPrice}`
            );
            prevPrice = currPrice;
          });
        }
      });
    });
  },

  "Sort Products by Name Ascendingly Test": function (browser) {
    let prevName, currName;
    searchPage.chooseSort(3).getSearchResults(function (results) {
      resultItem = browser.page.productItem();
      resultItem.getName(1, function (name) {
        prevName = name;
        for (let i = 2; i <= results; i++) {
          resultItem = browser.page.productItem();
          resultItem.getName(i, function (name_iter) {
            currName = name_iter;
            resultItem.verify.ok(
              currName.toLowerCase() >= prevName.toLowerCase(),
              `Dress at index ${i} is not sorted correctly. Previous name: ${prevName}, Current name: ${currName}`
            );
            prevName = currName;
          });
        }
      });
    });
  },

  "Sort Products by Name Descendingly Test": function (browser) {
    let prevName, currName;
    searchPage.chooseSort(4).getSearchResults(function (results) {
      resultItem = browser.page.productItem();
      resultItem.getName(1, function (name) {
        prevName = name;
        for (let i = 2; i <= results; i++) {
          resultItem = browser.page.productItem();
          resultItem.getName(i, function (name_iter) {
            currName = name_iter;
            resultItem.verify.ok(
              currName.toLowerCase() <= prevName.toLowerCase(),
              `Dress at index ${i} is not sorted correctly. Previous name: ${prevName}, Current name: ${currName}`
            );
            prevName = currName;
          });
        }
      });
    });
  },

  "Buy In/Out of Stock Item Test": function (browser) {
    searchPage.chooseSort(5).getSearchResults(function (results) {
      for (let i = 1; i <= results; i++) {
        resultItem = browser.page.productItem();
        resultItem.checkAvailability(i, function (outOfStock) {
          if (outOfStock) {
            resultItem.verify.hasClass(
              resultItem.getAddToCartBtnSelector(i),
              "disabled",
              "Form allows adding out of stock products to cart"
            );
          } else {
            resultItem.verify.hasClass(
              resultItem.getAddToCartBtnSelector(i),
              "enabled",
              "Form does not allow adding in stock products to cart"
            );
          }
        });
      }
    });
  },

  "List View Test": function (browser) {
    searchPage.chooseView("list").verifyListView();
  },

  afterEach: function (browser) {
    searchPage.end();
  },
};
