import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { fixture } from "../../support/pageFixture";
import Assert from "../../helper/wrapper/asserts";

// Sets Cucumber's step timeout to match your configuration (120 seconds)
setDefaultTimeout(120000);

Given('User navigates to the Sauce Demo login page', async function () {
    await fixture.pages.loginPage.goto(""); 
});

When('User attempts to login with credentials from test data {string}', async function (userType) {
    // Framework handles reading row values via hooks.ts automatically
    const username = fixture.testData.Username || "";
    const password = fixture.testData.Password || "";

    await fixture.pages.loginPage.enterUsername(username);
    await fixture.pages.loginPage.enterPassword(password);
    await fixture.pages.loginPage.clickLogin();
});

Then('User should be successfully redirected to the dashboard page', async function () {
    // Pass an explicit RegExp object so your wrapper uses it directly without escaping it
    await fixture.pages.loginPage.waitForURL(/\/inventory\.html/, 15000);
    
    // Assert using your custom framework assertion helper
    await Assert.assertURLContains(fixture.page, "/inventory.html", fixture.logger);
});

Then('An error message should be displayed on the login page', async function () {
    // 1. Verify that the error element container is visible on screen
    await Assert.assertElementExists(
        fixture.page, 
        fixture.pages.loginPage.errorMessageContainer, 
        fixture.logger
    );

    // 2. Fetch the text content dynamically to verify the actual error text thrown by the app
    const actualErrorText = await fixture.pages.loginPage.getText(fixture.pages.loginPage.errorMessageContainer);
    fixture.logger?.info(`Captured application error message text: "${actualErrorText}"`);
    
    // 3. Optional: Validate against an expected error value if you add an 'ExpectedStatus' column to your CSV
    if (fixture.testData.ExpectedStatus) {
        await Assert.assertTextContents(
            fixture.page, 
            fixture.pages.loginPage.errorMessageContainer, 
            fixture.testData.ExpectedStatus, 
            fixture.logger
        );
    }
});

Then('User should remain on the login page', async function () {
    // Assert that the active URL hasn't navigated away from the core index context
    await Assert.assertURLContains(fixture.page, "saucedemo.com", fixture.logger);
    
    // Double check that the login button is still visible on the user view
    const isLoginButtonVisible = await fixture.pages.loginPage.elementVisible("input#login-button");
    await Assert.assertTrue(isLoginButtonVisible, fixture.logger);
});