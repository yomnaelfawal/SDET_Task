let home;

module.exports = {
  "@tags": ["smoke", "home"],

  before: function (browser) {
    home = browser.page.homePage();
    home.navigate();
  },

  "Home Page Visibility Test": function (browser) {
    home.assert
      .visible("@searchQuery", "Search bar is visible")
      .assert.visible("@submitSearchBtn", "Search button is visible");
  },
  "Home Basic Functionality Test": function (browser) {
    home
      .search("Dress")
      .assert.value(
        "@searchQuery",
        "Dress",
        "Search query accepts and displays keyboard input"
      )
      .submitSearch();
    browser.getCurrentUrl(function (result) {
      this.assert.notEqual(result.value, home.url, "URL changed after search");
    });
  },

  after: function (browser) {
    home.end();
  },
};
