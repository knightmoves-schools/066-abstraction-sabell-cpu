const http = require("http");
const fs = require("fs");
const puppeteer = require("puppeteer");
const { assert } = require("console");

let server;
let browser;
let page;

beforeAll(async () => {
  server = http.createServer(function (req, res) {
    fs.readFile(__dirname + "/.." + req.url, function (err, data) {
      if (err) {
        res.writeHead(404);
        res.end(JSON.stringify(err));
        return;
      }
      res.writeHead(200);
      res.end(data);
    });
  });

  server.listen(process.env.PORT || 3000);
});

afterAll(() => {
  server.close();
});

beforeEach(async () => {
  browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  page = await browser.newPage();
  await page.goto("http://localhost:3000/index.html");
});

afterEach(async () => {
  await browser.close();
});

describe('the index.js file', () => {
  it('should hide the `rate`', async function() {
      const rate = await page.evaluate(() => {
        let calculator = new TaxCalculator();
        return calculator.rate;
      });

      expect(rate).toBeUndefined();
  });

  it('should hide the `calculateExempt` method', async function() {
      const calulateExempt = await page.evaluate(() => {
        let calculator = new TaxCalculator();
        return calculator.calulateExempt;
      });

      expect(calulateExempt).toBeUndefined();
      
      await page.evaluate(() => {
        let calculator = new TaxCalculator();
        calculator.calculate();
      });
      
  });

  it('should hide the `calculateNonExempt` method', async function() {
      const calculateNonExempt = await page.evaluate(() => {
        let calculator = new TaxCalculator();
        return calculator.calculateNonExempt;
      });

      expect(calculateNonExempt).toBeUndefined();
      
      await page.evaluate(() => {
        let calculator = new TaxCalculator();
        calculator.calculate();
      });
  });
});

