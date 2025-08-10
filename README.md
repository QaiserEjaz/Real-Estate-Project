# Property Management Backend (Node.js + Express + MongoDB)

This is the backend for a property management system. It uses Node.js, Express.js, and MongoDB. The project includes starter code for authentication (JWT, role-based), and basic API endpoints for properties, tenants, leases, and payments.

## Features
- User authentication (JWT, role-based)
- CRUD APIs for properties, tenants, leases, payments
- Scalable project structure

## Getting Started
1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env` file (see `.env.example` for required variables)
3. Start the server:
   ```bash
   npm run dev
   ```

## Folder Structure
- `/src` - Main source code
- `/src/models` - Mongoose models
- `/src/routes` - Express routes
- `/src/controllers` - Route controllers
- `/src/middleware` - Auth and error middleware

## API Endpoints
- `/api/auth` - Auth routes
- `/api/properties` - Property management
- `/api/tenants` - Tenant management
- `/api/leases` - Lease management
- `/api/payments` - Payment management

---

This is a starter template. Expand as needed for your requirements.
