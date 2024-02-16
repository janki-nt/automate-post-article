const { chromium } = require('playwright');

(async () => {
    // Launch the browser
    const browser = await chromium.launch({ headless: false });

    // Create a new browser context
    const context = await browser.newContext();

    // Create a new page
    const page = await context.newPage();

    // Navigate to the existing website
    await page.goto('https://parkingmanagement-react.pages.dev/');

    // Check if the container for the article exists, otherwise create it
    const containerExists = await page.$('.article-container');

    if (!containerExists) {
        await page.evaluate(() => {
            const articleContainer = document.createElement('div');
            articleContainer.classList.add('article-container');
            document.body.appendChild(articleContainer);
        });
    }

    // Add HTML content dynamically to create an article with two images
    await page.evaluate(async () => {
        const articleContainer = document.querySelector('.article-container');

        // Create and append the first image
        const img1 = document.createElement('img');
        img1.src = 'https://images.pexels.com/photos/593655/pexels-photo-593655.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=0.2';
        img1.alt = 'Image 1';
        // img1.height = "50px";
        // img1.width = "50px";
        articleContainer.appendChild(img1);

        // Create and append the second image
        const img2 = document.createElement('img');
        img2.src = 'https://images.pexels.com/photos/593655/pexels-photo-593655.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=0.2';
        img2.alt = 'Image 2';
        // img2.height = "50px";
        // img2.width = "50px";
        articleContainer.appendChild(img2);

        // Wait for images to load
        await Promise.all([img1, img2].map(img => img.decode()));

        // Optionally, you can add more content or formatting here
        const articleText = document.createElement('p');
        articleText.innerText = "This is the article content";
        articleContainer.appendChild(articleText);
    });

    // Take a screenshot of the new page
    await page.screenshot({ path: 'new_article_with_images.png', fullPage: true });

    // Close the browser
    await browser.close();
})();
