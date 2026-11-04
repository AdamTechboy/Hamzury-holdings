# Hamzury Holdings — System Architecture

## Overview
Hamzury Holdings unites 6 specialized ventures under a unified organizational platform:
1. **BizDoc**: Business documentation, corporate governance, and regulatory compliance.
2. **Medialy**: Strategic branding, creative marketing, and customer acquisition.
3. **SUBT**: Web architecture, software engineering, and CRM automation.
4. **Iotics**: Smart equipment, site automation, and hardware integrations.
5. **Hamzury Hub**: Workspace enablement, tool adoption, and team capability training.
6. **Iwiin**: Strategic partnerships, funding positioning, and opportunity readiness.

## Architectural Layers
- **Presentation & Routing**: Next.js App Router (TypeScript) supporting Public marketing pages, Client Portal (`/portal`), and Staff Operations (`/staff`).
- **Data & Identity**: Supabase PostgreSQL with strict Row Level Security (RLS) and Supabase Auth with cookie-based SSR.
- **Storage**: Supabase Storage buckets categorized by sensitivity (`public-assets`, `client-documents`, `project-deliverables`, `internal-documents`, `staff-avatars`).
- **Deployment**: Netlify hosting preserving existing static fallback capabilities during migration.

## Modular Monolith
Rather than managing fragmented independent applications, Hamzury operates as a modular monolith:
- A single centralized PostgreSQL database.
- Central identity and permission control.
- Isolated venture views with shared client accounts.
- Cross-venture referral and repeat business tracking.

