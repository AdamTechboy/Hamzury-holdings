# API Reference

All endpoints enforce role verification and strict input validation.

### Public Endpoints
- **`POST /api/public/enquiries`**
  - **Body**: `{ fullName, email, phone, organisationName, departmentSlug, serviceCode, description, sourceUrl }`
  - **Description**: Validates input, prevents duplicate spam, generates a unique enquiry reference (e.g. `ENQ-2026-XXXX`), creates a lead in Supabase, and returns assignment routing with WhatsApp click-to-chat links.

### Staff Endpoints
- **`GET /api/staff/leads`**: Retrieve leads authorized by role or department membership.
- **`PATCH /api/staff/leads/[id]`**: Update lead status, priority, or notes.
- **`POST /api/staff/leads/[id]/assign`**: Reassign lead to an agent or department manager.
- **`POST /api/staff/leads/[id]/activities`**: Record a call, meeting, WhatsApp message, or proposal.
- **`POST /api/staff/quotations`**: Generate an itemized quotation for an active lead.
- **`POST /api/staff/projects`**: Convert a won quotation into an active delivery project.
- **`PATCH /api/staff/projects/[id]`**: Advance project delivery status.

### Client Portal Endpoints
- **`GET /api/portal/projects`**: Fetch client's authorized projects, milestones, and deliverables.
- **`POST /api/portal/support`**: Create a new support ticket.

### Webhooks
- **`POST /api/webhooks/whatsapp`**: Webhook handler for incoming WhatsApp Cloud API events.
- **`POST /api/webhooks/payment`**: Verified signature webhook for payment processing.
- **`GET /api/health`**: Health check and database connectivity verification.

