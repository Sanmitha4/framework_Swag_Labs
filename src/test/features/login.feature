Feature: User Login Authentication

  @Key:Login_01 @regression @sauce @positive
  Scenario: Login succeeds with standard valid credentials
    Given User navigates to the Sauce Demo login page
    When User attempts to login with credentials from test data "standard_user"
    Then User should be successfully redirected to the dashboard page

@Key:Login_02 @regression @sauce @negative
  Scenario: Login fails with a locked out user account
    Given User navigates to the Sauce Demo login page
    When User attempts to login with credentials from test data "locked_out_user"
    Then An error message should be displayed on the login page
    And User should remain on the login page

  @Key:Login_03 @regression @sauce @negative
  Scenario: Login fails with completely invalid credentials
    Given User navigates to the Sauce Demo login page
    When User attempts to login with credentials from test data "invalid_user"
    Then An error message should be displayed on the login page
    And User should remain on the login page

  @Key:Login_04 @regression @sauce @negative
  Scenario: Login fails with an empty username field
    Given User navigates to the Sauce Demo login page
    When User attempts to login with credentials from test data "empty_username"
    Then An error message should be displayed on the login page

  @Key:Login_05 @regression @sauce @negative
  Scenario: Login fails with an empty password field
    Given User navigates to the Sauce Demo login page
    When User attempts to login with credentials from test data "empty_password"
    Then An error message should be displayed on the login page

  @Key:Login_06 @regression @sauce @positive @performance
  Scenario: Login succeeds but exhibits a performance glitch
    Given User navigates to the Sauce Demo login page
    When User attempts to login with credentials from test data "performance_glitch_user"
    Then User should be successfully redirected to the dashboard page

  @Key:Login_07 @regression @sauce @positive @functional
  Scenario Outline: Login succeeds for other active behavioral user profiles
    Given User navigates to the Sauce Demo login page
    When User attempts to login with credentials from test data "<profile>"
    Then User should be successfully redirected to the dashboard page

    Examples:
      | profile      |
      | problem_user |
      | error_user   |
      | visual_user  |