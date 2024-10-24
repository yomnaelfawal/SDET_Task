let form;

module.exports = {
  "@tags": ["nightly", "contact"],

  beforeEach: function (browser) {
    form = browser.page.contactUsForm();
    form.navigate();
  },

  "Submit Message Without Heading Test": function (browser) {
    form
      .fillOutForm("test@domain.com", "123", "Test Message")
      .submit()
      .verify.elementPresent(
        "@errorsHeader",
        "Form allows submission without heading"
      )
      .verify.textContains(
        "@errorsList",
        "Please select a subject from the list provided",
        "Form does not notify user of error due to not choosing a subject"
      );
  },

  "Submit Message Without Email Test": function (browser) {
    form
      .fillOutForm("", "123", "Test Message")
      .makeSelection("webmaster")
      .submit()
      .verify.elementPresent(
        "@errorsHeader",
        "Form allows submission without email"
      )
      .verify.textContains(
        "@errorsList",
        "Invalid email address",
        "Form does not notify user of error due to invalid email address"
      );
  },

  "Submit Message Without Order Reference - Customer Service Test": function (
    browser
  ) {
    form
      .fillOutForm("test@domain.com", "", "Test Message")
      .makeSelection("customer service")
      .submit()
      .verify.elementPresent(
        "@errorsHeader",
        "Form allows submission without order reference"
      );
    form.verify.textContains(
      "@errorsList",
      "Please enter order reference",
      "Form does not notify user of error due to not providing an order reference"
    );
  },

  "Submit Message Without Message Body Test": function (browser) {
    form
      .fillOutForm("test@domain.com", "123", "")
      .makeSelection("customer service")
      .submit()
      .verify.elementPresent(
        "@errorsHeader",
        "Form allows submission without message body"
      );
    form.verify.textContains(
      "@errorsList",
      "The message cannot be blank",
      "Form does not notify user of error due to blank message"
    );
  },

  "Submit Message with Invalid Email Format Test": function (browser) {
    form
      .fillOutForm("test.com", "123", "This is a test message")
      .makeSelection("Webmaster")
      .submit()
      .verify.elementPresent(
        "@errorsHeader",
        "Form allows submission with invalid email address format"
      )
      .verify.textContains(
        "@errorsList",
        "Invalid email address",
        "Form does not notify user of error due to invalid email address format"
      );
  },

  "Submit Form with PDF File Test": function (browser) {
    form
      .fillOutForm("test@domain.com", "123", "This is a test message")
      .makeSelection("webmaster")
      .uploadFiles("./tests/test_files/pdf_test.pdf")
      .submit()
      .checkSubmissionSuccess();
  },

  "Submit Form with JPG File Test": function (browser) {
    form
      .fillOutForm("test@domain.com", "123", "This is a test message")
      .makeSelection("webmaster")
      .uploadFiles("./tests/test_files/jpg_test.jpg")
      .submit()
      .checkSubmissionSuccess();
  },

  "Submit Form with JSON File Test": function (browser) {
    form
      .fillOutForm("test@domain.com", "123", "This is a test message")
      .makeSelection("webmaster")
      .uploadFiles("./tests/test_files/json_test.json")
      .submit()
      .verify.elementPresent(
        "@errorsHeader",
        "Form allows submission with a JSON file upload"
      );
    form.verify.textContains(
      "@errorsList",
      "Bad file extension",
      "Form does not notify user of error due to file type incompatibility"
    );
  },

  "Submit Form without Email and without Message Test": function (browser) {
    form
      .fillOutForm("", "123", "")
      .makeSelection("customer service")
      .submit()
      .verify.elementPresent(
        "@errorsHeader",
        "Form allows submission without email and message"
      )
      .verify.textContains(
        "@errorsList",
        "The message cannot be blank",
        "Form does not notify user of error due to blank message"
      )
      .verify.textContains(
        "@errorsList",
        "Invalid email address",
        "Form does not notify user of error due to invalid email address"
      );
  },

  "Submit empty Form Test": function (browser) {
    form
      .submit()
      .verify.elementPresent("@errorsHeader", "Form allows empty submission")
      .verify.textContains(
        "@errorsList",
        "The message cannot be blank",
        "Form does not notify user of error due to blank message"
      )
      .verify.textContains(
        "@errorsList",
        "Invalid email address",
        "Form does not notify user of error due to invalid email address"
      )
      .verify.textContains(
        "@errorsList",
        "Please enter order reference",
        "Form does not notify user of error due to not providing an order reference"
      )
      .verify.textContains(
        "@errorsList",
        "Please select a subject from the list provided",
        "Form does not notify user of error due to not choosing a subject"
      );
  },

  afterEach: function (browser) {
    form.end();
  },
};
