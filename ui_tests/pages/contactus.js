module.exports = {
    url: 'http://automationpractice.multiformis.com/index.php?controller=contact',

    elements: {
        subjectHeaderDropDown: '#id_contact',
        emailAddressInput: '#email',
        orderReferenceInput: '#id_order',
        fileUploader: '#fileUpload',
        messageForm: '#message',
        sendBtn: '#submitMessage',
    },

    commands: [{
        fillOutForm(email, order, message){
            return this
                    .setValue('@emailAddressInput', email)
                    .setValue('@orderReferenceInput', order)
                    .setValue('@messageForm', message);
        },
        makeSelection(text){
            if (text.toLowerCase() === 'webmaster')
                value = 3
            else if (text.toLowerCase() === ('customer service'))
                value = 2
            else
                value = 1
            return this
                    .click('@subjectHeaderDropDown')
                    .pause(100)
                    .click(`#id_contact > option:nth-child(${value})`);
        },
        submit(){
            return this
                    .waitForElementVisible('@sendBtn')
                    .click('@sendBtn');
        },
        uploadFiles(filePath){
             return this
                    .setValue('@fileUploader', require('path').resolve(filePath));
                    
        },
    }]

};