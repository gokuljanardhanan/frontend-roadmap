export const testing = `
# Testing

## Introduction

### Overview

- **Unit Testing**: Testing a small part of web application (Component)
- **Integration Testing**: Testing the integration of multiple components (clicking left/right arrow on horizontal product listing)
- **Functional Testing**: Testing the functionality (Clicking add to cart and checking cart items)
- **E2E Testing**: Testing an end to end flow user done (from login to purchase a product)
- **Regression Testing**: A new feature shouldn't break anything existing 
- **Performance Testing**: Performance metric testing and make sure performance value not decreased.
- **Accessibility Testing**: Make sure accessibility values not decreased
- **Cross-Browser Testing**
- **Usability Testing**: Testing whether the feature works fine, and how easily the user is able to use the web application.
- **Security Testing**: Make sure Security of web application not compromised
- **Localization & Internationalization Testing**
- **A/B Testing**: Comparing 2 versions of web applications and identifying which one performs well.

## Unit Testing

Testing a small unit of web application. Create a file with .test in name or add test files inside __tests__ folder. This format is called dunder. When running the test case command, jest check all the files with .test or the __tests__ folder and get all test methods. We have to pass a name and callback method for the test function.

[https://jestjs.io/docs/expect](https://jestjs.io/docs/expect)

### Component Testing

Testing a component in react/angular, it similar to unit testing, testing a small unit of react which is a component.

### Integration Testing

Testing multiple components integration, eg: clicking add to cart and cart component.

## Automation and E2E Testing

Puppeteer is a Node.js library which provides a high-level API to control Chrome or Firefox over the DevTools Protocol or WebDriver BiDi. Puppeteer runs in the headless (no visible UI) by default but can be configured to run in a visible ("headful") browser.

### E2E

Testing an entire flow of a user.
CRON job to automate e2e test cases and Amazon SES to send emails.

## A/B Testing

A/B testing, also known as split testing or bucket testing, is a method of comparing two versions of a web page, app feature, or marketing asset against each other to determine which one performs better. By randomly assigning users to either the "A" version (the control) or the "B" version (the variation), you can measure and analyze the impact of changes on user behavior.

Eg: A feature or change shown to a set of users and based on the output, making it live for 100%. The user splitting can be done based on userid, location, device type …etc and in client side based on the user set, show different contents, and push the data in analytics. Compare the output and make the better live for 100%.

Tool for A/B: [https://github.com/intuit/wasabi](https://github.com/intuit/wasabi)

## Performance Testing

Performance testing is used to identify the how fast web page loads, SEO rankings, bounce rate

- Check performance tab in developer tab, and analyze waterfall
- Lighthouse tab in developer tab
- [https://pagespeed.web.dev](https://pagespeed.web.dev)

## Test Driven Development

Write test cases before writing code.
When test cases are added after development, they are just added to justify, In order to write better code first write every test case, and then make them fail initially. Then Start fixing test cases by writing code. Finally refactor the code as required.

- **Red**: Write all test cases and make them fail initially
- **Green**: Start writing code to fix test cases
- **Refactor**: Refactor the code as required

## Security Testing

Tool: [https://portswigger.net/burp](https://portswigger.net/burp)

For using proxy https: 
- Proxy -> open browser -> navigate to [http://burpsuite/](http://burpsuite/) -> download certificate -> browser settings -> privacy and security -> manage certificates -> Add certificate downloaded -> always trust

- Burp -> intercept on

Once proxying with burp suite is enabled, All the request going from browser will go through it and we can have options to update http request, and also create multiple requests together (for attacking).
`;
