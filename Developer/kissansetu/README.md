# Farmer Direct Market

Farmer Direct Market is a modern MVP marketplace that helps farmers sell crops directly to buyers without middlemen. The project is split into:

- `frontend`: the main Next.js + TypeScript app in this repo
- `backend`: a self-contained Express + PostgreSQL service folder that is ready to move into its own repo

## MVP Features

- Landing page with farmer and buyer entry points
- Passwordless signup/login flow
- Farmer dashboard to create and delete crop listings
- Buyer marketplace with search and location filters
- Price comparison modal with mock AI market insight
- WhatsApp and phone contact links
- Demo-friendly frontend fallbacks when the backend is unavailable

## Project Structure

```text
farmer-direct-market/
  frontend/
  backend/
```

The frontend is the primary runnable app in this repo.

The backend folder is intentionally isolated so it can be published or copied into a separate repository without changing its internal structure.

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Create environment files:

- Copy `frontend/.env.local.example` to `frontend/.env.local`

3. Run the frontend:

```bash
npm run dev
```

Frontend runs on `http://localhost:3000`

## Backend Service

The backend in [`backend/`](/Users/kirti./Developer/kissansetu/backend) is designed to live in a separate repo.

When you move it out, use:

- `backend/.env.example`
- `backend/sql/schema.sql`
- `backend/src/*`

## Database

Run the SQL in `backend/sql/schema.sql` against your PostgreSQL database, or let the backend initialize it automatically on startup once it is in its own service repo.

## Deployment

- Frontend: Vercel
- Backend: Render
- Database: PostgreSQL

## Verification

- Frontend build verified with `npm run build --workspace frontend`
- Backend code was syntax-checked locally, but the service was not installed or started in this repo because you want it to live separately

