# Alma Test - Lead Management System

A modern, responsive lead management system built with Next.js, featuring a comprehensive admin dashboard for managing immigration visa leads.

## 🚀 Features

- **Responsive Design**: Mobile-first approach with tablet and desktop optimization
- **Lead Management**: Complete CRUD operations for lead data
- **Advanced Search & Filtering**: Search by name, email, country with status filtering
- **Sortable Tables**: Sort by multiple columns (name, email, date, status, country)
- **Pagination**: Efficient data pagination for large datasets
- **Status Management**: Update lead status from PENDING to REACHED_OUT
- **Form Validation**: Comprehensive client and server-side validation
- **Authentication**: Secure login system with token-based authentication
- **File Upload**: Resume/CV upload functionality
- **Mobile Sidebar**: Collapsible navigation for mobile devices

## 🛠 Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Styled Components with responsive design
- **Database**: SQLite with Prisma ORM
- **Forms**: JSON Forms for dynamic form generation
- **Icons**: Lucide React for modern iconography
- **Testing**: Vitest with React Testing Library
- **TypeScript**: Full type safety throughout the application

## 📋 Prerequisites

Before running this project, make sure you have:

- **Node.js** (version 18 or higher)
- **npm** or **yarn** package manager
- **Git** for version control

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd alma-test
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Set Up the Database

The project uses SQLite with Prisma. The database file (`dev.db`) should be created automatically, but you can reset it if needed:

```bash
# Generate Prisma client
npx prisma generate

# Reset database (optional)
npx prisma db push
```

### 4. Run the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

### 5. Open the Application

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 📱 Available Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run tests
npm test

# Run tests with UI
npm run test:ui

# Lint code
npm run lint

# Type checking
npm run type-check
```

## 🗂 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── leads/             # Leads management page
│   ├── login/             # Authentication page
│   └── thank-you/         # Form submission success
├── components/            # Reusable components
│   ├── ui/               # UI component library
│   ├── lead-form/        # Lead form component
│   ├── leads-table/      # Data table component
│   ├── header-section/   # Page header component
│   └── sidebar/          # Navigation sidebar
├── actions/              # Server actions
├── lib/                  # Utility libraries
├── styles/               # Global styles and theme
├── types/                # TypeScript type definitions
└── utils/                # Helper functions
```

## 🔐 Authentication

The application includes a simple authentication system:

- **Login**: Use any email and password "admin"
- **Token Storage**: Authentication tokens are stored in localStorage
- **Protected Routes**: Leads page requires authentication

## 📊 Database Schema

The application uses the following main entities:

- **LeadForm**: Stores lead information including personal details, visa categories, and help description
- **Status Tracking**: Tracks lead status (PENDING, REACHED_OUT)
- **File Management**: Handles resume/CV file uploads

## 🧪 Testing

The project includes comprehensive testing setup:

```bash
# Run all tests
npm test

# Run tests with UI
npm run test:ui

# Run specific test file
npm test -- src/app/__tests__/page.test.tsx
```

**Test Coverage:**

- Home page functionality
- Login page authentication
- Leads page data management
- Lead form validation
- Component rendering

## 📱 Responsive Design

The application is fully responsive with breakpoints:

- **Mobile** (< 768px): Stacked layout, collapsible sidebar, horizontal table scroll
- **Tablet** (768px - 1024px): Hybrid layout with toggleable sidebar
- **Desktop** (1024px+): Full sidebar, optimal spacing

## 🎨 Styling

The project uses a custom design system:

- **Theme**: Centralized color palette and typography
- **Components**: Reusable UI components with consistent styling
- **Responsive**: Mobile-first approach with smooth transitions
- **Accessibility**: Proper contrast ratios and keyboard navigation
