import { Page } from "@playwright/test";
// Going up from 'src/pages' to 'src', then descending to 'src/helper/wrapper/PlaywrightWrappers'
import PlaywrightWrapper from "../helper/wrapper/PlaywrightWrappers";
import { HTMLSubStepLogger } from "../support/htmllSubStepLogger";

export default class LoginPage extends PlaywrightWrapper {
    
    // Selectors mapped to the input fields on the Sauce Demo login page
    private readonly usernameInput = "input#user-name";
    private readonly passwordInput = "input#password";
    private readonly loginButton = "input#login-button";
    public readonly errorMessageContainer = "div.error-message-container h3";

    constructor(page: Page, logger: HTMLSubStepLogger) {
        // Correctly pass page and custom step logger instances to base class constructor
        super(page, logger);
    }

    async enterUsername(username: string) {
        // Leverages typeText method inherited from PlaywrightWrapper class
        await this.typeText(this.usernameInput, username, "Username Input Field");
    }

    async enterPassword(password: string) {
        // Leverages typePassword method inherited from PlaywrightWrapper class
        await this.typePassword(this.passwordInput, password, "Password Input Field");
    }

    async clickLogin() {
        // Leverages waitAndClick method inherited from PlaywrightWrapper class
        await this.waitAndClick(this.loginButton, "Login Button");
    }
}