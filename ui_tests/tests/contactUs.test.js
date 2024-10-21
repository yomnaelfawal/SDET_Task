module.exports = {
    'Contact Us Test': function(browser){
        const contactPage = browser.page.contactUs();

        contactPage
            .navigate()
            .fillOutForm('test@hehe.com', '1200120012001200', 'hey its me im the problem its me')
            .makeSelection('WEBMASTER')
            .uploadFiles("D:/Coding/Coursera/git-cheat-sheet-education.pdf")
            .submit()
            .end();
    }
}