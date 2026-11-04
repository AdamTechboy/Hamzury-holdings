-- 010_create_requirements.sql
-- Project requirements, checkpoints, and client/project documents

CREATE TABLE IF NOT EXISTS public.project_requirements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    required BOOLEAN NOT NULL DEFAULT true,
    status VARCHAR(30) NOT NULL DEFAULT 'pending' CHECK (
        status IN ('pending', 'submitted', 'approved', 'rejected')
    ),
    due_date DATE,
    reviewed_by UUID REFERENCES public.user_profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Documents associated with customers, projects, or deliverables
CREATE TABLE IF NOT EXISTS public.documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
    customer_id UUID NOT NULL REFERENCES public.customers(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    document_type VARCHAR(50) NOT NULL CHECK (
        document_type IN (
            'requirement_submission',
            'client_evidence',
            'deliverable',
            'contract',
            'compliance_record',
            'general'
        )
    ),
    storage_path TEXT NOT NULL,
    file_size BIGINT,
    mime_type VARCHAR(100),
    status VARCHAR(30) NOT NULL DEFAULT 'pending_review' CHECK (
        status IN ('pending_review', 'approved', 'rejected', 'archived')
    ),
    uploaded_by UUID REFERENCES public.user_profiles(id) ON DELETE SET NULL,
    reviewed_by UUID REFERENCES public.user_profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_req_project ON public.project_requirements(project_id);
CREATE INDEX IF NOT EXISTS idx_docs_project ON public.documents(project_id);
CREATE INDEX IF NOT EXISTS idx_docs_customer ON public.documents(customer_id);
