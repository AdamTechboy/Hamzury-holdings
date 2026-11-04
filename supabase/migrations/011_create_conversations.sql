-- 011_create_conversations.sql
-- Omnichannel communication (Web, WhatsApp) and internal notifications

CREATE TABLE IF NOT EXISTS public.conversations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID REFERENCES public.customers(id) ON DELETE SET NULL,
    lead_id UUID REFERENCES public.leads(id) ON DELETE SET NULL,
    channel VARCHAR(30) NOT NULL DEFAULT 'web' CHECK (channel IN ('web', 'whatsapp', 'email', 'phone')),
    channel_reference VARCHAR(255),
    status VARCHAR(30) NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'pending_customer', 'resolved', 'closed')),
    assigned_to UUID REFERENCES public.user_profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.conversation_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    conversation_id UUID NOT NULL REFERENCES public.conversations(id) ON DELETE CASCADE,
    sender_type VARCHAR(20) NOT NULL CHECK (sender_type IN ('customer', 'staff', 'system')),
    sender_id UUID REFERENCES public.user_profiles(id) ON DELETE SET NULL,
    message_text TEXT NOT NULL,
    metadata JSONB DEFAULT '{}'::jsonb,
    delivery_status VARCHAR(30) NOT NULL DEFAULT 'sent' CHECK (
        delivery_status IN ('pending', 'sent', 'delivered', 'read', 'failed')
    ),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Internal user notifications
CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    link TEXT,
    is_read BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_conversations_customer ON public.conversations(customer_id);
CREATE INDEX IF NOT EXISTS idx_conversations_lead ON public.conversations(lead_id);
CREATE INDEX IF NOT EXISTS idx_conv_messages_conv ON public.conversation_messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user ON public.notifications(user_id, is_read);
