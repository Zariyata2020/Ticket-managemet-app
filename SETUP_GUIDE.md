# TicketFlow - Complete Setup Guide

This guide walks you through setting up and running all three implementations of the TicketFlow ticket management system.

## Prerequisites

### For All Implementations
- Git (for cloning the repository)
- A code editor (VS Code recommended)
- A modern web browser

### For React Implementation
- Node.js 16+ and npm/pnpm
- Basic knowledge of React and Next.js

### For Vue.js Implementation
- Node.js 16+ and npm/pnpm
- Basic knowledge of Vue.js

### For Twig Implementation
- PHP 7.4 or higher
- Composer (PHP package manager)
- Basic knowledge of PHP

---

## Step-by-Step Setup

### 1. React Implementation

#### Installation
\`\`\`bash
# Navigate to the project root (if not already there)
cd path/to/ticketflow

# Install dependencies
npm install
# or
pnpm install

# Start the development server
npm run dev
# or
pnpm dev
\`\`\`

#### Access
- Open your browser and navigate to `http://localhost:3000`
- You should see the TicketFlow landing page

#### First Steps
1. Click "Get Started" or "Sign Up"
2. Create an account with any email and password (6+ characters)
3. You'll be redirected to the dashboard
4. Click "Go to Ticket Management" to manage tickets
5. Try creating, editing, and deleting tickets

---

### 2. Vue.js Implementation

#### Installation
\`\`\`bash
# Navigate to the vue-app directory
cd vue-app

# Install dependencies
npm install
# or
pnpm install

# Start the development server
npm run dev
# or
pnpm dev
\`\`\`

#### Access
- Open your browser and navigate to `http://localhost:5173`
- You should see the TicketFlow landing page

#### First Steps
1. Click "Get Started" or "Sign Up"
2. Create an account with any email and password (6+ characters)
3. You'll be redirected to the dashboard
4. Click "Go to Ticket Management" to manage tickets
5. Try creating, editing, and deleting tickets

#### Building for Production
\`\`\`bash
npm run build
npm run preview
\`\`\`

---

### 3. Twig Implementation

#### Installation
\`\`\`bash
# Navigate to the twig-app directory
cd twig-app

# Install PHP dependencies using Composer
composer install

# Create necessary directories
mkdir -p cache data
chmod 755 cache data

# Start the PHP built-in server
php -S localhost:8000 -t public
\`\`\`

#### Access
- Open your browser and navigate to `http://localhost:8000`
- You should see the TicketFlow landing page

#### First Steps
1. Click "Get Started" or "Sign Up"
2. Create an account with any email and password (6+ characters)
3. You'll be redirected to the dashboard
4. Click "Go to Ticket Management" to manage tickets
5. Try creating, editing, and deleting tickets

#### Using a Different Port
\`\`\`bash
php -S localhost:8080 -t public
# Then visit http://localhost:8080
\`\`\`

---

## Running Multiple Implementations Simultaneously

You can run all three implementations at the same time on different ports:

### Terminal 1 - React
\`\`\`bash
npm run dev
# Runs on http://localhost:3000
\`\`\`

### Terminal 2 - Vue.js
\`\`\`bash
cd vue-app
npm run dev
# Runs on http://localhost:5173
\`\`\`

### Terminal 3 - Twig
\`\`\`bash
cd twig-app
php -S localhost:8000 -t public
# Runs on http://localhost:8000
\`\`\`

---

## Troubleshooting

### React Issues

**Port 3000 already in use:**
\`\`\`bash
npm run dev -- -p 3001
\`\`\`

**Dependencies not installing:**
\`\`\`bash
rm -rf node_modules package-lock.json
npm install
\`\`\`

**Build errors:**
\`\`\`bash
npm run build
\`\`\`

---

### Vue.js Issues

**Port 5173 already in use:**
\`\`\`bash
npm run dev -- --port 5174
\`\`\`

**Dependencies not installing:**
\`\`\`bash
rm -rf node_modules package-lock.json
npm install
\`\`\`

**Build errors:**
\`\`\`bash
npm run build
\`\`\`

---

### Twig Issues

**PHP not found:**
- Ensure PHP is installed: `php --version`
- Add PHP to your system PATH if needed

**Port 8000 already in use:**
\`\`\`bash
php -S localhost:8001 -t public
\`\`\`

**Composer not found:**
- Install Composer from https://getcomposer.org
- Or use: `php composer.phar install`

**Permission denied on cache/data directories:**
\`\`\`bash
chmod -R 755 cache data
\`\`\`

---

## Testing the Applications

### Test Credentials
All implementations accept any email/password combination:
- **Email:** `test@example.com` (or any email with @)
- **Password:** `password123` (or any 6+ character password)

### Test Workflow
1. **Landing Page**: Review features and CTAs
2. **Signup**: Create a new account
3. **Dashboard**: View statistics
4. **Create Ticket**: Add a new ticket with title, description, status, and priority
5. **Filter Tickets**: Use filter buttons to view tickets by status
6. **Edit Ticket**: Click Edit to modify a ticket
7. **Delete Ticket**: Click Delete and confirm removal
8. **Logout**: Return to landing page

---

## Data Persistence

### React & Vue.js
- Data is stored in browser's `localStorage`
- Persists across browser sessions
- Clear browser data to reset

### Twig
- Data is stored in `twig-app/data/tickets.json`
- Persists across server restarts
- Delete the file to reset data

---

## Development Tips

### React
- Use React DevTools browser extension for debugging
- Check console for TypeScript errors
- Use `npm run lint` to check code quality

### Vue.js
- Use Vue DevTools browser extension for debugging
- Check console for errors
- Use `npm run build` to check for build errors

### Twig
- Check PHP error logs for server-side errors
- Use browser DevTools for client-side debugging
- Modify templates in `templates/` directory

---

## Deployment

### React
\`\`\`bash
npm run build
# Deploy the .next directory to Vercel or similar
\`\`\`

### Vue.js
\`\`\`bash
npm run build
# Deploy the dist/ directory to any static host
\`\`\`

### Twig
\`\`\`bash
# Deploy the entire twig-app directory to a PHP-enabled server
# Ensure cache/ and data/ directories are writable
\`\`\`

---

## Next Steps

1. Explore each implementation to understand framework differences
2. Modify the design or add new features
3. Integrate with a backend API
4. Add database persistence
5. Deploy to production

---

## Support

For detailed information about each implementation, see:
- React: Check the root README or app documentation
- Vue.js: See `vue-app/README.md`
- Twig: See `twig-app/README.md`

---

**Happy coding!**
