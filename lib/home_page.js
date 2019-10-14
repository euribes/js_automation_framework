let Page = require('./base_page');
const locator = require('../utils/locators');
const username = process.env.USERNAME;
const password = process.env.PASSWORD;
const usernameInputSelectorId = locator.usernameInput;
const passwordInputSelectorId = locator.passwordInput;
const signInButtonSelectorCss = locator.sign_in_btn;
const resultConfirmationSelectorCss = locator.banner;

let userInput, passwordInput, signInButton, resultStat;

Page.prototype.submitAndLogin = async function() {
    userInput = await this.findById(usernameInputSelectorId);
    passwordInput = await this.findById(passwordInputSelectorId);
    signInButton = await this.findByName(signInButtonSelectorCss);
    await this.write(userInput, username);
    await this.write(passwordInput, password);
    await signInButton.click();
};

Page.prototype.checkUserIsLogged = async function() {
    this.waitUntilElementPresent(resultConfirmationSelectorCss);
    resultStat = await this.findByCss(resultConfirmationSelectorCss);
    // return await this.driver.wait(async function () {
    //     return await resultStat.getText();
    // }, 15000);
};

module.exports = Page;