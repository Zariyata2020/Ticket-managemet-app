# TicketFlow - Multi-Framework Ticket Management System

A comprehensive ticket management web application built with three distinct frontend frameworks: **React**, **Vue.js**, and **Twig**. Each implementation delivers the same user experience with identical design, layout, and functionality while showcasing best practices for each framework.

## Project Overview

TicketFlow is a modern ticket management system designed to streamline workflow, improve team collaboration, and boost productivity. The application features:

- **Landing Page** - Hero section with wavy SVG background and decorative elements
- **Authentication** - Secure login/signup with session management
- **Dashboard** - Overview with ticket statistics and analytics
- **Ticket Management** - Full CRUD operations with filtering and status tracking
- **Responsive Design** - Mobile-first approach with tablet and desktop optimization
- **Consistent UI** - Identical design language across all three implementations

## Framework Implementations

### 1. React Implementation
**Location:** `react-app/` (or root directory)

A modern React application using Next.js 16 with TypeScript, featuring:
- Server and client components
- React Router for navigation
- Tailwind CSS v4 for styling
- localStorage for session management
- Responsive UI components

**Setup:**
\`\`\`bash
npm install
npm run dev
\`\`\`

**Documentation:** See `app/README.md` or the React app's documentation

---

### 2. Vue.js Implementation
**Location:** `vue-app/`

A Vue 3 application with Composition API, featuring:
- Vue Router 4 for client-side routing
- Vite as build tool
- Tailwind CSS for styling
- localStorage for session management
- Reactive state management

**Setup:**
\`\`\`bash
cd vue-app
npm install
npm run dev
\`\`\`

**Documentation:** See `vue-app/README.md`

---

### 3. Twig Implementation
**Location:** `twig-app/`

A PHP application using Twig templating engine, featuring:
- PHP 7.4+ with Twig 3.0
- Server-side routing and session management
- JSON-based data persistence
- Tailwind CSS for styling
- Traditional server-rendered templates

**Setup:**
\`\`\`bash
cd twig-app
composer install
mkdir -p cache data
php -S localhost:8000 -t public
\`\`\`

**Documentation:** See `twig-app/README.md`

---

## Shared Design System

All three implementations follow the same design specifications:

### Color Palette
- **Primary**: Purple (`oklch(0.45 0.22 262)`)
- **Secondary**: Light Purple (`oklch(0.95 0.05 262)`)
- **Accent**: Bright Purple (`oklch(0.55 0.22 262)`)
- **Status Colors**:
  - Open: Green (`oklch(0.65 0.22 142)`)
  - In Progress: Amber (`oklch(0.75 0.18 70)`)
  - Closed: Gray (`oklch(0.6 0 0)`)

### Typography
- **Font Family**: System fonts (-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto)
- **Headings**: Bold weights (600-700)
- **Body**: Regular weight (400), line-height 1.6

### Layout
- **Max Width**: 1440px (centered on large screens)
- **Responsive Breakpoints**: Mobile-first with sm, md, lg breakpoints
- **Spacing**: Consistent 4px grid system
- **Border Radius**: 0.625rem (10px)

### Key Design Elements
- **Hero Section**: Wavy SVG background at bottom edge
- **Decorative Circles**: Blurred circular elements (at least 2 across the site)
- **Card Components**: Box-shaped sections with shadows and rounded corners
- **Status Badges**: Color-coded status indicators
- **Priority Tags**: Visual priority indicators

---

## Core Features

### 1. Landing Page
- Hero section with compelling headline and CTA buttons
- Features section highlighting key benefits
- Call-to-action section
- Consistent footer
- Responsive navigation with scroll effects

### 2. Authentication
- **Login Page**: Email and password validation
- **Signup Page**: Name, email, password confirmation
- **Session Management**: localStorage-based (React/Vue) or PHP sessions (Twig)
- **Error Handling**: Inline error messages and validation feedback
- **Redirect Logic**: Automatic redirect to dashboard on success

### 3. Dashboard
- **Statistics Cards**: Total, Open, In Progress, and Resolved tickets
- **Navigation**: Links to ticket management
- **User Info**: Display logged-in user name
- **Logout Button**: Clear session and return to landing page

### 4. Ticket Management (CRUD)
- **Create**: Form to add new tickets with title, description, status, and priority
- **Read**: Display tickets in card-style list with filtering
- **Update**: Edit existing ticket details with modal form
- **Delete**: Remove tickets with confirmation dialog
- **Filtering**: Filter by status (All, Open, In Progress, Closed)
- **Validation**: Real-time form validation with error messages

---

## Data Structure

### Ticket Object
\`\`\`json
{
  "id": "unique-identifier",
  "title": "Ticket title",
  "description": "Detailed description",
  "status": "open|in-progress|closed",
  "priority": "low|medium|high",
  "createdAt": "ISO-8601 timestamp",
  "updatedAt": "ISO-8601 timestamp"
}
\`\`\`

### User Object
\`\`\`json
{
  "id": "unique-identifier",
  "email": "user@example.com",
  "name": "User Name"
}
\`\`\`

---

## Validation Rules

### Tickets
- **Title**: Required, non-empty string
- **Description**: Required, non-empty string
- **Status**: Must be one of: `open`, `in-progress`, `closed`
- **Priority**: Must be one of: `low`, `medium`, `high`

### Authentication
- **Email**: Required, must contain `@` symbol
- **Password**: Minimum 6 characters
- **Confirm Password**: Must match password field (signup only)
- **Name**: Required for signup

---

## Error Handling

All implementations include consistent error handling:

1. **Form Validation Errors**: Displayed inline below form fields
2. **Authentication Errors**: Clear messages for invalid credentials
3. **Network Errors**: Graceful fallback messages
4. **Session Expiration**: Redirect to login page
5. **Not Found**: 404 page for invalid routes

---

## Security & Authorization

- **Session Protection**: Only authenticated users can access dashboard and tickets
- **Session Storage**: 
  - React/Vue: `localStorage` with key `ticketapp_session`
  - Twig: PHP `$_SESSION`
- **Logout**: Clears session and redirects to landing page
- **Route Guards**: Automatic redirect to login for unauthorized access

---

## Accessibility

All implementations follow WCAG 2.1 guidelines:

- **Semantic HTML**: Proper use of heading hierarchy and semantic elements
- **Form Labels**: All inputs have associated labels
- **Color Contrast**: Sufficient contrast ratios (WCAG AA standard)
- **Focus States**: Visible focus indicators on interactive elements
- **Keyboard Navigation**: Full keyboard support
- **Alt Text**: Descriptive alt text for images
- **ARIA Attributes**: Proper ARIA roles and attributes where needed

---

## Testing Credentials

Use these credentials to test all implementations:

**Email:** `test@example.com`
**Password:** `password123` (or any password with 6+ characters)

---

## File Structure

\`\`\`
.
├── react-app/                    # React/Next.js implementation
│   ├── app/
│   ├── components/
│   ├── public/
│   └── README.md
├── vue-app/                      # Vue.js implementation
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── README.md
├── twig-app/                     # Twig/PHP implementation
│   ├── public/
│   ├── templates/
│   ├── data/
│   ├── composer.json
│   └── README.md
├── shared-assets/                # Shared SVG and design assets
│   ├── wave-hero.svg
│   └── decorative-circles.svg
└── ROOT_README.md               # This file
\`\`\`

---

## Switching Between Implementations

### To run React:
\`\`\`bash
npm install
npm run dev
# Visit http://localhost:3000
\`\`\`

### To run Vue.js:
\`\`\`bash
cd vue-app
npm install
npm run dev
# Visit http://localhost:5173
\`\`\`

### To run Twig:
\`\`\`bash
cd twig-app
composer install
php -S localhost:8000 -t public
# Visit http://localhost:8000
\`\`\`

---

## Development Notes

### React Implementation
- Uses Next.js 16 with App Router
- TypeScript for type safety
- Tailwind CSS v4 with custom theme
- shadcn/ui components
- localStorage for persistence

### Vue.js Implementation
- Vue 3 with Composition API
- Vue Router 4 for routing
- Vite for fast development
- Tailwind CSS for styling
- localStorage for persistence

### Twig Implementation
- PHP 7.4+ with Twig 3.0
- Server-side routing
- JSON file storage
- PHP sessions for authentication
- Tailwind CSS for styling

---

## Known Issues

None currently. All implementations are fully functional and tested.

---

## Future Enhancements

- Backend API integration (Node.js/Express, Python/Flask, etc.)
- Database integration (PostgreSQL, MongoDB, etc.)
- Real-time updates with WebSockets
- User roles and permissions
- Advanced filtering and search
- Ticket assignment and comments
- Email notifications
- Dark mode toggle
- Multi-language support

---

## Submission Checklist

- [x] React implementation complete
- [x] Vue.js implementation complete
- [x] Twig implementation complete
- [x] Identical design across all frameworks
- [x] Full CRUD functionality
- [x] Authentication and session management
- [x] Form validation and error handling
- [x] Responsive design (mobile, tablet, desktop)
- [x] Accessibility compliance
- [x] Documentation for each implementation
- [x] Shared design system documentation

---

## Support

For issues or questions about specific implementations, refer to the individual README files:
- React: See `app/README.md` or root README
- Vue.js: See `vue-app/README.md`
- Twig: See `twig-app/README.md`

---

## License

MIT License - All implementations are open source and free to use.

---

**Created:** October 2025
**Deadline:** October 28, 2025, 11:59 PM GMT+1
