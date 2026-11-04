-- 004_create_services.sql
-- Venture service offerings catalog

CREATE TABLE IF NOT EXISTS public.services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    department_id UUID NOT NULL REFERENCES public.departments(id) ON DELETE CASCADE,
    code VARCHAR(50) NOT NULL UNIQUE,
    title VARCHAR(255) NOT NULL,
    level INTEGER NOT NULL DEFAULT 0,
    scope TEXT NOT NULL,
    deliverable TEXT NOT NULL,
    requirements TEXT,
    is_approved BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_services_dept ON public.services(department_id);
CREATE INDEX IF NOT EXISTS idx_services_level ON public.services(level);
CREATE INDEX IF NOT EXISTS idx_services_code ON public.services(code);
