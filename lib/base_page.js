const {Builder, By, until} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
let o = new chrome.Options();
o.addArguments('start-fullscreen');
o.addArguments("--disable-popup-blocking");
//o.addArguments('disable-infobars');
//o.addArguments('headless'); // running test on visual chrome browser
o.setUserPreferences({ credential_enable_service: false });
const data = require('../utils/data');
const lead = data.new_user_lead;

var Page = function() {
    this.driver = new Builder()
        .setChromeOptions(o)
        .forBrowser('chrome')
        .build();
    // visit a webpage
    this.visit = async function(theUrl) {
        return await this.driver.get(theUrl);
    };

    // quit current session
    this.quit = async function() {
        return await this.driver.quit();
    };

    // wait and find a specific element with it's id
    this.findById = async function(id) {
        await this.driver.wait(until.elementLocated(By.id(id)), 15000, 'Looking for '+ id +' element');
        return await this.driver.findElement(By.id(id));
    };

    // wait and find a specific element with it's name
    this.findByName = async function(name) {
        await this.driver.wait(until.elementLocated(By.name(name)), 15000, 'Looking for '+ name +' element');
        return await this.driver.findElement(By.name(name));
    };

    // wait and find a specific element with it's css
    this.findByCss = async function(css) {
        await this.driver.wait(until.elementLocated(By.css(css)), 15000, 'Looking for '+ css +' element');
        return await this.driver.findElement(By.css(css));
    };

    // fill input web elements
    this.write = async function (el, txt) {
        return await el.sendKeys(txt);
    };

    // wait and find elemens by css
    this.findAll = async function (css){
        await this.driver.findElements(By.css(css));
    };

    // wait and find element on table
    this.findElementRow = async function (css){
        var ids = [];
        var rows = await this.driver.findElements(By.css(css));
        for(var i = 0;i < rows.length; i++){
            await rows[i].getText().then(function(txt){
                if(txt.includes(lead)){
                    ids.push(i);
                }
            })
        }
        return await{
            id: ids
        }
    };

    // wait and deletes element on table
    this.deleteEmployee = async function (xpath){
        var employee = await this.driver.findElement(By.xpath(xpath));
        await employee.click();
        await this.driver.wait(until.alertIsPresent(), 10000).then(() => {
            this.driver.switchTo().alert().accept();
            //this.driver.executeScript('');
        });
        
    };

    // wait and get current employee id number
    this.getCurrentEmployee = async function (css){
        await this.driver.wait(until.elementLocated(By.css(css)), 15000, 'Looking for '+ css +' element');
        return await this.driver.findElement(By.css(css)).getAttribute("href").then(function(txt){
            return txt;
        });
    };
};

module.exports = Page;