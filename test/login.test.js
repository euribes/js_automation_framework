require('dotenv').config()
const { describe, it, after, before } = require('mocha');
const Page = require('../lib/login_page');
const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var url = process.env.URL;
const data = require('../utils/data');
const bannerText = data.banner_text;
const userText = data.username;

process.on('unhandledRejection', () => {});

(async function automation_test() {
    try {
        describe ('Login test cases', async function () {
            this.timeout(50000);
            let driver, page;

            this.beforeAll (async () => {
                page = new Page();
                driver = page.driver;
                await page.visit(url);
            });

            this.afterAll (async () => {
                await page.quit();
            });

            it ('user should be able to login', async () => {
                await page.submitAndLogin();
            });

            it ('user is logged', async () => {
                const result = await page.checkUserIsLogged();
                expect(result.user_text).to.include(userText);
                expect(result.banner_text).to.include(bannerText);
            });

        });
    } catch (ex) {
        console.log (new Error(ex.message));
    } finally {

    }
})();