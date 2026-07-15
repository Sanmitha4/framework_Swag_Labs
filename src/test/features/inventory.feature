Feature: Product Inventory Catalog Management

  Background:
    Given User is logged into the Sauce Demo portal with an active session
    And User navigates to the Sauce Demo inventory page

  @Key:Inv_01 @regression @sauce @functional @positive
  Scenario: Product list display matches core catalog parameters
    Then The catalog grid should display valid item listings
    And Every item should showcase a unique image, product title, and description
    And Every item details card should display a formatted cost matrix

  @Key:Inv_02 @regression @sauce @functional @positive
  Scenario Outline: Sorting filtering rules organize catalog item sequences
    When User selects the sorting filter criteria "<criteria>"
    Then The item cards should rearrange based on the active structural filter "<criteria>"

    Examples:
      | criteria    |
      | Name (A to Z) |
      | Name (Z to A) |
      | Price (low to high) |
      | Price (high to low) |

  @Key:Inv_03 @regression @sauce @cart @positive
  Scenario: Selecting an available item pushes context to the shopping cart
    When User clicks the "Add to cart" action button for "Sauce Labs Onesie"
    Then The action button label should dynamically toggle to "Remove"
    And The active shopping cart badge counter should increment to reflect the state modification

  @Key:Inv_04 @regression @sauce @cart @positive
  Scenario: Removing an item clears the context from the active shopping cart
    Given User has added items to the shopping cart
    When User clicks the "Remove" button for an active cart item
    Then The action button label should dynamically change back to "Add to cart"
    And The global shopping cart badge counter should decrement or hide if empty

  @Key:Inv_05 @regression @sauce @navigation @positive
  Scenario: Transitioning into detailed specifications page via titles
    When User clicks on the product title link "Sauce Labs Backpack"
    Then User should be redirected to the detailed single product description panel
    And Item name and item pricing attributes must correspond to the catalog item

  @Key:Inv_06 @regression @sauce @navigation @positive
  Scenario: Open sidebar navigation system drawer 
    When User clicks on the hamburger menu navigation toggle icon button
    Then The sliding navigation drawer options framework panel should become fully visible