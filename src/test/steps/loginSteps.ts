Feature: User Login Authentication

  @Key:Login_01 @regression @sauce @positive
  Scenario: Login succeeds with standard valid credentials
    Given User navigates to the Sauce Demo login page
    When User attempts to login with credentials from test data "standard_user"
    Then User should be successfully redirected to the dashboard page