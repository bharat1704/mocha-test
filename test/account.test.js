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
    await driver.findElement(By.id('username')).sendKeys('bharatmali@agentforce.com');
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

it('Create a new Account', async () => {
    const newBtn = await driver.wait(until.elementLocated(By.xpath("//div[text()='New']")), 10000);
    await driver.wait(until.elementIsVisible(newBtn))
    await newBtn.click();

    const nameInput = await driver.wait(until.elementLocated(By.xpath("//input[@name='Name']")),7000);
      await nameInput.sendKeys("Test Account30");
    
    await driver.wait(until.elementLocated(By.xpath("//button[@name='SaveEdit']")),1000).click();
  
    const newUrl = await driver.getCurrentUrl();
    expect(newUrl).to.include('/lightning/o/Account')

    
  });


  it('Look up in a Contact Tab', async () => {

    await driver.get("https://orgfarm-4e30357e95-dev-ed.develop.lightning.force.com/lightning/o/Contact/home")
    const newBtn2 = await driver.wait(until.elementLocated(By.xpath("//button[@name='NewContact']")), 10000);
    await driver.wait(until.elementIsVisible(newBtn2))
    await newBtn2.click();

    const input = await driver.wait(until.elementLocated( By.xpath("//input[@placeholder='Search Accounts...']")), 10000);
      
      await driver.executeScript("arguments[0].click();", input);
      await input.sendKeys("Test Account30");

      await driver.sleep(2000);

      const dropdownItem = await driver.wait(until.elementLocated( By.xpath("//lightning-base-combobox-formatted-text[normalize-space()='Test Account30']")), 10000);
      await driver.executeScript("arguments[0].click();", dropdownItem);

      const newUrl2 = await driver.getCurrentUrl();
      expect(newUrl2).to.include('/lightning/o/Contact/new?count=')

      
      });
        


  });


  



