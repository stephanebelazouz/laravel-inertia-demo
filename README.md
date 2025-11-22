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

Update or add the following values inside your `.env`:

```env
# This is used for stateless authentication.
# If you run app in different domain or port you should add it.
SANCTUM_STATEFUL_DOMAINS=127.0.0.1:8000,localhost:8000,localhost,127.0.0.1

DB_CONNECTION=sqlite

SEED_ADMIN_EMAIL=admin@example.com
SEED_ADMIN_PASSWORD=Secret12345
```

These will be used to create the initial seeded admin user.

---

## 📦 Install and build

Install composer dependencies:

```bash
composer install
```

Build frontend

```bash
npm run build
```

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

Start the frontend in dev mode using Vite:

```bash
npm install
npm run dev
```

The app should now be available at:

    http://127.0.0.1:8000

---

## ✅ Todo

- Implements role-based administration capabilities and resstrictions
- Restrict access to admin-only pages
- Improve error handling in API service layer
- Add missing tests
