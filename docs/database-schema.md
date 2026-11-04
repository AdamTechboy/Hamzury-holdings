# Database Schema Specification

The Hamzury platform relies on a normalized relational PostgreSQL schema managed in `supabase/migrations/`:

## 1. Organization & Catalog
- **`departments`**: Registered corporate ventures (`bizdoc`, `medialy`, `subt`, `iotics`, `hamzury-hub`, `iwiin`).
- **`services`**: Multi-tiered catalog items (Level 0: Essentials up to Level 3: Expansion & Governance).

## 2. Identity & Access Management (IAM)
- **`user_profiles`**: Extends `auth.users` with contact information and profile avatars.
- **`user_roles`**: Granular role assignments (`holding_super_admin`, `holding_manager`, `crm_manager`, `crm_agent`, `department_manager`, `department_staff`, `marketing`, `finance`, `client`).
- **`department_memberships`**: Multi-department staff association.

## 3. Customer & Relationship Management
- **`customers`**: Business or individual clients across all ventures.
- **`customer_memberships`**: Grants authenticated portal accounts access to customer entities.
- **`customer_contacts`**: Additional stakeholders and contacts within a client organization.

## 4. Sales Pipeline & CRM
- **`leads`**: Centralized enquiry capture with unique references (e.g., `ENQ-2026-XXXX`).
- **`lead_activities`**: Full chronological audit trail of calls, WhatsApp conversations, notes, and proposals.
- **`lead_assignments`**: Assignment transitions and accountability history.

## 5. Quotations & Finance
- **`quotations`**: Scoped proposals with validity dates and pricing.
- **`quotation_items`**: Itemized breakdown linked to catalog services.
- **`payments`**: Payment reconciliation via secure webhooks or manual audit. Card data is never stored locally.

## 6. Project Delivery
- **`projects`**: Service fulfillment lifecycle from onboarding to delivery and aftercare.
- **`project_services`**: Services included in each project.
- **`project_tasks`**: Granular assignments, milestones, and deliverables.
- **`project_requirements`**: Required client submissions and checklists.
- **`documents`**: Encrypted private storage references for deliverables and client records.

## 7. Internal Productivity Tools
- **`resource_items`** (Item Saver): Searchable tool, asset, and bookmark directory.
- **`account_access_records`** (Account Access Register): Governance directory of services and custodian assignments. *Passwords are strictly forbidden from database storage.*

## 8. Retention & Support
- **`support_tickets`** & **`support_messages`**: Client inquiry handling.
- **`renewals`** & **`referrals`**: Automated renewal reminders and customer referral rewards.

