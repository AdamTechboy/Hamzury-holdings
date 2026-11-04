-- 005_create_leads.sql
-- CRM Leads, enquiry routing, and assignment tracking

CREATE TABLE IF NOT EXISTS public.leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lead_reference VARCHAR(50) NOT NULL UNIQUE,
    customer_id UUID REFERENCES public.customers(id) ON DELETE SET NULL,
    department_id UUID NOT NULL REFERENCES public.departments(id) ON DELETE RESTRICT,
    service_id UUID REFERENCES public.services(id) ON DELETE SET NULL,
    
    -- Lead status following standard pipeline
    status VARCHAR(50) NOT NULL DEFAULT 'NEW ENQUIRY' CHECK (
        status IN (
            'NEW ENQUIRY',
            'CONTACTED',
            'QUALIFIED',
            'DISCOVERY',
            'PROPOSAL SENT',
            'NEGOTIATION',
            'WON',
            'LOST',
            'NURTURE'
        )
    ),
    priority VARCHAR(20) NOT NULL DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
    source VARCHAR(100) NOT NULL DEFAULT 'website',
    source_url TEXT,
    
    assigned_to UUID REFERENCES public.user_profiles(id) ON DELETE SET NULL,
    description TEXT,
    answers JSONB DEFAULT '{}'::jsonb,
    next_action TEXT,
    follow_up_at TIMESTAMPTZ,
    
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Lead assignment records for accountability
CREATE TABLE IF NOT EXISTS public.lead_assignments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lead_id UUID NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
    assigned_by UUID REFERENCES public.user_profiles(id) ON DELETE SET NULL,
    assigned_to UUID NOT NULL REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    reason TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_leads_ref ON public.leads(lead_reference);
CREATE INDEX IF NOT EXISTS idx_leads_dept ON public.leads(department_id);
CREATE INDEX IF NOT EXISTS idx_leads_assigned ON public.leads(assigned_to);
CREATE INDEX IF NOT EXISTS idx_leads_status ON public.leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_follow_up ON public.leads(follow_up_at);
