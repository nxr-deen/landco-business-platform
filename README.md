# LandCo - Business Platform

A modern business platform built with Next.js, Prisma, and PostgreSQL.

## Features

- User authentication and authorization
- Subscription management
- Customer management
- Support ticket system
- FAQ management
- Modern UI with Tailwind CSS

## Prerequisites

- Node.js 18+
- PostgreSQL
- npm or yarn

## Setup

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

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register a new user
- POST `/api/auth/login` - Login and get JWT token

### Subscriptions
- GET `/api/subscriptions` - Get current subscription
- POST `/api/subscriptions` - Update subscription plan

### Customers
- GET `/api/customers` - List all customers
- POST `/api/customers` - Create a new customer

### Support
- GET `/api/support` - List all support tickets
- POST `/api/support` - Create a new support ticket

### FAQs
- GET `/api/faqs` - List all FAQs (with optional category filter)
- POST `/api/faqs` - Create a new FAQ (admin only)

## Development

- Run the development server: `npm run dev`
- Build for production: `npm run build`
- Start production server: `npm start`
- Run linting: `npm run lint`

## Database Management

- Generate Prisma client: `npm run prisma:generate`
- Run migrations: `npm run prisma:migrate`
- Open Prisma Studio: `npx prisma studio`

## License

MIT 