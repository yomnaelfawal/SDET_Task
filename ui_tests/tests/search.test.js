module.exports = {
    'Home Page Search Test': function(browser){
        let currPage = browser.page.homePage();

        currPage
            .navigate()
            .search('Dresses');

        let currUrl = '';
        browser.getCurrentUrl(function(result){
            currUrl = result.value;
        });    

        currPage = browser.page.searchResultsPage();

        currPage
            .chooseSort(1)
            .chooseView('LIST')
            .pause(3000)
            .end();
        
    }
}