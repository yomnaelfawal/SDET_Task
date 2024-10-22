module.exports = {
    elements: {
        productList : '#product_list',
        gridView : '#grid',
        listView : '#list',
        sortByDropDown : '#selectProductSort',
    },

    data: {
        searchMatches: 0,
    },

    commands : [{
        getSearchResults(callback){
            const browser = this.api;
            browser.elements('css selector', `${this.elements.productList} > *`, (result) => {
                this.data.searchMatches = result.value.length;
                if (callback){
                    callback(this.data.searchMatches);
                }
        });
            return this;
        },

        chooseSort(value){
            //this function takes value as a parameter counting from top of the drop down list to bottom starting at 1
            return this
                    .click('@sortByDropDown')
                    .click(`#selectProductSort > option:nth-child(${value+1})`);
        },
        
        chooseView(view){
            if (view.toLowerCase() === 'grid'){
                return this.click('@gridView');
            } else if (view.toLowerCase() === 'list'){
                return this.click('@listView');
            }
        },
    }]
};