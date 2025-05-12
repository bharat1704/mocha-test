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

  it('should log in to Salesforce', async () => {
    await driver.get('https://login.salesforce.com/');
    await driver.findElement(By.id('username')).sendKeys('bharatmali170dv@agentforce.com');
    await driver.findElement(By.id('password')).sendKeys('dvdvv', Key.ENTER);
    await driver.wait(until.urlContains('lightning.force.com'), 15000);
    const url = await driver.getCurrentUrl();
    expect(url).to.include('lightning.force.com');
  });

  it('should open Leads tab', async () => {
    await driver.get('https://orgfarm-4e30357e95-dev-ed.develop.lightning.force.com/lightning/o/Lead/home');
    const url = await driver.getCurrentUrl();
    expect(url).to.include('/Lead/home');
  });

  it('should create a new Lead', async () => {
    await driver.wait(until.elementLocated(By.xpath("//button[text()='New']")), 10000).click();
    await driver.wait(until.elementLocated(By.xpath("//button[@name='salutation']")), 10000).click();
    await driver.wait(until.elementLocated(By.xpath("//lightning-base-combobox-item[@data-value='Mrs.']")), 5000).click();
    await driver.findElement(By.xpath("//input[@name='lastName']")).sendKeys('Saini245');
    await driver.findElement(By.xpath("//input[@name='Company']")).sendKeys('Zomato245');
    await driver.findElement(By.xpath("//button[@name='SaveEdit']")).click();
    await driver.sleep(2000);
    const successText = await driver.getPageSource();
    expect(successText).to.include('Lead');
  });

  it('should convert the Lead', async () => {
    const converted = await driver.wait(until.elementLocated(By.xpath("//span[text()='Converted']")), 20000);
    await driver.executeScript("arguments[0].click();", converted);

    const convertedStatus = await driver.wait(until.elementLocated(By.xpath("//span[text()='Select Converted Status']")), 10000);
    await driver.executeScript("arguments[0].click();", convertedStatus);
    await driver.sleep(2000);
    await driver.findElement(By.xpath("//button[normalize-space()='Convert']")).click();
    
    
    const newUrl = await driver.getCurrentUrl();
    expect(newUrl).to.include('/view')
  });



});


