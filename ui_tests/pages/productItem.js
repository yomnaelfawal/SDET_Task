module.exports = {
    elements: {
        quickViewBtn : (index) => `#product_list > li:nth-child(${index}) > div > div.left-block > div > 
                                    div.quick-view-wrapper-mobile > a`,
        productName : (index) => `#product_list > li:nth-child(${index}) > div > div.right-block > h5 > a`,
        productPrice : (index) => `#product_list > li:nth-child(${index}) > div > div.right-block > div.content_price 
                                    > span.price.product-price`,
        addToCartBtn : (index) => `#product_list > li:nth-child(${index}) > div > div.right-block > div.button-container > span`,
        moreBtn : (index) => `#product_list > li:nth-child(${index}) > div > div.right-block > div.button-container > a`,
        colorList: (index) => `#product_list > li:nth-child(${index}) > div > div.right-block > div.color-list-container > ul`,
        availabilityTag : (index) => `#product_list > li:nth-child(${index}) > div > div.right-block > span > span`,
        compareBtn: (index) => `#product_list > li:nth-child(${index}) > div > div.functional-buttons.clearfix > div > a`,
    },

    data: {
        colorOptions : 0,
    },

    commands: [{
        getColorOptions(callback){
            const browser = this.api;
            browser.elements('css selector', `${this.elements.colorList} > *`, (result) => {
                this.data.colorOptions = result.value.length;
                if (callback){
                    callback(this.data.colorOptions);
                }
        });
            return this;
        },

        selectColor(index, color){
            return this
                    .click(`#product_list > li:nth-child(${index}) > div > div.right-block 
                            > div.color-list-container > ul > li:nth-child(${color})`);
        },

        checkAvailability(callback){
            this.element.availabilityTag.getText((result) => {
                const isAvailable = result.value.toLowerCase() === 'in stock';
                if (callback) {
                    callback(isAvailable);
                }
            });
            return this;
        },

        getPrice(callback){
            this.element.productPrice.getText((result) =>{
                //remove currency from price string
                const priceString = result.value.replace(/[^0-9.]+/g, '');
                //send price as a number not a string
                const productPrice = parseFloat(priceString);
                if (callback){
                    callback(productPrice);
                }
            });
            return this;
        },

        quickView(){
            return this.click('@quickViewBtn');
        },

        getName(callback){
            this.element.productName.getText((result) => {
                const productName = result.value;
                if (callback){
                    callback(productName);
                }
            });
            return this;
        },
    }],
};