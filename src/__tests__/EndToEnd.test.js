import puppeteer from 'puppeteer';

describe('show/hide an event details', () => {
  let browser;
  let page;

  beforeAll(async () => {
    // increase time limitations for tests
    jest.setTimeout(90000);
    // starts browser
    browser = await puppeteer.launch({
    //   headless: false,
    //   slowMo: 100, // slow down by 100ms
    //   ignoreDefaultArgs: ['--disable-extensions'], // ignores default setting that causes timeout errors
    });
    // browser opens new tab
    page = await browser.newPage();
    // in this tab browser opens page with given URL
    await page.goto('http://localhost:3000/');
    // On the loaded page we look for element with className="event"
    // waitForSelector - we wait until the component will be loaded
    await page.waitForSelector('.event');
  });
  afterAll(() => {
    browser.close();
  });

  test('An event element is collapsed by default', async () => {
    // Runs document.querySelector within the page. If no element matches the selector, the return value resolves to null.
    // $ returns the first CSS selector found with the given name
    const eventDetails = await page.$('.event .event__details');
    // we expect that event details doesn't exist on the page (collapsed by default)
    expect(eventDetails).toBeNull();
  });

  test('User can expand an event to see its details', async () => {
    await page.click('.event .details-button');
    const eventDetails = await page.$('.event .event__details');
    expect(eventDetails).toBeDefined();
  });

  test('User can collapse an event to hide its details', async () => {
    await page.click('.event .hide-details-button');
    const eventDetails = await page.$('.event .event__details');
    expect(eventDetails).toBeNull();
  });
});
