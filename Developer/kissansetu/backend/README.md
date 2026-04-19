# Farmer Direct Market Backend

This backend folder is already structured to run as its own repository.

## Stack

- Node.js
- Express
- PostgreSQL

## Files

- `src/index.js`: server entry point
- `src/app.js`: Express app setup
- `src/routes/*`: API routes
- `src/controllers/*`: request handlers
- `src/services/priceInsightService.js`: mock AI-style market pricing logic
- `sql/schema.sql`: database schema
- `.env.example`: environment variables

## API Endpoints

- `GET /api/health`
- `POST /api/auth/register`
- `GET /api/listings`
- `POST /api/listings`
- `DELETE /api/listings/:id`
- `GET /api/prices/compare`

## Setup In Separate Repo

1. Copy this `backend` folder into its own repository.
2. Run `npm install`.
3. Copy `.env.example` to `.env`.
4. Point `DATABASE_URL` to your PostgreSQL instance.
5. Run `npm run dev`.
