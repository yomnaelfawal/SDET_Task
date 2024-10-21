module.exports = {
    'Contact Us Test': function(browser){
        const contactPage = browser.page.contactUs();

        contactPage
            .navigate()
            .pause(2000)
            .fillOutForm('test@gmail.com', '123123', 'test messages')
            .makeSelection('WEBMASTER')
            .pause(2000)
            .sendMessage()
            .pause(5000)
            .end();
    }
}