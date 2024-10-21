module.exports = {
    'Home Page Search Test': function(browser){
        let currPage = browser.page.homePage();

        currPage
            .navigate()
            .search('Dresses');
        
        currPage = browser.page.searchResults();

        currPage
            //.setUrl(currUrl)
            .chooseSort(1)
            .pause(3000)
            .end();
        
    }
}