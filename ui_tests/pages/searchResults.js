module.exports = {
    // url: '',

    elements: {
        productList : '#product_list',
        gridView : '#grid',
        listView : '#list',
        sortByDropDown : '#selectProductSort',
        productlist: '#product_list',
    },

    commands : [{
        // setUrl(url){
        //     this.url = url;
        // },
        chooseSort(value){
            return this
                    .click('@sortByDropDown')
                    .click(`#selectProductSort > option:nth-child(${value+1})`);
        }
    }]
}