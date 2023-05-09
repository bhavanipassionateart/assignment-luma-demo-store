const { Builder,By,Key,until } = require("selenium-webdriver")

const should = require ('chai').should();
require('dotenv').config();

// Login data
let user = process.env.USER;
let pass = process.env.PASS;

/*
As a user of LUMA Webstore, I would like to be able to login, so that I can see my profile
*/
// .only() -run only this test block // .skip() -skip this specific test
describe.only('Login to Luma Demostora', () => {
    context ('I click on login and enter my credentials', () => {
        it('I should be looged in and see my profile', async () => {
        const driver = await new Builder().forBrowser('firefox').build();
        try{
        //Go to the store
        await driver.get('https://magento.softwaretestingboard.com');
        await driver.findElement(By.css('.authorization-link > a:nth-child(1)')).click();

        // Get the form and 
        await driver.wait(until.elementLocated(By.id('email')),1000);

        //send keys
        await driver.findElement(By.id('email')).sendKeys(user);
        await driver.findElement(By.id('pass')).sendKeys(pass);

        // Click  login button
        await driver.findElement(By.css('#send2')).click();

        //Implict wait to allow site to load
        await driver.sleep(1000);

        // Get to oiur profile
        await driver.wait(until.elementLocated(By.css('.action.switch'),2000));
        await driver.findElement(By.css('.action.switch')).click();

        await driver.wait(until.elementsLocated(By.css('a[href$="/customer/account/"]')),1000);
        await driver.findElement(By.css('a[href$="/customer/account/"]')).click();

        // Get and check our information
        await driver.wait(until.elementLocated(By.css('.box-information ,box-content p')), 10000);
        const information =await driver.findElement(By.css('.box-information .box-content p')).getText();

        //Assert
        information.should.contain('Test Testsson');


    }catch (error) {
        console.log(error);
    }finally{
        await driver.quit();
    }
        });
    });
});