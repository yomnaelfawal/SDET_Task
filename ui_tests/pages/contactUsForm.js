module.exports = {
  url: "http://automationpractice.multiformis.com/index.php?controller=contact",

  elements: {
    subjectHeaderDropDown: "#id_contact",
    emailAddressInput: "#email",
    orderReferenceInput: "#id_order",
    fileUploader: "#fileUpload",
    messageForm: "#message",
    sendBtn: "#submitMessage",
    submissionMsg: "#center_column > p",
    errorsHeader: "#center_column > div > p",
    errorsList: "#center_column > div > ol > li",
  },

  commands: [
    {
      fillOutForm(email, order, message) {
        return this.setValue("@emailAddressInput", email)
          .setValue("@orderReferenceInput", order)
          .setValue("@messageForm", message);
      },
      makeSelection(text) {
        let value;
        if (text.toLowerCase() === "webmaster") value = 3;
        else if (text.toLowerCase() === "customer service") value = 2;
        else value = 1;
        return this.click("@subjectHeaderDropDown")
          .pause(100)
          .click(`#id_contact > option:nth-child(${value})`);
      },
      submit() {
        return this.waitForElementVisible("@sendBtn").click("@sendBtn");
      },
      uploadFiles(filePath) {
        return this.setValue(
          "@fileUploader",
          require("path").resolve(filePath)
        );
      },
      checkSubmissionSuccess() {
        this.waitForElementVisible("@submissionMsg");
        return this.verify.textContains(
          "@submissionMsg",
          "Your message has been successfully sent to our team."
        );
      },
    },
  ],
};
