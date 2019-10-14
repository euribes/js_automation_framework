let Page = require('./base_page');
const locator = require('../utils/locators');
const username = process.env.USERNAME;
const password = process.env.PASSWORD;
const usernameInputSelectorId = locator.usernameInput;
const passwordInputSelectorId = locator.passwordInput;
const signInButtonSelectorCss = locator.sign_in_btn;
const userInformationSelectorCss = locator.user_information;
const bannerSelectorCss = locator.banner;

let userInput, passwordInput, signInButton, userInfo, banner;

Page.prototype.submitAndLogin = async function() {
    userInput = await this.findById(usernameInputSelectorId);
    passwordInput = await this.findById(passwordInputSelectorId);
    signInButton = await this.findByName(signInButtonSelectorCss);
    await this.write(userInput, username);
    await this.write(passwordInput, password);
    await signInButton.click();
};

Page.prototype.checkUserIsLogged = async function() {
    userInfo = await this.findByCss(userInformationSelectorCss);
    banner = await this.findByCss(bannerSelectorCss);
    const result = await this.driver.wait(async function () {
        const bannerText = await banner.getText();
        const userText = await userInfo.getText();
        return {
            user_text: userText,
            banner_text: bannerText
        }
    }, 5000);
    return result;
};

module.exports = Page;