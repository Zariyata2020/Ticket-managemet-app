# TicketFlow - Twig Implementation

A modern ticket management system built with PHP and Twig templating engine, featuring authentication, dashboard, and full CRUD operations for tickets.

## Features

- Landing page with hero section and wavy SVG background
- User authentication (Login/Signup) with PHP sessions
- Dashboard with ticket statistics
- Full ticket management (Create, Read, Update, Delete)
- Responsive design for mobile, tablet, and desktop
- Status-based filtering (Open, In Progress, Closed)
- Priority levels (Low, Medium, High)
- JSON-based data persistence

## Tech Stack

- **PHP 7.4+** - Server-side language
- **Twig 3.0** - Template engine
- **Tailwind CSS** - Utility-first CSS framework
- **JSON** - Data storage

## Setup Instructions

### Prerequisites
- PHP 7.4 or higher
- Composer (for dependency management)
- A web server (Apache, Nginx, or PHP built-in server)

### Installation

1. Navigate to the twig-app directory:
\`\`\`bash
cd twig-app
\`\`\`

2. Install dependencies using Composer:
\`\`\`bash
composer install
\`\`\`

3. Create necessary directories:
\`\`\`bash
mkdir -p cache data
chmod 755 cache data
\`\`\`

4. Start the PHP built-in server:
\`\`\`bash
php -S localhost:8000 -t public
\`\`\`

5. Open your browser and navigate to `http://localhost:8000`

### Project Structure

\`\`\`
twig-app/
├── public/
│   ├── index.php              # Main router and controller
│   └── css/
│       └── style.css          # Global styles and theme
├── templates/
│   ├── base.html.twig         # Base template
│   ├── landing.html.twig      # Landing page
│   ├── dashboard.html.twig    # Dashboard page
│   ├── tickets.html.twig      # Ticket management page
│   └── auth/
│       ├── login.html.twig    # Login page
│       └── signup.html.twig   # Signup page
├── data/
│   └── tickets.json           # Ticket data storage
├── cache/                     # Twig cache directory
├── composer.json              # PHP dependencies
└── README.md                  # This file
\`\`\`

## Authentication

Authentication uses PHP sessions with data stored in `$_SESSION['user']`.

**Test Credentials:**
- Email: `test@example.com`
- Password: Any password (minimum 6 characters for signup)

## Data Storage

- **User Session**: Stored in PHP `$_SESSION`
- **Tickets**: Stored in `data/tickets.json`

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
- Proper form labels
- Keyboard navigation support
- Sufficient color contrast ratios
- Focus states on interactive elements

## Routing

The application uses a simple routing system in `public/index.php`:

- `/` - Landing page
- `/auth/login` - Login page
- `/auth/signup` - Signup page
- `/dashboard` - Dashboard (requires authentication)
- `/dashboard/tickets` - Ticket management (requires authentication)
- `/logout` - Logout and destroy session

## Known Issues

None currently.

## Future Enhancements

- Database integration (MySQL/PostgreSQL)
- User roles and permissions
- Advanced filtering and search
- Ticket assignment and comments
- Email notifications
- API endpoints

## License

MIT
\`\`\`
