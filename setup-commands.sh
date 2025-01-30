# First, create a new Next.js project with TypeScript and Tailwind CSS
npx create-next-app@latest . --typescript --tailwind --eslint

# Install main dependencies
npm install next-auth @prisma/client react-icons stripe @tanstack/react-query axios zod zustand

# Install development dependencies
npm install -D prisma @types/node @types/react prettier prettier-plugin-tailwindcss

# Fix certificate issues for Prisma (if needed)
export NODE_TLS_REJECT_UNAUTHORIZED=0

# Initialize Prisma with certificate fix
npx prisma init --skip-generate

# Reset certificate setting
export NODE_TLS_REJECT_UNAUTHORIZED=1

# Generate Prisma Client
npx prisma generate

# Make the setup script executable and run it
chmod +x setup-project.sh
./setup-project.sh

# Initialize Tailwind CSS (if not already initialized by create-next-app)
npx tailwindcss init -p 