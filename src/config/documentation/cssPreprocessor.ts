export const cssPreprocessor = `
# CSS Preprocessors: A Comprehensive Guide

## CSS Modules

CSS Modules is a technique in CSS that allows you to write CSS that is scoped to a specific component, ensuring that styles are applied only to that component and not globally. This approach helps avoid styling conflicts between components by generating unique class names automatically.

With CSS Modules, each class name is locally scoped to the component that imports it. This means the styles are isolated and cannot accidentally affect other parts of the application.

For scoped styles, without overflowing and isolated styles we need to use css modules, .module extension in files, this is for both css and preprocessors.

## Introduction to CSS Preprocessors

CSS preprocessors are tools that extend the functionality of CSS by introducing features like variables, nested rules, mixins, functions, and more. They help write more maintainable, reusable, and organized code, which is then compiled into standard CSS that browsers can interpret.

### Why Use CSS Preprocessors?

1. **Maintainability**

    CSS preprocessors support variables that allow you to store reusable values like colors, fonts, or dimensions. For instance:

    \`\`\`scss
    $primary-color: #3498db;

    body {
      color: $primary-color;
    }
    \`\`\`

    If you need to update the color, you only have to change it in one place.

2. **Code Reusability**

    Preprocessors provide mixins and functions to reuse common code blocks efficiently. For example:

    \`\`\`scss
    @mixin border-radius($radius) {
      -webkit-border-radius: $radius;
      -moz-border-radius: $radius;
      border-radius: $radius;
    }

    .box {
      @include border-radius(10px);
    }
    \`\`\`

3. **Organization**

    Nesting allows you to structure your CSS hierarchically, matching your HTML structure. For example:

    \`\`\`scss
    .navbar {
      ul {
        margin: 0;
        li {
          display: inline-block;
        }
      }
    }
    \`\`\`

4. **Efficiency**

    Loops and conditionals help reduce repetitive code. For example:

    \`\`\`scss
    @for $i from 1 through 5 {
      .item-#{$i} {
        width: 10px * $i;
      }
    }
    \`\`\`

5. **Extendability**

    Preprocessors add advanced features such as calculations, conditionals, and partials, which are not available in plain CSS.

## Popular CSS Preprocessors

1. **Sass (SCSS)**

    - **Syntax:** SCSS (similar to CSS) and Sass (indentation-based).
    - **Features:** Variables, mixins, nesting, loops, conditionals, and partials.
    - **Example:**

    \`\`\`scss
    $primary-color: #3498db;

    body {
      color: $primary-color;
    }
    \`\`\`

2. **Less**

    - **Syntax:** JavaScript-like.
    - **Features:** Variables, mixins, nesting.
    - **Example:**

    \`\`\`less
    @primary-color: #3498db;

    body {
      color: @primary-color;
    }
    \`\`\`

3. **Stylus**

    - **Syntax:** Extremely flexible and concise.
    - **Features:** Minimalistic syntax, variables, mixins, and functions.
    - **Example:**

    \`\`\`stylus
    primary-color = #3498db

    body
      color primary-color
    \`\`\`

## How CSS Preprocessors Work

1. **Write Preprocessor Code:** Write styles using preprocessor-specific syntax and features. Example (Sass/SCSS):

    \`\`\`scss
    $primary-color: #3498db;

    body {
      color: $primary-color;

      .header {
        background-color: darken($primary-color, 10%);
        padding: 10px;
      }
    }
    \`\`\`

2. **Compile to CSS:** The preprocessor code is converted into standard CSS using a compiler. Compiled CSS:

    \`\`\`css
    body {
      color: #3498db;
    }

    body .header {
      background-color: #2c82c9;
      padding: 10px;
    }
    \`\`\`

3. **Use in the Browser:** Link the compiled CSS file to your HTML.

## Compilation Tools

### Command Line (Sass Example)

- **Install Sass:**

    \`\`\`bash
    npm install -g sass
    \`\`\`

- **Compile:**

    \`\`\`bash
    sass input.scss output.css
    \`\`\`

### Build Tools

Tools like Webpack, Gulp, or Grunt can automate the compilation process.

### IDE Integration

Modern IDEs like Visual Studio Code have plugins for live compilation.

## Features of CSS Preprocessors

### Variables

Variables store reusable values such as colors or font sizes.

\`\`\`scss
$font-stack: Helvetica, sans-serif;
$primary-color: #333;

body {
  font: 100% $font-stack;
  color: $primary-color;
}
\`\`\`

### Nesting

Nesting allows styles to follow the hierarchy of your HTML.

\`\`\`scss
nav {
  ul {
    margin: 0;
    li {
      list-style: none;
    }
  }
}
\`\`\`

### Mixins

Mixins are reusable blocks of CSS.

\`\`\`scss
@mixin flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.container {
  @include flex-center;
}
\`\`\`

### Partials and Imports

Partials are small reusable stylesheets (e.g., _variables.scss) that can be imported into a main file.

\`\`\`scss
@import 'variables';

body {
  color: $primary-color;
}
\`\`\`

### Loops and Conditionals

Preprocessors support control structures like loops and conditionals.

\`\`\`scss
@for $i from 1 through 3 {
  .item-#{$i} {
    width: 10px * $i;
  }
}

@if $theme == 'dark' {
  body {
    background: black;
  }
}
\`\`\`

## Best Practices for CSS Preprocessors

### Keep Code Modular

Use partials to divide styles into logical sections.

\`\`\`scss
@import 'reset';
@import 'header';
@import 'footer';
\`\`\`

### Organize Variables

Group variables in a _variables.scss file for consistency.

### Minimize Nesting

Avoid deep nesting as it can make the CSS harder to maintain.

\`\`\`scss
// Avoid:
.nav {
  ul {
    li {
      a {
        color: red;
      }
    }
  }
}

// Better:
.nav ul li a {
  color: red;
}
\`\`\`

### Use Mixins Sparingly

Avoid overusing mixins as they can increase file size. Use placeholders (%) for styles not requiring arguments.

### Automate Compilation

Use build tools to automate the compilation process and ensure consistency.

## Conclusion

CSS preprocessors like Sass, Less, and Stylus provide powerful features to write maintainable, reusable, and organized CSS. By leveraging tools for compilation and following best practices, preprocessors can significantly enhance the efficiency and scalability of your CSS workflow.
`;
