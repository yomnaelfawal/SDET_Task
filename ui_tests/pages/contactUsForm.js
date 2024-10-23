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
    errorsList: {
      selector: "#center_column > div > ol > li",
      suppressNotFoundErrors: true,
    },
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
        return this.assert.textContains(
          "@submissionMsg",
          "Your message has been successfully sent to our team."
        );
      },
      // checkForErrors(callback) {
      //   try {
      //     this.isPresent("@errorsList", (result) => {
      //       if (callback) {
      //         callback(true);
      //       }
      //     });
      //   } catch (NoSuchElement) {
      //     if (callback) {
      //       callback(false);
      //     }
      //   }
      // },
      checkForErrors(callback) {
        //try {
        this.element(
          "css selector",
          "#center_column > div > ol > li",
          (result) => {
            if (result.status != -1) {
              if (callback) {
                callback(true);
              }
            } else {
              if (callback) {
                callback(false);
              }
            }
          }
        );
        // } catch (error) {
        //   if (callback) {
        //     callback(false);
        //   }
        // }
        return this;
      },
    },
  ],
};
