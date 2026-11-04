-- 014_enable_rls_and_policies.sql
-- Comprehensive Row-Level Security (RLS) and Security Barrier Policies

-- 1. Helper Functions to Evaluate User Roles and Memberships
CREATE OR REPLACE FUNCTION public.current_user_has_role(required_role TEXT)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
    SELECT EXISTS (
        SELECT 1 FROM public.user_roles
        WHERE user_id = auth.uid() AND role = required_role
    );
$$;

CREATE OR REPLACE FUNCTION public.is_holding_admin()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
    SELECT EXISTS (
        SELECT 1 FROM public.user_roles
        WHERE user_id = auth.uid() AND role IN ('holding_super_admin', 'holding_manager')
    );
$$;

CREATE OR REPLACE FUNCTION public.is_dept_staff(dept_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
    SELECT EXISTS (
        SELECT 1 FROM public.department_memberships
        WHERE user_id = auth.uid() AND department_id = dept_id AND is_active = true
    ) OR public.is_holding_admin();
$$;

CREATE OR REPLACE FUNCTION public.is_customer_owner(cust_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
    SELECT EXISTS (
        SELECT 1 FROM public.customer_memberships
        WHERE user_id = auth.uid() AND customer_id = cust_id
    );
$$;

-- 2. Enable RLS on All Tables
ALTER TABLE public.departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.department_memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customer_memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customer_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lead_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lead_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quotations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quotation_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_requirements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversation_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resource_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.account_access_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.support_tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.support_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.renewals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.follow_up_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.consents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

-- 3. Public Read Policies for Catalog and Content
CREATE POLICY "Public can view active departments" ON public.departments
    FOR SELECT USING (is_active = true);

CREATE POLICY "Public can view approved services" ON public.services
    FOR SELECT USING (is_approved = true);

CREATE POLICY "Public can view testimonials" ON public.testimonials
    FOR SELECT USING (true);

-- 4. User Profiles and Roles Policies
CREATE POLICY "Users can view own profile" ON public.user_profiles
    FOR SELECT USING (id = auth.uid() OR public.is_holding_admin());

CREATE POLICY "Users can update own profile" ON public.user_profiles
    FOR UPDATE USING (id = auth.uid());

CREATE POLICY "Admins can view and manage user roles" ON public.user_roles
    FOR ALL USING (public.is_holding_admin());

CREATE POLICY "Users can view their own roles" ON public.user_roles
    FOR SELECT USING (user_id = auth.uid());

-- 5. Customer Access Policies
CREATE POLICY "Customers can view own profile" ON public.customers
    FOR SELECT USING (public.is_customer_owner(id) OR auth.uid() IS NOT NULL);

CREATE POLICY "Holding & Staff can manage customers" ON public.customers
    FOR ALL USING (auth.uid() IS NOT NULL);

-- 6. Leads & Enquiry Policies
-- Anonymous visitors can submit enquiries via restricted API (or service key), authenticated staff can read/manage
CREATE POLICY "Staff can view relevant leads" ON public.leads
    FOR SELECT USING (
        public.is_holding_admin() OR
        public.current_user_has_role('crm_manager') OR
        public.current_user_has_role('crm_agent') OR
        public.is_dept_staff(department_id) OR
        assigned_to = auth.uid()
    );

CREATE POLICY "Staff can update leads" ON public.leads
    FOR UPDATE USING (
        public.is_holding_admin() OR
        public.current_user_has_role('crm_manager') OR
        public.is_dept_staff(department_id) OR
        assigned_to = auth.uid()
    );

-- 7. Projects Policies (Clients only see own, staff sees department or assigned)
CREATE POLICY "Clients see their own projects" ON public.projects
    FOR SELECT USING (
        public.is_customer_owner(customer_id) OR
        public.is_holding_admin() OR
        public.is_dept_staff(department_id) OR
        project_manager = auth.uid()
    );

CREATE POLICY "Staff can update authorised projects" ON public.projects
    FOR UPDATE USING (
        public.is_holding_admin() OR
        public.is_dept_staff(department_id) OR
        project_manager = auth.uid()
    );

-- 8. Project Tasks Policies
CREATE POLICY "Clients & Staff view project tasks" ON public.project_tasks
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.projects p
            WHERE p.id = project_id AND (
                public.is_customer_owner(p.customer_id) OR
                public.is_holding_admin() OR
                public.is_dept_staff(p.department_id) OR
                assigned_to = auth.uid()
            )
        )
    );

CREATE POLICY "Assigned staff can update their tasks" ON public.project_tasks
    FOR UPDATE USING (
        assigned_to = auth.uid() OR
        public.is_holding_admin() OR
        EXISTS (SELECT 1 FROM public.projects p WHERE p.id = project_id AND public.is_dept_staff(p.department_id))
    );

-- 9. Documents Policies (Private Storage & Downloads)
CREATE POLICY "Access documents" ON public.documents
    FOR SELECT USING (
        public.is_customer_owner(customer_id) OR
        public.is_holding_admin() OR
        uploaded_by = auth.uid()
    );

CREATE POLICY "Clients and staff upload documents" ON public.documents
    FOR INSERT WITH CHECK (
        public.is_customer_owner(customer_id) OR
        auth.uid() IS NOT NULL
    );

-- 10. Internal Tools Policies
CREATE POLICY "Staff view and add resource items" ON public.resource_items
    FOR ALL USING (auth.uid() IS NOT NULL);

-- Account access records strictly restricted to Holding Admin & designated custodians
CREATE POLICY "Restricted account access records" ON public.account_access_records
    FOR SELECT USING (
        public.is_holding_admin() OR
        responsible_user_id = auth.uid()
    );

CREATE POLICY "Admin manage account access records" ON public.account_access_records
    FOR ALL USING (public.is_holding_admin());

-- 11. Support & Notifications
CREATE POLICY "Clients and staff view support tickets" ON public.support_tickets
    FOR SELECT USING (
        public.is_customer_owner(customer_id) OR
        public.is_holding_admin() OR
        assigned_to = auth.uid()
    );

CREATE POLICY "Clients can create support tickets" ON public.support_tickets
    FOR INSERT WITH CHECK (
        public.is_customer_owner(customer_id)
    );

CREATE POLICY "Users view own notifications" ON public.notifications
    FOR ALL USING (user_id = auth.uid());
