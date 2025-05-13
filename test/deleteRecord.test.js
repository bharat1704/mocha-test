const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const { expect } = require('chai');

describe('Salesforce Lead Creation Flow', function() {
  this.timeout(120000);
  let driver;

  before(async () => {
    const options = new chrome.Options().addArguments('--incognito');
    driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
  });

  after(async () => {
    if (driver) {
       await driver.quit();
    }
  });

  it('Log in to Salesforce', async () => {
    await driver.get('https://login.salesforce.com/');
    await driver.findElement(By.id('username')).sendKeys('test@agentforce.com');
    await driver.findElement(By.id('password')).sendKeys('test~', Key.ENTER);
    await driver.wait(until.urlContains('lightning.force.com'), 15000);
    const url = await driver.getCurrentUrl();
    expect(url).to.include('lightning.force.com');
  });

    it("Go to Account Tab", async()=> {
    
    await driver.get("https://orgfarm-4e30357e95-dev-ed.develop.lightning.force.com/lightning/o/Account/list")
    
    const accountUrl = await driver.getCurrentUrl();
    expect(accountUrl).to.include('/lightning/o/Account/');
    
})


 it('Delete the existing Account Record', async () => {
    
let dropdownIcon = await driver.wait(
      until.elementLocated(By.css('svg[data-key="down"]')),
      10000
    );
    await driver.wait(until.elementIsVisible(dropdownIcon), 5000);

    let clickableParent = await dropdownIcon.findElement(By.xpath("./ancestor::a"));

        await clickableParent.click();

   await driver.wait(until.elementLocated(By.xpath("//a[@title='Delete']")),10000).click();
  

   const confirmDeleteButton = await driver.wait(
      until.elementLocated(By.xpath("//span[text()='Delete']")),
      10000
    );

      await driver.wait(until.elementIsVisible(confirmDeleteButton), 5000).click();

    const newUrl = await driver.getCurrentUrl();
    expect(newUrl).to.include('/lightning/o/Account/list?filterName')
    
  });


  });

