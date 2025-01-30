src/
├── app/                        # App Router-based structure for Next.js
│   ├── (auth)/                # Grouped auth routes
│   │   ├── login/             # Login page
│   │   ├── register/          # Register page
│   │   └── layout.tsx         # Auth layout
│   ├── (dashboard)/           # Grouped dashboard routes
│   │   ├── roadmap/           # Roadmap pages
│   │   ├── quiz/              # Quiz pages
│   │   ├── coding/            # Coding challenge pages
│   │   └── layout.tsx         # Dashboard layout
│   ├── api/                   # API routes
│   │   ├── auth/              # Auth APIs
│   │   ├── roadmap/           # Roadmap APIs
│   │   └── webhook/           # Webhook handlers
│   ├── layout.tsx             # Root layout
│   ├── page.tsx               # Landing page
│   └── error.tsx              # Error handling
│
├── lib/                       # Core library code
│   ├── auth/                  # Authentication logic
│   │   ├── auth-options.ts    # NextAuth options
│   │   ├── middleware.ts      # Auth middleware
│   │   └── utils.ts           # Auth utilities
│   ├── db/                    # Database related
│   │   ├── schema/           # Database schema
│   │   ├── models/           # Database models
│   │   └── queries/          # Database queries
│   ├── api/                   # API related
│   │   ├── validators/        # API validation
│   │   ├── middleware/        # API middleware
│   │   └── handlers/         # API handlers
│   └── services/             # Business logic services
│       ├── roadmap/          # Roadmap service
│       └── quiz/             # Quiz service
│
├── components/                # UI Components
│   ├── ui/                    # Base UI components
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   └── card.tsx
│   ├── forms/                # Form components
│   │   ├── auth/            # Auth forms
│   │   └── roadmap/         # Roadmap forms
│   ├── layout/               # Layout components
│   │   ├── header/
│   │   └── footer/
│   └── features/             # Feature-specific components
│       ├── roadmap/         # Roadmap components
│       └── quiz/            # Quiz components
│
├── hooks/                     # Custom React hooks
├── types/                    # TypeScript types/interfaces
├── config/                   # App configuration
│   ├── site.ts              # Site configuration
│   ├── nav.ts               # Navigation configuration
│   └── constants.ts         # App constants
│
├── styles/                   # Styling
│   ├── globals.css
│   └── themes/              # Theme configurations
│
├── utils/                    # Utility functions
│   ├── api.ts               # API utilities
│   └── helpers.ts           # Helper functions
│
├── public/                   # Static assets
│   ├── images/
│   └── icons/
│
└── prisma/                   # Database (if using Prisma)
    ├── schema.prisma
    └── migrations/ 