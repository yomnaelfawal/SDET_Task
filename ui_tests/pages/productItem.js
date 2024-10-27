module.exports = {
  commands: [
    {
      getProductNameSelector(index) {
        return `#product_list > li:nth-child(${index}) > div > div.right-block > h5 > a`;
      },
      getProductPriceSelector(index) {
        return `#product_list > li:nth-child(${index}) > div > div.right-block > div.content_price 
                                    > span.price.product-price`;
      },
      getAddToCartBtnSelector(index) {
        return `#product_list > li:nth-child(${index}) > div > div.right-block > div.button-container > span`;
      },
      getMoreBtnSelector(index) {
        return `#product_list > li:nth-child(${index}) > div > div.right-block > div.button-container > a`;
      },
      getColorListSelector(index) {
        return `#product_list > li:nth-child(${index}) > div > div.right-block > div.color-list-container > ul`;
      },
      getAvailabilityTagSelector(index) {
        return `#product_list > li:nth-child(${index}) > div > div.right-block > span > span`;
      },
      getCompareBtnSelector(index) {
        return `#product_list > li:nth-child(${index}) > div > div.functional-buttons.clearfix > div > a`;
      },
      getColorOptions(index, callback) {
        let colorOptions;
        const colorElementsSelector = this.getColorListSelector(index);
        browser.elements(
          "css selector",
          `${colorElementsSelector} > *`,
          (result) => {
            colorOptions = result.value.length;
            if (callback) {
              callback(colorOptions);
            }
          }
        );
        return this;
      },

      selectColor(index, color) {
        return this
          .click(`#product_list > li:nth-child(${index}) > div > div.right-block 
                            > div.color-list-container > ul > li:nth-child(${color})`);
      },

      checkAvailability(index, callback) {
        const availabilitySelector = this.getAvailabilityTagSelector(index);
        this.api.getText(availabilitySelector, (result) => {
          const isNotAvailable = result.value.toLowerCase() === "out of stock";
          if (callback) {
            callback(isNotAvailable);
          }
        });
        return this;
      },

      getPrice(index, callback) {
        const priceSelector = this.getProductPriceSelector(index);
        this.api.getText(priceSelector, (result) => {
          //remove currency from price string
          const priceString = result.value.replace(/[^0-9.]+/g, "");
          //send price as a number not a string
          const productPrice = parseFloat(priceString);
          if (callback) {
            callback(productPrice);
          }
        });
        return this;
      },

      getName(index, callback) {
        const nameSelector = this.getProductNameSelector(index);
        this.api.getText(nameSelector, (result) => {
          const productName = result.value;
          if (callback) {
            callback(productName);
          }
        });
        return this;
      },
    },
  ],
};
