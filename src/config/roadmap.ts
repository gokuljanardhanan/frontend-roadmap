interface RoadmapItem {
  id: string;
  title: string;
  highlighted?: boolean;
  recommended?: boolean;
  alternative?: boolean;
  description?: string;
  children?: RoadmapItem[];
}

interface RoadmapConfig {
  title: string;
  children: RoadmapItem[];
}

export const roadmapConfig: RoadmapConfig = {
  title: "Front-end",
  children: [
    {
      id: "internet",
      title: "Internet",
      highlighted: true,
      children: [
        {
          id: "internet-basics",
          title: "How does the internet work?",
          recommended: true,
        },
        {
          id: "http",
          title: "What is HTTP?",
          recommended: true,
        },
        {
          id: "domain",
          title: "What is Domain Name?",
          recommended: true,
        },
        {
          id: "hosting",
          title: "What is hosting?",
          recommended: true,
        },
        {
          id: "dns",
          title: "DNS and how it works?",
          recommended: true,
        },
        {
          id: "browsers",
          title: "Browsers and how they work?",
          recommended: true,
        },
      ],
    },
    {
      id: "html",
      title: "HTML",
      highlighted: true,
      children: [
        {
          id: "html-basics",
          title: "Learn the basics",
          recommended: true,
        },
        {
          id: "semantic-html",
          title: "Writing Semantic HTML",
        },
        {
          id: "forms-validation",
          title: "Forms and Validations",
          recommended: true,
        },
        {
          id: "html-best-practices",
          title: "Conventions and Best Practices",
          recommended: true,
        },
        {
          id: "accessibility",
          title: "Accessibility",
        },
        {
          id: "seo",
          title: "SEO Basics",
        },
      ],
    },
    {
      id: "css",
      title: "CSS",
      highlighted: true,
      children: [
        {
          id: "css-basics",
          title: "Learn the basics",
          recommended: true,
        },
        {
          id: "css-layouts",
          title: "Making Layouts",
          recommended: true,
          children: [
            {
              id: "css-floats",
              title: "Floats",
            },
            {
              id: "css-positioning",
              title: "Positioning",
            },
            {
              id: "css-display",
              title: "Display",
            },
            {
              id: "css-box-model",
              title: "Box Model",
            },
            {
              id: "css-css-grid",
              title: "CSS Grid",
            },
            {
              id: "css-flex-box",
              title: "Flex Box",
            },
          ],
        },
        {
          id: "css-responsive-design",
          title: "Responsive design",
          recommended: true,
        },
      ],
    },
    {
      id: "javascript",
      title: "JavaScript",
      highlighted: true,
      children: [
        {
          id: "js-syntax-constructs",
          title: "Syntax and Basic Constructs",
          recommended: true,
        },
        {
          id: "js-dom-manipulation",
          title: "Learn DOM Manipulation",
          recommended: true,
        },
        {
          id: "js-fetch-api-ajax",
          title: "Learn Fetch API / Ajax (XHR)",
          recommended: true,
        },
        {
          id: "js-es6-modular",
          title: "ES6+ and modular JavaScript",
          recommended: true,
        },
        {
          id: "js-concepts",
          title: "Understand the concepts",
          recommended: true,
          children: [
            {
              id: "js-hoisting",
              title: "Hoisting",
            },
            {
              id: "js-event-bubbling",
              title: "Event Bubbling",
            },
            {
              id: "js-scope",
              title: "Scope",
            },
            {
              id: "js-prototype",
              title: "Prototype",
            },
            {
              id: "js-shadow-dom",
              title: "Shadow DOM",
            },
            {
              id: "js-strict",
              title: "strict",
            },
          ],
        },
      ],
    },
    {
      id: "version-control-systems",
      title: "Version Control Systems",
      highlighted: true,
      children: [
        {
          id: "basic-git-usage",
          title: "Basic Usage of Git",
          recommended: true,
        },
      ],
    },
    {
      id: "vcs-hosting",
      title: "VCS Hosting",
      highlighted: true,
      children: [
        {
          id: "github",
          title: "GitHub",
          recommended: true,
        },
        {
          id: "gitlab",
          title: "GitLab",
          alternative: true,
        },
        {
          id: "bitbucket",
          title: "Bitbucket",
          alternative: true,
        },
      ],
    },
    {
      id: "package-managers",
      title: "Package Managers",
      highlighted: true,
      children: [
        {
          id: "npm",
          title: "npm",
          recommended: true,
        },
        {
          id: "yarn",
          title: "yarn",
          alternative: true,
        },
        {
          id: "pnpm",
          title: "pnpm",
          alternative: true,
        },
      ],
    },
    {
      id: "pick-a-framework",
      title: "Pick a Framework",
      highlighted: true,
      children: [
        {
          id: "react",
          title: "React",
          recommended: true,
        },
        {
          id: "vuejs",
          title: "Vue.js",
          alternative: true,
        },
        {
          id: "angular",
          title: "Angular",
          alternative: true,
        },
        {
          id: "svelte",
          title: "Svelte",
          alternative: true,
        },
        {
          id: "solidjs",
          title: "Solid JS",
          alternative: true,
        },
        {
          id: "qwik",
          title: "Qwik",
          alternative: true,
        },
        {
          id: "nextjs",
          title: "Next.js",
          alternative: true,
        },
      ],
    },
    {
      id: "writing-css",
      title: "Writing CSS",
      highlighted: true,
      children: [
        {
          id: "tailwind",
          title: "Tailwind",
          recommended: true,
        },
      ],
    },
    {
      id: "css-architecture",
      title: "CSS Architecture",
      highlighted: true,
      children: [
        {
          id: "bem",
          title: "BEM",
          recommended: true,
        },
      ],
    },
    {
      id: "css-preprocessors",
      title: "CSS Preprocessors",
      children: [
        {
          id: "sass",
          title: "Sass",
          alternative: true,
        },
        {
          id: "postcss",
          title: "PostCSS",
          alternative: true,
        },
      ],
    },
    {
      id: "build-tools",
      title: "Build Tools",
      highlighted: true,
      children: [
        {
          id: "linters-formatters",
          title: "Linters and Formatters",
          recommended: true,
        },
        {
          id: "module-bundlers",
          title: "Module Bundlers",
          children: [
            {
              id: "vite",
              title: "Vite",
              recommended: true,
            },
            {
              id: "esbuild",
              title: "esbuild",
              recommended: true,
            },
            {
              id: "webpack",
              title: "Webpack",
              recommended: true,
            },
            {
              id: "rollup",
              title: "Rollup",
              recommended: true,
            },
            {
              id: "parcel",
              title: "Parcel",
              recommended: true,
            },
          ],
        },
      ],
    },
    {
      id: "testing",
      title: "Testing",
      highlighted: true,
      children: [
        {
          id: "jest",
          title: "Jest",
          recommended: true,
        },
        {
          id: "vitest",
          title: "Vitest",
          alternative: true,
        },
        {
          id: "cypress",
          title: "Cypress",
          recommended: true,
        },
        {
          id: "playwright",
          title: "Playwright",
          alternative: true,
        },
      ],
    },
    {
      id: "authentication-strategies",
      title: "Authentication Strategies",
      highlighted: true,
      children: [
        {
          id: "jwt",
          title: "JWT",
          recommended: true,
        },
        {
          id: "oauth",
          title: "OAuth",
          recommended: true,
        },
        {
          id: "sso",
          title: "SSO",
          recommended: true,
        },
        {
          id: "basic-auth",
          title: "Basic Auth",
          recommended: true,
        },
        {
          id: "session-auth",
          title: "Session Auth",
          recommended: true,
        },
      ],
    },
    {
      id: "web-security-basics",
      title: "Web Security Basics",
      highlighted: true,
      children: [
        {
          id: "https",
          title: "HTTPS",
          recommended: true,
        },
        {
          id: "cors",
          title: "CORS",
          recommended: true,
        },
        {
          id: "content-security-policy",
          title: "Content Security Policy",
          recommended: true,
        },
        {
          id: "owasp-security-risks",
          title: "OWASP Security Risks",
          recommended: true,
        },
      ],
    },
    {
      id: "web-components",
      title: "Web Components",
      children: [
        {
          id: "html-templates",
          title: "HTML Templates",
          recommended: true,
        },
        {
          id: "custom-elements",
          title: "Custom Elements",
          recommended: true,
        },
        {
          id: "shadow-dom",
          title: "Shadow DOM",
          recommended: true,
        },
      ],
    },
    {
      id: "type-checkers",
      title: "Type Checkers",
      highlighted: true,
      children: [
        {
          id: "typescript",
          title: "TypeScript",
          recommended: true,
        },
      ],
    },
    {
      id: "ssr",
      title: "SSR",
      highlighted: true,
      children: [
        {
          id: "react-ssr",
          title: "React",
          recommended: true,
          children: [
            {
              id: "nextjs-ssr",
              title: "Next.js",
              recommended: true,
            },
            {
              id: "astro-ssr",
              title: "Astro",
              recommended: true,
            },
            {
              id: "react-router-ssr",
              title: "React Router",
              recommended: true,
            },
          ],
        },
        {
          id: "angular-ssr",
          title: "Angular",
          recommended: true,
        },
        {
          id: "vuejs-ssr",
          title: "Vue.js",
          recommended: true,
          children: [
            {
              id: "nuxtjs-ssr",
              title: "Nuxt.js",
              recommended: true,
            },
          ],
        },
        {
          id: "svelte-ssr",
          title: "Svelte",
          recommended: true,
          children: [
            {
              id: "sveltekitsr",
              title: "SvelteKit",
              recommended: true,
            },
          ],
        },
      ],
    },
    {
      id: "graphql",
      title: "GraphQL",
      highlighted: true,
      children: [
        {
          id: "apollo",
          title: "Apollo",
          recommended: true,
        },
        {
          id: "relay-modern",
          title: "Relay Modern",
          recommended: true,
        },
      ],
    },
    {
      id: "progressive-web-apps",
      title: "Progressive Web Apps",
      children: [
        {
          id: "storage",
          title: "Storage",
          recommended: true,
        },
        {
          id: "web-sockets",
          title: "Web Sockets",
          recommended: true,
        },
        {
          id: "service-workers",
          title: "Service Workers",
          recommended: true,
        },
        {
          id: "location",
          title: "Location",
          recommended: true,
        },
        {
          id: "notifications",
          title: "Notifications",
          recommended: true,
        },
        {
          id: "device-orientation",
          title: "Device Orientation",
          recommended: true,
        },
        {
          id: "payments",
          title: "Payments",
          recommended: true,
        },
        {
          id: "credentials",
          title: "Credentials",
          recommended: true,
        },
      ],
    },
  ],
};
