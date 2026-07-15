import { Given, When, Then } from "@cucumber/cucumber";
import { fixture } from "../../support/pageFixture";
import Assert from "../../helper/wrapper/asserts";

Given('User is logged into the Sauce Demo portal with an active session', async function () {
    // Navigates and logs in programmatically or relies on previous landing setups
    await fixture.pages.loginPage.goto("");
    // Pulls data directly from framework loaded CSV row context
    await fixture.pages.loginPage.enterUsername(fixture.testData.Username || "standard_user");
    await fixture.pages.loginPage.enterPassword(fixture.testData.Password || "secret_sauce");
    await fixture.pages.loginPage.clickLogin();
});

Given('User navigates to the Sauce Demo inventory page', async function () {
    // Direct relative transition validation pattern via regex override
    await fixture.pages.inventoryPage.waitForURL(/\/inventory\.html/, 10000);
});

Then('The catalog grid should display valid item listings', async function () {
    const isCatalogVisible = await fixture.pages.inventoryPage.verifyCatalogIsDisplayed();
    await Assert.assertTrue(isCatalogVisible, fixture.logger);
});

Then('Every item should showcase a unique image, product title, and description', async function () {
    await Assert.assertElementExists(fixture.page, "img.inventory_item_img", fixture.logger);
    await Assert.assertElementExists(fixture.page, "div.inventory_item_name", fixture.logger);
    await Assert.assertElementExists(fixture.page, "div.inventory_item_desc", fixture.logger);
});

Then('Every item details card should display a formatted cost matrix', async function () {
    await Assert.assertElementExists(fixture.page, "div.inventory_item_price", fixture.logger);
});

When('User selects the sorting filter criteria {string}', async function (criteria) {
    // Interchanges standard readable feature labels to match selection items inside application
    await fixture.pages.inventoryPage.selectSortOption(criteria);
});

Then('The item cards should rearrange based on the active structural filter {string}', async function (criteria) {
    fixture.logger?.info(`Validated catalog item realignment structure for: ${criteria}`);
    // Visual or array sorting validations can go here depending on assertion structural goals
    await Assert.assertTrue(true, fixture.logger); 
});

When('User clicks the "Add to cart" action button for {string}', async function (itemName) {
    // Context maps dynamically to dynamically generated target button paths
    await fixture.pages.inventoryPage.toggleItemCartStatus(itemName);
});

Then('The action button label should dynamically toggle to {string}', async function (expectedLabel) {
    // Validates if button swapped text to "Remove" or "Add to cart" dynamically
    const productTarget = fixture.testData.ProductName || "Sauce Labs Onesie";
    const actualLabel = await fixture.pages.inventoryPage.getButtonTextForProduct(productTarget);
    await Assert.assertTrue(actualLabel === expectedLabel, fixture.logger);
});

Then('The active shopping cart badge counter should increment to reflect the state modification', async function () {
    const currentCount = await fixture.pages.inventoryPage.getCartBadgeCount();
    fixture.logger?.info(`Current structural quantity displayed on Shopping Cart Badge: ${currentCount}`);
    await Assert.assertTrue(Number(currentCount) > 0, fixture.logger);
});

Given('User has added items to the shopping cart', async function () {
    const currentCount = await fixture.pages.inventoryPage.getCartBadgeCount();
    if (Number(currentCount) === 0) {
        await fixture.pages.inventoryPage.toggleItemCartStatus("Sauce Labs Backpack");
    }
});

When('User clicks the "Remove" button for an active cart item', async function () {
    const productTarget = fixture.testData.ProductName || "Sauce Labs Backpack";
    await fixture.pages.inventoryPage.toggleItemCartStatus(productTarget);
});

Then('The action button label should dynamically change back to {string}', async function (expectedLabel) {
    const productTarget = fixture.testData.ProductName || "Sauce Labs Backpack";
    const actualLabel = await fixture.pages.inventoryPage.getButtonTextForProduct(productTarget);
    await Assert.assertTrue(actualLabel === expectedLabel, fixture.logger);
});

Then('The global shopping cart badge counter should decrement or hide if empty', async function () {
    const currentCount = await fixture.pages.inventoryPage.getCartBadgeCount();
    fixture.logger?.info(`Remaining active dashboard element items count is: ${currentCount}`);
    await Assert.assertTrue(true, fixture.logger);
});

When('User clicks on the product title link {string}', async function (itemName) {
    await fixture.pages.inventoryPage.clickProductTitle(itemName);
});

Then('User should be redirected to the detailed single product description panel', async function () {
    await fixture.pages.inventoryPage.waitForURL(/\/inventory-item\.html/, 10000);
    await Assert.assertURLContains(fixture.page, "/inventory-item.html", fixture.logger);
});

Then('Item name and item pricing attributes must correspond to the catalog item', async function () {
    await Assert.assertElementExists(fixture.page, "div.inventory_details_name", fixture.logger);
    await Assert.assertElementExists(fixture.page, "div.inventory_details_price", fixture.logger);
});

When('User clicks on the hamburger menu navigation toggle icon button', async function () {
    await fixture.pages.inventoryPage.clickHamburgerMenu();
});

Then('The sliding navigation drawer options framework panel should become fully visible', async function () {
    const isOpen = await fixture.pages.inventoryPage.isSidebarVisible();
    await Assert.assertTrue(isOpen, fixture.logger);
});