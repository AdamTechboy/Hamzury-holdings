-- 013_create_support_and_retention.sql
-- Support ticketing, client retention, referrals, and security audit logging

-- 1. Support Tickets
CREATE TABLE IF NOT EXISTS public.support_tickets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ticket_reference VARCHAR(50) NOT NULL UNIQUE,
    customer_id UUID NOT NULL REFERENCES public.customers(id) ON DELETE CASCADE,
    project_id UUID REFERENCES public.projects(id) ON DELETE SET NULL,
    department_id UUID REFERENCES public.departments(id) ON DELETE SET NULL,
    subject VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    priority VARCHAR(20) NOT NULL DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
    status VARCHAR(30) NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'waiting_client', 'resolved', 'closed')),
    assigned_to UUID REFERENCES public.user_profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    resolved_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS public.support_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ticket_id UUID NOT NULL REFERENCES public.support_tickets(id) ON DELETE CASCADE,
    sender_type VARCHAR(20) NOT NULL CHECK (sender_type IN ('customer', 'staff', 'system')),
    sender_id UUID REFERENCES public.user_profiles(id) ON DELETE SET NULL,
    message_text TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. Renewals & Retention
CREATE TABLE IF NOT EXISTS public.renewals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID NOT NULL REFERENCES public.customers(id) ON DELETE CASCADE,
    project_id UUID REFERENCES public.projects(id) ON DELETE SET NULL,
    service_id UUID REFERENCES public.services(id) ON DELETE SET NULL,
    renewal_date DATE NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'contacted', 'renewed', 'churned', 'declined')),
    reminder_sent_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3. Referrals
CREATE TABLE IF NOT EXISTS public.referrals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    referring_customer_id UUID NOT NULL REFERENCES public.customers(id) ON DELETE CASCADE,
    referred_name VARCHAR(255) NOT NULL,
    referred_email VARCHAR(255),
    referred_phone VARCHAR(50),
    status VARCHAR(30) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'converted', 'closed')),
    reward_notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 4. Follow-up Tasks (sales & aftercare)
CREATE TABLE IF NOT EXISTS public.follow_up_tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID NOT NULL REFERENCES public.customers(id) ON DELETE CASCADE,
    lead_id UUID REFERENCES public.leads(id) ON DELETE SET NULL,
    project_id UUID REFERENCES public.projects(id) ON DELETE SET NULL,
    assigned_to UUID REFERENCES public.user_profiles(id) ON DELETE SET NULL,
    title VARCHAR(255) NOT NULL,
    due_date DATE NOT NULL,
    is_completed BOOLEAN NOT NULL DEFAULT false,
    completed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 5. Audit Logs
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE SET NULL,
    action VARCHAR(100) NOT NULL,
    entity_name VARCHAR(100) NOT NULL,
    entity_id VARCHAR(100) NOT NULL,
    old_data JSONB,
    new_data JSONB,
    ip_address VARCHAR(50),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 6. Consents
CREATE TABLE IF NOT EXISTS public.consents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID NOT NULL REFERENCES public.customers(id) ON DELETE CASCADE,
    consent_type VARCHAR(100) NOT NULL,
    is_granted BOOLEAN NOT NULL DEFAULT true,
    ip_address VARCHAR(50),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 7. Public Content
CREATE TABLE IF NOT EXISTS public.testimonials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    department_id UUID REFERENCES public.departments(id) ON DELETE SET NULL,
    client_name VARCHAR(255) NOT NULL,
    organisation_name VARCHAR(255),
    quote TEXT NOT NULL,
    avatar_url TEXT,
    rating INTEGER DEFAULT 5,
    is_featured BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_support_tickets_cust ON public.support_tickets(customer_id);
CREATE INDEX IF NOT EXISTS idx_support_tickets_status ON public.support_tickets(status);
CREATE INDEX IF NOT EXISTS idx_renewals_date ON public.renewals(renewal_date);
CREATE INDEX IF NOT EXISTS idx_audit_entity ON public.audit_logs(entity_name, entity_id);

