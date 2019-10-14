require('dotenv').config()
const { describe, it, after, before } = require('mocha');
const Page = require('../lib/employee_page');
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
        describe ('Employees test cases', async function () {
            this.timeout(50000);
            let driver, page;

            this.beforeAll (async () => {
                page = new Page();
                driver = page.driver;
                await page.visit(url);
                await page.submitAndLogin();
            });

            this.afterAll (async () => {
                await page.quit();
            });

            it ('is able to create a new user', async () => {
                const result = await page.goToNewEmployeePage();
                expect(result.employee_text).to.include("New employee");
                await page.createNewEmployee();
            });

            it ('is able to check created employee is on the list', async () => {
                const result = await page.checkUserExists();
                expect(result.employees).to.be.a('number');
            });

            it ('is able to delete the employee', async () => {
                const result = await page.deleteUser();
            });

        });
    } catch (ex) {
        console.log (new Error(ex.message));
    } finally {

    }
})();