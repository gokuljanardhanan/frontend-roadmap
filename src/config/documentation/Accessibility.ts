export const accessibility = `
# Accessibility

Accessibility means that people with disabilities can use the web. Web accessibility refers to the practice of making websites and web applications usable by as many people as possible, including those with disabilities. This includes ensuring that users with various impairments, such as visual, auditory, physical, speech, cognitive, and neurological disabilities, can interact with, navigate, and understand the web content effectively.

## Light/Dark theme for color blindness users
## Sound assistance for blind users

Accessibility also known as ally, since between a and y there are 11 characters.

## 1. Overview
- **What**
- **Why**
- **AT (Assistive Technology)**
- **Accessibility Standards**
- **ARIA**
- **Screen Reader**
- **Focus Management**
- **Contrast Theme**
- **Tooling**
- **Examples**

## 2. Keyboard Accessibility

### Disabilities:
- **Visual**
- **Hearing**
- **Motor**
- **Neurological**
- **Speech**
- **Temporary**: Injury, ear infection
- **Situational**: New parent, distracted driver

### Assistive Technology:
- **Keyboard only**: Using tab and other key presses using web
- **Screen Reader**: Using voice over, etc., reading the contents and UI and using web.
- **Mouse & pointer devices**
- **Touchscreen gestures**: e.g., double tap for zoom in and zoom out
- **Screen magnifiers**: keyboard shortcut for zoom in zoom out

### Accessibility Standards:
- **WCAG (Web content accessibility guideline)**
    - **Level A**: form button descriptive, use of color
    - **Level AA**: resize text, contrast
    - **Level AAA**: sign language

### Principles:
- **Perceivable**: Any user should be able to consume the data on web
- **Operable**: Any user should be able to operate (e.g., fill and complete form)
- **Understandable**: There should not be any confusion

## 3. Screen Reader

## 4. Focus Management
How to focus on different web elements, e.g., focusing on a particular link on website and navigating from one link to another.

### Techniques:
- **Tab navigation**
    - On a keyboard with different keys we can navigate to different sections and perform actions.
    - By default for tags a, button, input, select, etc., when user clicks on tab, it will focus on each one by one. But there are scenarios where we need to use div or p elements to add contents to UI.
    - Tabindex is used for defining the order of navigation in a web page, the value starts from 0 to any valid integer including negative. But this can cause issues on order of navigation (By default navigation and the number we have given may introduce issues in navigation). Better to use tabindex=0, to ensure the order of navigation and also to add div or p in navigation.

- **Keyboard shortcuts**
    - Implement using JS: Twitter has its own custom keyboard shortcuts (e.g., clicking on N opens new post page)

- **Skip links**
    - To skip over header link quickly / jump right to context (e.g., create a skip to content text in HTML and show only when it has focus, with the help of CSS). When there are lots of links on header and user don't want to navigate through all of them and wanted to go to main content this is used.

- **Active Element**
    - e.g., User clicked on an element and it opened a modal, now after closing modal, the control should go back to the element where it opened modal. To achieve this store document.activeElement and on closing modal, call currentEl.focus();

- **Tab trapping**
    - This will happen, suppose we are clicking on tab, and current element is modal, now when again keep pressing on tab, it will lose its control and goes out of website, so add a JS logic, if the control is on last focusable element of modal, set the focus back to modal. So that it won't lose control of the website.

- **Page navigation**
    - When redirect from one page to another, convey the user and avoid unwanted header link navigations

- **Aria-live**
- **continental.focus()**

## 5. Color Contrast
Color contrast is the text and background color ratio, if it's higher it's better visible, we can check in DOM style, it will show the ratio.

- Prefer em instead of px
- Prefers-color-scheme: is used to detect if a user has requested light or dark color themes. A user indicates their preference through an operating system setting (e.g., light or dark mode) or a user agent setting.

### Font size
- **Size in px**
- **Min contrast ratio**
    - **Small text**: <18px, 4.5:1
    - **Large text**: >18px, 3:1

### 400% ZOOM:
Website should support 400% zoom, and the contents should load with quality. If the Figma design has less contrast ratio, ask designer for better contrast.

## 6. Accessibility Tools
Tools which says if website follows accessibility standards.

### Automation
- **AXE (windows)**
- **Espresso (android)**
- **Eslint-plugin-jsx-ally (linter)**
- **Accessibility plugin (react–aria)**

### Manual
- **Lighthouse**: Run lighthouse report for accessibility, it will gives error e.g., tabindex greater than 0, role is list for button, so that in cannot be recognized as button.
- **Deque’s Axe Tools**
- **Element Tab in dev tools**: Open accessibility in dev tools for any element, it show the 

### Out of box
- **Material UI**: These packages comes with accessibility already in place.
- **Fluent UI**

### Keep in mind:
- **Semantic HTML**: Use semantic HTML, which helps accessibility in built
- **Add labels to form**: Add labels and define relationship
- **Use contrasting colors**
- **Write descriptive links**
- **Keep pinch and zoom alive**: in HTML use scalable:true, if we keep it no, user won't be able to zoom
- **Provide text for non text content**
- **Show where your :focus is**
- **Understandable without color**
- **Caption video and audio**

### Quick test accessibility:
- Zoom to 400%
- Check keyboard navigation
- Turn on monitor off and use a screen reader
- Run lighthouse accessibility audit
- Deactivate CSS

## 7. How to fix Accessibility

### Button
When using the default button element, it finds while navigation using tab or voice over, but for styles if we use div, it will be inaccessible, so add tabindex=0 to add in navigation, and on enter to have the same behavior add the on click definition on key up as well.

\`\`\`html
<button onclick="alert('hello')">click me!</button>
<div
    role="button"
    tabIndex="0"
    aria-label="Alert the word hello"
    onclick="alert('hello')"
    onkeyup="alert('hello')"
>
    Click me
</div>
\`\`\`

### Full page

#### Bad use cases and improvements:
- \`<button role="list" />\`
    - Remove role="list" which is confusing to improve accessibility
- \`<img src="http:/dsfsdf" />\`
    - Add alt tag
- Check contrast colors and improve by checking ratio from dev tools
- \`<a href="#" />\`
    - Add aria-label
- \`<div tabIndex="1">\`
    - avoid tabindex greater than 1, change to 0
- \`<div>\`
    - \`<li></li>\`
    - \`<li></li>\`
    - \`</div>\`
    - Use li inside ul instead of div
- \`body{outline:none}\`
    - we shouldn't use outline: none
- \`<input aria-hidden="true" tabIndex="-1" />\`
    - aria-hidden and tabIndex negative value, making it inaccessible for a by default accessible input element.
- for svg use role as image to identify it as image
`;
