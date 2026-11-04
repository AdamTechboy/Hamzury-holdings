-- 003_create_customers.sql
-- Customers, customer portal access, and organization contacts

CREATE TABLE IF NOT EXISTS public.customers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_type VARCHAR(50) NOT NULL DEFAULT 'business' CHECK (customer_type IN ('individual', 'business', 'enterprise')),
    full_name VARCHAR(255) NOT NULL,
    organisation_name VARCHAR(255),
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    address TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Customer memberships linking user_profiles (authenticated portal users) to customers
CREATE TABLE IF NOT EXISTS public.customer_memberships (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID NOT NULL REFERENCES public.customers(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    role VARCHAR(50) NOT NULL DEFAULT 'primary_contact',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE(customer_id, user_id)
);

-- Additional customer contacts (team members, billing contacts)
CREATE TABLE IF NOT EXISTS public.customer_contacts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID NOT NULL REFERENCES public.customers(id) ON DELETE CASCADE,
    contact_name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(50),
    role_title VARCHAR(100),
    is_primary BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_customers_email ON public.customers(email);
CREATE INDEX IF NOT EXISTS idx_customer_memberships_user ON public.customer_memberships(user_id);
CREATE INDEX IF NOT EXISTS idx_customer_memberships_customer ON public.customer_memberships(customer_id);
