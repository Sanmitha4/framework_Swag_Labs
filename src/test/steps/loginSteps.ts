import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { fixture } from "../../support/pageFixture";
import Assert from "../../helper/wrapper/asserts";

// Set Cucumber's step timeout to match your configuration (120 seconds)
setDefaultTimeout(120000);

Given('User navigates to the Sauce Demo login page', async function () {
    await fixture.pages.loginPage.goto(""); 
});

When('User attempts to login with credentials from test data {string}', async function (userType) {
    const username = fixture.testData.Username;
    const password = fixture.testData.Password;

    await fixture.pages.loginPage.enterUsername(username);
    await fixture.pages.loginPage.enterPassword(password);
    await fixture.pages.loginPage.clickLogin();
});

Then('User should be successfully redirected to the dashboard page', async function () {
    // Wait for the inventory page URL safely
    await fixture.pages.loginPage.waitForURL("**/inventory.html", 15000);
    
    // Assert using your custom framework assertion helper
    await Assert.assertURLContains(fixture.page, "/inventory.html", fixture.logger);
});