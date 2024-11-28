const puppeteer = require('puppeteer');

async function scrapeGoogle(keyword) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`https://www.google.com/search?q=${encodeURIComponent(keyword)}`);

    // Extrahování přirozených výsledků
    const results = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('.tF2Cxc')).map(result => ({
            title: result.querySelector('h3')?.textContent || 'No title',
            url: result.querySelector('.yuRUbf a')?.href || 'No URL',
            snippet: result.querySelector('.IsZvec')?.textContent || 'No snippet',
        }));
    });

    await browser.close();
    return results;
}

module.exports = { scrapeGoogle };