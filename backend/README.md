Backend Review
Strengths:

All major models (Property, Unit, Tenant, Lease, Payment, MaintenanceRequest, User, etc.) are present and exported as Mongoose models.
Controllers and routes are modular and follow RESTful conventions.
Middleware for authentication (auth.js) and audit logging (auditLog.js) is implemented and exported.
Route files use Express routers and apply role-based middleware (e.g., auth("admin"), auth(["admin", "manager"])).
Document upload and download endpoints are present.
Suggestions:

Ensure all models have necessary fields for RBAC, timestamps, and soft deletes if needed.
Confirm that all routes validate input (use express-validator or similar).
Make sure error handling is consistent and secure (no stack traces in production).
Add Swagger/OpenAPI documentation for your API.
Consider adding service layers if controller logic grows.
Ensure sensitive actions are logged via auditLog.js.