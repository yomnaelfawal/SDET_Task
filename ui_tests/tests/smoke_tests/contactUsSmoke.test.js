let contactUsPage;

module.exports = {
  "@tags": ["smoke", "contact"],

  before: function (browser) {
    contactUsPage = browser.page.contactUsForm();
    contactUsPage.navigate();
  },

  "Contact Us Visibility Test": function (browser) {
    contactUsPage.assert
      .elementPresent(
        "@subjectHeaderDropDown",
        "Message subject heading is visible"
      )
      .assert.visible("@emailAddressInput", "Email input is visible")
      .assert.visible(
        "@orderReferenceInput",
        "Order Reference input is visible"
      )
      .assert.elementPresent("@fileUploader", "File upload field is visible")
      .assert.visible("@messageForm", "Message input field is visible")
      .assert.visible("@sendBtn", "Send message button is visible");
  },
  "Contact Us Basic Functionality Test": function (browser) {
    contactUsPage
      .fillOutForm("testemail@test.com", "1234", "this is a test message")
      .assert.valueEquals(
        "@emailAddressInput",
        "testemail@test.com",
        "Email input accepts and displays keyboard input"
      )
      .assert.valueEquals(
        "@orderReferenceInput",
        "1234",
        "Order reference input field accepts and displays input"
      )
      .assert.valueEquals(
        "@messageForm",
        "this is a test message",
        "Message input field accepts and displays input"
      )
      .makeSelection("customer service")
      .submit()
      .checkSubmissionSuccess();
  },

  after: function (browser) {
    contactUsPage.end();
  },
};
