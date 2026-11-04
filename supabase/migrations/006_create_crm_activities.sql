-- 006_create_crm_activities.sql
-- Lead activity logs, interaction history, and audit records

CREATE TABLE IF NOT EXISTS public.lead_activities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lead_id UUID NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE SET NULL,
    activity_type VARCHAR(50) NOT NULL CHECK (
        activity_type IN (
            'enquiry_received',
            'phone_call',
            'whatsapp_message',
            'email_sent',
            'meeting_held',
            'proposal_sent',
            'status_changed',
            'internal_note',
            'assignment_changed'
        )
    ),
    description TEXT NOT NULL,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_lead_activities_lead ON public.lead_activities(lead_id);
CREATE INDEX IF NOT EXISTS idx_lead_activities_user ON public.lead_activities(user_id);
CREATE INDEX IF NOT EXISTS idx_lead_activities_created ON public.lead_activities(created_at DESC);
