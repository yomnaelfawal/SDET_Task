let searchResultPage;

module.exports = {
  "@tags": ["smoke", "search"],

  before: function (browser) {
    searchResultPage = browser.page.productPage();
    searchResultPage
      .setUrl(
        "http://automationpractice.multiformis.com/index.php?controller=search&orderby=position&orderway=desc&search_query=Dress&submit_search="
      )
      .navigate();
  },

  "Search Result Page Visibility Test": function (browser) {
    searchResultPage.verify
      .visible("@searchTitle", "Search Title is visible")
      .verify.visible("@gridView", "Grid view option is visible")
      .verify.visible("@listView", "List view option is visible")
      .verify.elementPresent("@sortByDropDown", "Sort by drop down is visible")
      .verify.elementPresent(
        "@productList",
        "Product list of search results is visible"
      );
  },
  "Search Result Page Basic Functionality Test": function (browser) {
    searchResultPage
      .chooseView("grid")
      .verifyGridView()
      .chooseSort(2)
      .verifySortSelection(2);
  },

  after: function (browser) {
    searchResultPage.end();
  },
};
