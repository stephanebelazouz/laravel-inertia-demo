# Project Setup Guide

This project provides a Laravel backend with user management.
Follow the steps below to install, configure, and run the application.

---

## 🚀 Installation

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd <your-project-folder>
```

### 2. Copy the environment file

```bash
cp .env.example .env
```

### 3. Fill in the environment variables

Update the following values inside your `.env`:

```env
APP_NAME="MyApp"
APP_URL="http://localhost:8000"

DB_CONNECTION=sqlite

SEED_ADMIN_EMAIL=admin@example.com
SEED_ADMIN_PASSWORD=Secret12345
```

These will be used to create the initial seeded admin user.

---

## 🗄️ Database Migration & Seeding

Run migrations:

```bash
php artisan migrate
```

Run seeders:

```bash
php artisan db:seed
```

This will create an initial admin account using the credentials from
`.env`.

---

## ▶️ Launch the Application

Start the Laravel development server:

```bash
php artisan serve
```

(Optional) Start the frontend if using Vite:

```bash
npm install
npm run dev
```

The app should now be available at:

    http://localhost:8000

---

## ✅ Todo

- Implements role-based administration capabilities and resstrictions
- Restrict access to admin-only pages
- Improve error handling in API service layer
- Add missing tests
