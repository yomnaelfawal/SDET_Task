module.exports = {
  url: "http://automationpractice.multiformis.com/index.php",

  elements: {
    searchQuery: "#search_query_top",
    submitSearchBtn: "#searchbox > button",
  },

  commands: [
    {
      search(text) {
        return this.setValue("@searchQuery", text);
      },
      submitSearch() {
        return this.click("@submitSearchBtn");
      },
    },
  ],
};
