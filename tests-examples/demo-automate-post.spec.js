const { chromium } = require('playwright');

describe('Automated Testing for Dynamic Article Creation', () => {
    let browser;
    let page;

    beforeAll(async () => {
        browser = await chromium.launch({ headless: true });
    });

    afterAll(async () => {
        await browser.close();
    });

    beforeEach(async () => {
        const context = await browser.newContext();
        page = await context.newPage();
        await page.goto('https://parkingmanagement-react.pages.dev/');
    });

    afterEach(async () => {
        await page.close();
    });

    test('Check if article container exists', async () => {
        const containerExists = await page.$('.article-container');
        expect(containerExists).not.toBeNull();
    });

    test('Check if images are added to the article container', async () => {
        await page.evaluate(async () => {
            const articleContainer = document.querySelector('.article-container');
            const images = articleContainer.querySelectorAll('img');
            expect(images.length).toBe(2);
        });
    });

    test('Check if article content is added to the article container', async () => {
        await page.evaluate(async () => {
            const articleContainer = document.querySelector('.article-container');
            const articleText = articleContainer.querySelector('p');
            expect(articleText.innerText).toBe("This is the article content");
        });
    });

    test('Check if images are loaded properly', async () => {
        await page.evaluate(async () => {
            const articleContainer = document.querySelector('.article-container');
            const images = articleContainer.querySelectorAll('img');
            const imagePromises = Array.from(images).map(img => img.decode());
            await Promise.all(imagePromises);
            for (const img of images) {
                expect(img.complete && img.naturalHeight !== 0).toBeTruthy();
            }
        });
    });
});
