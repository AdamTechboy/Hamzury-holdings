-- 012_create_internal_tools.sql
-- Internal Tools: Item Saver and Account Access Register (strictly no plain text passwords)

-- 1. Item Saver (Staff Knowledge and Resource Repository)
CREATE TABLE IF NOT EXISTS public.resource_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    description TEXT,
    url TEXT NOT NULL,
    source VARCHAR(100),
    tags TEXT[] DEFAULT '{}',
    added_by UUID REFERENCES public.user_profiles(id) ON DELETE SET NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'archived', 'deprecated')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    last_reviewed_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. Account Access Register (Governance & Custodian Tracking)
-- IMPORTANT: Passwords, recovery codes, and credentials must NEVER be stored in this table.
-- Only metadata and secure vault item references (e.g., Bitwarden / 1Password UUIDs) are recorded.
CREATE TABLE IF NOT EXISTS public.account_access_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    account_name VARCHAR(255) NOT NULL,
    purpose TEXT NOT NULL,
    login_email VARCHAR(255) NOT NULL,
    responsible_user_id UUID REFERENCES public.user_profiles(id) ON DELETE SET NULL,
    department_id UUID REFERENCES public.departments(id) ON DELETE SET NULL,
    access_status VARCHAR(30) NOT NULL DEFAULT 'active' CHECK (
        access_status IN ('active', 'suspended', 'revoked', 'under_review')
    ),
    vault_item_reference VARCHAR(255), -- Reference identifier inside organizational password vault
    mfa_enabled BOOLEAN NOT NULL DEFAULT false,
    last_access_review DATE,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_resource_category ON public.resource_items(category);
CREATE INDEX IF NOT EXISTS idx_resource_tags ON public.resource_items USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_accounts_dept ON public.account_access_records(department_id);
CREATE INDEX IF NOT EXISTS idx_accounts_responsible ON public.account_access_records(responsible_user_id);

