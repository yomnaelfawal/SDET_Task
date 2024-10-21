module.exports = {
    'Contact Us Test': function(browser){
        const contactPage = browser.page.contactUsForm();

        contactPage
            .navigate()
            .fillOutForm('test@hehe.com', '1200120012001200', 'hey its me im the problem its me')
            .makeSelection('WEBMASTER')
            .uploadFiles("./tests/dummy_files/mp3_test.mp3")
            .submit()
            .pause(10000)
            .end();
    }
}