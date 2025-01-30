export const CssBasics = `
# CSS Basics

In CSS, the 'position' property specifies the positioning method for an element. It determines how an element is placed in the document flow and how it interacts with other elements. Here’s a breakdown of the most common values for the position property:

## 1. static
**Default value:** This is the default position for all elements.  
**Behavior:** The element is positioned according to the normal document flow (from top to bottom, left to right).  
**Offsets (e.g., top, left, right, bottom):** Have no effect.

\`\`\`css
div {
    position: static; /* Default */
}
\`\`\`

## 2. relative
**Behavior:** The element is positioned relative to its normal position in the document flow.  
**Offsets:** Can be used (top, left, right, bottom) to "nudge" the element from its original position.  
**Impact on siblings:** The space it originally occupied remains unchanged.

\`\`\`css
div {
    position: relative;
    top: 20px; /* Moves the element 20px down from its normal position */
    left: 10px; /* Moves the element 10px to the right from its normal position */
}
\`\`\`

## 3. absolute
**Behavior:** The element is positioned relative to the nearest positioned ancestor (an ancestor with position: relative, absolute, or fixed). If no such ancestor exists, it is positioned relative to the viewport.  
**Offsets:** Used to define the position within the containing block.  
**Impact on siblings:** Removed from the normal document flow, so it does not affect other elements.

\`\`\`css
div {
    position: absolute;
    top: 50px; /* 50px from the top of the nearest positioned ancestor */
    left: 30px; /* 30px from the left of the nearest positioned ancestor */
}
\`\`\`

## 4. fixed
**Behavior:** The element is positioned relative to the viewport and does not move when the page is scrolled.  
**Offsets:** Define the position within the viewport.  
**Impact on siblings:** Removed from the normal document flow.

\`\`\`css
div {
    position: fixed;
    bottom: 10px; /* 10px above the bottom of the viewport */
    right: 20px; /* 20px from the right edge of the viewport */
}
\`\`\`

## 5. sticky
**Behavior:** The element toggles between relative and fixed, depending on the scroll position. It behaves like relative until a specified scroll threshold (defined by offsets) is reached, then it "sticks" like fixed.  
**Offsets:** Used to determine the scroll threshold where the element becomes "stuck."  
**Impact on siblings:** Maintains its place in the normal flow until it becomes "stuck."

\`\`\`css
div {
    position: sticky;
    top: 0; /* Sticks to the top of its containing block when scrolled */
}
\`\`\`

## Summary Table

| Value    | Positioned Relative To       | Removed From Normal Flow | Scroll Behavior         |
|----------|------------------------------|--------------------------|-------------------------|
| static   | Normal document flow         | No                       | Moves with scroll       |
| relative | Normal position              | No                       | Moves with scroll       |
| absolute | Nearest positioned ancestor  | Yes                      | Moves with scroll       |
| fixed    | Viewport                     | Yes                      | Does not move with scroll |
| sticky   | Nearest scrollable ancestor  | No                       | Toggles between relative and fixed |

## When to Use Which?
- **static:** Default behavior; no special positioning.
- **relative:** When you want to nudge an element without affecting the document flow.
- **absolute:** For elements that need to be precisely positioned relative to a specific container.
- **fixed:** For elements that need to remain visible (e.g., sticky headers, floating buttons).
- **sticky:** For creating elements that "stick" temporarily while scrolling (e.g., table headers).

This understanding allows precise control over layout and design.
`;
