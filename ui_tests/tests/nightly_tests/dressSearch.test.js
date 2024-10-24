let searchPage, resultItem;

module.exports = {
  "@tags": ["nightly", "search", "dress"],

  beforeEach: function (browser) {
    searchPage = browser.page.ProductPage();
    searchPage.navigate();
  },
  afterEach: function (browser) {
    searchPage.end();
  },
};
