#!/bin/bash

# Create root directory
mkdir -p src

# Create app directory structure
mkdir -p src/app/{auth,register,login}/{login,register}
mkdir -p src/app/\(dashboard\)/{roadmap,quiz,coding}
mkdir -p src/app/api/{auth,roadmap,webhook}
touch src/app/layout.tsx
touch src/app/page.tsx
touch src/app/error.tsx
touch src/app/\(auth\)/layout.tsx
touch src/app/\(dashboard\)/layout.tsx

# Create lib directory structure
mkdir -p src/lib/{auth,db,api,services}
mkdir -p src/lib/db/{schema,models,queries}
mkdir -p src/lib/api/{validators,middleware,handlers}
mkdir -p src/lib/services/{roadmap,quiz}
touch src/lib/auth/{auth-options.ts,middleware.ts,utils.ts}

# Create components directory structure
mkdir -p src/components/{ui,forms,layout,features}
mkdir -p src/components/forms/{auth,roadmap}
mkdir -p src/components/layout/{header,footer}
mkdir -p src/components/features/{roadmap,quiz}
touch src/components/ui/{button.tsx,input.tsx,card.tsx}

# Create other directories
mkdir -p src/{hooks,types,config,styles,utils,public}
mkdir -p src/styles/themes
mkdir -p src/public/{images,icons}
mkdir -p prisma/migrations

# Create config files
touch src/config/{site.ts,nav.ts,constants.ts}

# Create style files
touch src/styles/globals.css

# Create utility files
touch src/utils/{api.ts,helpers.ts}

# Create Prisma schema
touch prisma/schema.prisma

# Create basic Next.js configuration files
cat > src/app/layout.tsx << 'EOL'
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
EOL

cat > src/app/page.tsx << 'EOL'
export default function Home() {
  return (
    <main>
      <h1>Frontend Roadmap</h1>
    </main>
  )
}
EOL

# Create basic component files
cat > src/components/ui/button.tsx << 'EOL'
export default function Button({ children, ...props }) {
  return (
    <button {...props}>
      {children}
    </button>
  )
}
EOL

# Create basic configuration
cat > src/config/site.ts << 'EOL'
export const siteConfig = {
  name: "Frontend Roadmap",
  description: "Learn frontend development with structured roadmap",
  url: "https://your-domain.com",
}
EOL

# Create basic Prisma schema
cat > prisma/schema.prisma << 'EOL'
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
EOL

echo "Project structure created successfully!" 