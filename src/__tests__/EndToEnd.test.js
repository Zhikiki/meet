import puppeteer from 'puppeteer';
import { mockData } from '../mock-data';

describe('show/hide an event details', () => {
  let browser;
  let page;

  beforeAll(async () => {
    // increase time limitations for tests
    jest.setTimeout(900000);
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

describe('filter events by city', () => {
  let browser;
  let page;

  beforeAll(async () => {
    // increase time limitations for tests
    jest.setTimeout(900000);
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
    await page.waitForSelector('.CitySearch');
    await page.waitForSelector('.EventList');
  });
  afterAll(() => {
    browser.close();
  });

  test('When user hasn’t searched for specific city, show upcoming events from all cities', async () => {
    let allEventsShown = await page.$$eval(
      '.event',
      (element) => element.length
    );
    let mockDataLength = mockData.length;
    expect(allEventsShown).toEqual(mockDataLength);
    const suggestions = await page.$('.city .suggestions');
    expect(suggestions).toBeNull();
  });

  test('user should see a list of suggestions when they search for city', async () => {
    await page.type('.city', 'Berlin');

    const suggestions = await page.$$('.suggestions li');
    let suggestionLength = await page.$$eval(
      '.suggestions li',
      (element) => element.length
    );
    expect(suggestionLength).toEqual(2);
    expect(suggestions).toBeDefined();
  });

  test('User can select a city from the suggested list and see events in specified city', async () => {
    // If there are multiple elements satisfying the selector, the first will be clicked
    await page.click('.suggestions li');
    let locationElement = await page.$('.event .location');
    let locationValue = await locationElement.evaluate((el) => el.textContent);
    expect(locationValue).toContain('Berlin');

    // const trueLocation = async (locations) => {
    //   for (let index = 0; index < locations.length; index++) {
    //     const loco = await (
    //       await locations[index].getProperty('textContent')
    //     ).jsonValue();
    //     console.log(loco);
    //   }
    // };
    // console.log(await trueLocation(locations));
  });
});
