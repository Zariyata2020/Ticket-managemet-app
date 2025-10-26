# TicketFlow - Vue.js Implementation

A modern ticket management system built with Vue.js 3, featuring authentication, dashboard, and full CRUD operations for tickets.

## Features

- Landing page with hero section and wavy SVG background
- User authentication (Login/Signup) with localStorage session management
- Dashboard with ticket statistics
- Full ticket management (Create, Read, Update, Delete)
- Responsive design for mobile, tablet, and desktop
- Status-based filtering (Open, In Progress, Closed)
- Priority levels (Low, Medium, High)

## Tech Stack

- **Vue.js 3** - Progressive JavaScript framework
- **Vue Router 4** - Client-side routing
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **localStorage** - Session and data persistence

## Setup Instructions

### Prerequisites
- Node.js 16+ and npm/pnpm installed

### Installation

1. Navigate to the vue-app directory:
\`\`\`bash
cd vue-app
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
# or
pnpm install
\`\`\`

3. Start the development server:
\`\`\`bash
npm run dev
# or
pnpm dev
\`\`\`

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

\`\`\`bash
npm run build
# or
pnpm build
\`\`\`

## Project Structure

\`\`\`
vue-app/
├── src/
│   ├── pages/
│   │   ├── LandingPage.vue      # Landing page with hero section
│   │   ├── LoginPage.vue        # Login authentication page
│   │   ├── SignupPage.vue       # Signup registration page
│   │   ├── DashboardPage.vue    # Dashboard with statistics
│   │   └── TicketsPage.vue      # Ticket management (CRUD)
│   ├── App.vue                  # Root component
│   ├── main.js                  # Application entry point
│   └── style.css                # Global styles and theme
├── index.html                   # HTML entry point
├── package.json                 # Dependencies
└── README.md                    # This file
\`\`\`

## Authentication

Authentication is simulated using localStorage with the key `ticketapp_session`. 

**Test Credentials:**
- Email: `test@example.com`
- Password: Any password (minimum 6 characters for signup)

## Data Storage

- **User Session**: Stored in `localStorage` under `ticketapp_session`
- **Tickets**: Stored in `localStorage` under `tickets`

## Validation Rules

### Tickets
- **Title**: Required, non-empty string
- **Description**: Required, non-empty string
- **Status**: Must be one of: `open`, `in-progress`, `closed`
- **Priority**: Must be one of: `low`, `medium`, `high`

### Authentication
- **Email**: Required, must contain `@`
- **Password**: Minimum 6 characters
- **Confirm Password**: Must match password field

## Color Scheme

- **Open**: Green tone (`--status-open`)
- **In Progress**: Amber tone (`--status-in-progress`)
- **Closed**: Gray tone (`--status-closed`)

## Accessibility

- Semantic HTML structure
- Proper form labels and ARIA attributes
- Keyboard navigation support
- Sufficient color contrast ratios
- Focus states on interactive elements

## Known Issues

None currently.

## Future Enhancements

- Backend API integration
- Real-time updates with WebSockets
- User roles and permissions
- Advanced filtering and search
- Ticket assignment and comments
- Email notifications

## License

MIT
