let form;

module.exports = {
  "@tags": ["nightly", "contact"],

  beforeEach: function (browser) {
    form = browser.page.contactUsForm();
    form.navigate();
  },

  checkSubmissionStatus: function (browser) {
    browser.getCurrentUrl(function (result) {
      if (form.url === result.value) {
        return true;
      }
      return false;
    });
  },

  "Submit Message Without Heading Test": function (browser) {
    form.fillOutForm("test@domain.com", "123", "Test Message").submit();
    const submitted = checkSubmissionStatus(form);
    if (submitted) {
      form.verify.fail("Form allows submission without a subject heading");
    } else {
      form.verify.textContains(
        "@errorsList",
        "Please select a subject from the list provided",
        "Form does not allow submission without a subject heading"
      );
    }
  },

  "Submit Message Without Email Test": function (browser) {
    form
      .fillOutForm("", "123", "Test Message")
      .makeSelection("webmaster")
      .submit();
    const submitted = checkSubmissionStatus(form);
    if (submitted) {
      form.verify.fail("Form allows submission without email");
    } else {
      form.verify.textContains(
        "@errorsList",
        "Invalid email address",
        "Form does not allow submission without email address"
      );
    }
  },
  "Submit Message Without Order Reference": function (browser) {
    form
      .fillOutForm("test@domain.com", "", "Test Message")
      .makeSelection("webmaster")
      .submit();
    const submitted = checkSubmissionStatus(form);
    if (submitted) {
      form.verify.fail("Form allows submission without order reference");
    } else {
      form.verify.textContains(
        "@errorsList",
        "Please enter order reference",
        "Form does not allow submission without order reference"
      );
    }
  },
};
