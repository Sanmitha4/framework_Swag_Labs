import { Page } from "@playwright/test";
import PlaywrightWrapper from "../helper/wrapper/PlaywrightWrappers";
import { HTMLSubStepLogger } from "../support/htmllSubStepLogger";

export default class InventoryPage extends PlaywrightWrapper {

    // 🎯 Selectors mapped from the inventory visuals
    private readonly productItems = "div.inventory_item";
    private readonly productNames = "div.inventory_item_name";
    private readonly productPrices = "div.inventory_item_price";
    private readonly sortDropdown = "select.product_sort_container";
    private readonly cartBadge = "span.shopping_cart_badge";
    private readonly menuButton = "button#react-burger-menu-btn";
    private readonly sidebarPanel = "div.bm-menu-wrap";

    constructor(page: Page, logger: HTMLSubStepLogger) {
        super(page, logger);
    }

    // Dynamic locator generator to target a specific item's button based on its name
    private getItemActionButton(itemName: string) {
        return `//div[text()='${itemName}']/ancestor::div[@class='inventory_item_description']//button`;
    }

    // Dynamic locator generator to target a product title link
    private getItemTitleLink(itemName: string) {
        return `//div[text()='${itemName}']`;
    }

    async verifyCatalogIsDisplayed(): Promise<boolean> {
        return await this.elementVisible(this.productItems);
    }

    async selectSortOption(optionText: string) {
        await this.selectOption(this.sortDropdown, optionText, "Product Sort Dropdown");
    }

    async toggleItemCartStatus(itemName: string) {
        const selector = this.getItemActionButton(itemName);
        const currentButtonText = await this.getText(selector);
        await this.waitAndClick(selector, `${currentButtonText} button for ${itemName}`);
    }

    async clickProductTitle(itemName: string) {
        const selector = this.getItemTitleLink(itemName);
        await this.waitAndClick(selector, `Product link title: ${itemName}`);
    }

    async clickHamburgerMenu() {
        await this.waitAndClick(this.menuButton, "Hamburger Menu Icon Button");
    }

    async getCartBadgeCount(): Promise<string | null> {
        const exists = await this.elementExists(this.cartBadge);
        return exists ? await this.getText(this.cartBadge) : "0";
    }

    async getButtonTextForProduct(itemName: string): Promise<string | null> {
        return await this.getText(this.getItemActionButton(itemName));
    }

    async isSidebarVisible(): Promise<boolean> {
        return await this.elementVisible(this.sidebarPanel);
    }
}