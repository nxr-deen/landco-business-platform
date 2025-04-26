# LandCo - Business Growth Platform

A modern SaaS platform for business growth, built with Next.js 15, React 19, TypeScript, and Tailwind CSS.

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [UI Components](#ui-components)
- [Theme System](#theme-system)
- [Setup & Installation](#setup--installation)
- [Development](#development)
- [Deployment](#deployment)

## Overview

LandCo is a comprehensive business growth platform designed to help companies streamline operations, increase revenue, and deliver exceptional customer experiences. The platform offers tools for customer management, analytics, automation, and support, all in an intuitive, easy-to-use interface.

## Features

- **User Authentication**: Secure login and registration system
- **Customer Management**: Track and manage customer relationships
- **Subscription Plans**: Tiered subscription system (Free, Starter, Professional, Enterprise)
- **Support Ticket System**: Create and manage support tickets
- **FAQ Management**: Create, update, and categorize FAQs
- **Responsive Design**: Mobile-friendly interface
- **Theme Switching**: Light and dark mode support
- **Modern UI Components**: Comprehensive library of UI components

## Technology Stack

### Frontend
- **Next.js 15.2.4**: React framework with App Router
- **React 19**: UI library
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library
- **next-themes**: Theme management
- **Radix UI**: Accessible UI component primitives
- **Recharts**: Charting library
- **React Hook Form**: Form validation
- **Zod**: Schema validation
- **Sonner**: Toast notifications

### Backend
- **Next.js API Routes**: Server-side API functionality
- **Prisma ORM**: Database abstraction and management
- **PostgreSQL**: Production database (SQLite for development)
- **bcryptjs**: Password hashing
- **jsonwebtoken**: JWT authentication

## Project Structure

```
/
├── app/                  # Next.js App Router directory
│   ├── api/              # API routes
│   │   ├── auth/         # Authentication endpoints
│   │   ├── customers/    # Customer management endpoints
│   │   ├── faqs/         # FAQ management endpoints
│   │   ├── hello/        # Hello world/test endpoint
│   │   ├── subscriptions/# Subscription management endpoints
│   │   ├── support/      # Support ticket endpoints
│   │   └── users/        # User management endpoints
│   ├── globals.css       # Global CSS styles
│   ├── layout.tsx        # Root layout component
│   ├── login/            # Login page
│   ├── page.tsx          # Home page
│   └── register/         # Registration page
├── components/           # React components
│   ├── ui/               # Reusable UI components
│   ├── mobile-nav.tsx    # Mobile navigation component
│   ├── theme-provider.tsx# Theme context provider
│   └── theme-toggle.tsx  # Theme toggle button component
├── hooks/                # Custom React hooks
├── lib/                  # Utility libraries
├── prisma/               # Prisma ORM files
│   ├── dev.db            # SQLite database file
│   ├── migrations/       # Database migrations
│   └── schema.prisma     # Database schema definition
└── public/               # Static public assets
```

## API Documentation

### Authentication
- **POST `/api/auth/register`**: Register a new user
  - Body: `{ email, name, password }`
  - Response: `{ id, email, name }`
  
- **POST `/api/auth/login`**: Authenticate user and receive JWT
  - Body: `{ email, password }`
  - Response: `{ token, user: { id, email, name, role } }`

### Users
- **GET `/api/users`**: Get all users (admin only)
  - Headers: `Authorization: Bearer {token}`
  - Response: `[{ id, email, name, role, createdAt }]`
  
- **GET `/api/users/:id`**: Get user by ID
  - Headers: `Authorization: Bearer {token}`
  - Response: `{ id, email, name, role, createdAt }`
  
- **PUT `/api/users/:id`**: Update user
  - Headers: `Authorization: Bearer {token}`
  - Body: `{ email?, name?, role? }`
  - Response: `{ id, email, name, role, updatedAt }`
  
- **DELETE `/api/users/:id`**: Delete user
  - Headers: `Authorization: Bearer {token}`
  - Response: `{ success: true }`

### Subscriptions
- **GET `/api/subscriptions`**: Get current user's subscription
  - Headers: `Authorization: Bearer {token}`
  - Response: `{ id, plan, status, startDate, endDate }`
  
- **POST `/api/subscriptions`**: Create/update subscription
  - Headers: `Authorization: Bearer {token}`
  - Body: `{ plan }`
  - Response: `{ id, plan, status, startDate, endDate }`

### Customers
- **GET `/api/customers`**: List all customers for current user
  - Headers: `Authorization: Bearer {token}`
  - Query: `?page=1&limit=10`
  - Response: `{ customers: [], totalCount, page, limit }`
  
- **POST `/api/customers`**: Create a new customer
  - Headers: `Authorization: Bearer {token}`
  - Body: `{ name, email, phone?, company? }`
  - Response: `{ id, name, email, phone, company, createdAt }`
  
- **GET `/api/customers/:id`**: Get customer by ID
  - Headers: `Authorization: Bearer {token}`
  - Response: `{ id, name, email, phone, company, createdAt }`
  
- **PUT `/api/customers/:id`**: Update customer
  - Headers: `Authorization: Bearer {token}`
  - Body: `{ name?, email?, phone?, company? }`
  - Response: `{ id, name, email, phone, company, updatedAt }`
  
- **DELETE `/api/customers/:id`**: Delete customer
  - Headers: `Authorization: Bearer {token}`
  - Response: `{ success: true }`

### Support
- **GET `/api/support`**: List all support tickets for current user
  - Headers: `Authorization: Bearer {token}`
  - Query: `?status=OPEN&page=1&limit=10`
  - Response: `{ tickets: [], totalCount, page, limit }`
  
- **POST `/api/support`**: Create a new support ticket
  - Headers: `Authorization: Bearer {token}`
  - Body: `{ title, description }`
  - Response: `{ id, title, description, status, createdAt }`
  
- **GET `/api/support/:id`**: Get support ticket by ID
  - Headers: `Authorization: Bearer {token}`
  - Response: `{ id, title, description, status, createdAt }`
  
- **PUT `/api/support/:id`**: Update support ticket
  - Headers: `Authorization: Bearer {token}`
  - Body: `{ title?, description?, status? }`
  - Response: `{ id, title, description, status, updatedAt }`
  
- **DELETE `/api/support/:id`**: Delete support ticket
  - Headers: `Authorization: Bearer {token}`
  - Response: `{ success: true }`

### FAQs
- **GET `/api/faqs`**: Get all FAQs
  - Query: `?category=general`
  - Response: `[{ id, question, answer, category }]`
  
- **POST `/api/faqs`**: Create a new FAQ (admin only)
  - Headers: `Authorization: Bearer {token}`
  - Body: `{ question, answer, category }`
  - Response: `{ id, question, answer, category, createdAt }`
  
- **PUT `/api/faqs/:id`**: Update FAQ (admin only)
  - Headers: `Authorization: Bearer {token}`
  - Body: `{ question?, answer?, category? }`
  - Response: `{ id, question, answer, category, updatedAt }`
  
- **DELETE `/api/faqs/:id`**: Delete FAQ (admin only)
  - Headers: `Authorization: Bearer {token}`
  - Response: `{ success: true }`

## Database Schema

The application uses Prisma ORM with PostgreSQL for production and SQLite for development.

### User
```prisma
model User {
  id            String    @id @default(cuid())
  email         String    @unique
  name          String?
  password      String
  role          String    @default("USER")
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  subscription  Subscription?
  customers     Customer[]
  supportTickets SupportTicket[]
}
```

### Subscription
```prisma
model Subscription {
  id            String    @id @default(cuid())
  userId        String    @unique
  user          User      @relation(fields: [userId], references: [id])
  plan          String    @default("FREE")
  status        String    @default("ACTIVE")
  startDate     DateTime  @default(now())
  endDate       DateTime?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}
```

### Customer
```prisma
model Customer {
  id            String    @id @default(cuid())
  name          String
  email         String
  phone         String?
  company       String?
  userId        String
  user          User      @relation(fields: [userId], references: [id])
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}
```

### SupportTicket
```prisma
model SupportTicket {
  id            String    @id @default(cuid())
  title         String
  description   String
  status        String    @default("OPEN")
  userId        String
  user          User      @relation(fields: [userId], references: [id])
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}
```

### FAQ
```prisma
model FAQ {
  id            String    @id @default(cuid())
  question      String
  answer        String
  category      String
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}
```

## UI Components

The project uses a comprehensive set of UI components, based on Radix UI primitives and styled with Tailwind CSS:

- Accordion
- Alert/AlertDialog
- Avatar
- Badge
- Button
- Calendar
- Card
- Carousel
- Checkbox
- Dialog
- Dropdown Menu
- Form
- Input
- Navigation Menu
- Popover
- Progress
- Select
- Sheet
- Slider
- Switch
- Tabs
- Toast
- Tooltip

## Theme System

The application implements a theme system using `next-themes` that allows users to switch between light and dark modes:

- Theme preferences stored in local storage
- System theme preference detection enabled
- Smooth transitions between themes
- CSS variables for theme-specific styles

### Theme Toggle Component

```tsx
export function ThemeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
```

## Setup & Installation

### Prerequisites
- Node.js 18+
- PostgreSQL
- npm or yarn

### Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd landco
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory with the following content:
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/landco?schema=public"
JWT_SECRET="your-super-secret-key-123456789"
```

4. Set up the database:
```bash
# Create the database
createdb landco

# Run Prisma migrations
npx prisma migrate dev --name init
```

5. Generate the Prisma client:
```bash
npx prisma generate
```

6. Start the development server:
```bash
npm run dev
```

## Development

- Run the development server: `npm run dev`
- Build for production: `npm run build`
- Start production server: `npm start`
- Run linting: `npm run lint`

## Database Management

- Generate Prisma client: `npm run prisma:generate`
- Run migrations: `npm run prisma:migrate`
- Open Prisma Studio: `npx prisma studio`

## Deployment

### Production Deployment
1. Build the application:
   ```bash
   npm run build
   ```
2. Start the production server:
   ```bash
   npm start
   ```

### Deployment Considerations
- Configure proper environment variables
- Set up appropriate database connection
- Enable HTTPS
- Implement rate limiting
- Configure CORS settings

## License

MIT