import { Given, When, Then } from "@cucumber/cucumber";
import { fixture } from "../../support/pageFixture";
import Assert from "../../helper/wrapper/asserts";

Given('User navigates to the Sauce Demo login page', async function () {
    // Navigates using the configuration BASEURL defined in your wrapper environment setup
    await fixture.pages.loginPage.goto(""); 
});

When('User attempts to login with credentials from test data {string}', async function (userType) {
    // framework already populated fixture.testData via the @Key:Login_01 hook execution
    const username = fixture.testData.Username;
    const password = fixture.testData.Password;

    // Execute actions utilizing your LoginPage object
    await fixture.pages.loginPage.enterUsername(username);
    await fixture.pages.loginPage.enterPassword(password);
    await fixture.pages.loginPage.clickLogin();
});

Then('User should be successfully redirected to the dashboard page', async function () {
    // Wait for the inventory page URL to guarantee transition
    await fixture.pages.loginPage.waitForURL("**/inventory.html");
    
    // Assert using your custom framework assertion helper
    await Assert.assertURLContains(fixture.page, "/inventory.html", fixture.logger);
});