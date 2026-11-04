-- seed.sql
-- Baseline Seed Data for Hamzury Holdings

-- 1. Insert Core Departments / Ventures
INSERT INTO public.departments (id, name, slug, description, website_url, is_active)
VALUES 
    ('11111111-1111-1111-1111-111111111101', 'BizDoc', 'bizdoc', 'Corporate documentation, legal compliance, and business governance support.', '/ventures/bizdoc', true),
    ('11111111-1111-1111-1111-111111111102', 'Medialy', 'medialy', 'Strategic branding, visual assets, marketing campaigns, and conversion systems.', '/ventures/medialy', true),
    ('11111111-1111-1111-1111-111111111103', 'SUBT', 'subt', 'Modern software development, websites, CRM workflows, and automation.', '/ventures/subt', true),
    ('11111111-1111-1111-1111-111111111104', 'Iotics', 'iotics', 'Smart site automation, equipment integration, and physical-hardware solutions.', '/ventures/iotics', true),
    ('11111111-1111-1111-1111-111111111105', 'Hamzury Hub', 'hamzury-hub', 'Practical team training, operational tool adoption, and capability building.', '/ventures/hamzury-hub', true),
    ('11111111-1111-1111-1111-111111111106', 'Iwiin', 'iwiin', 'Strategic partnership positioning, funding readiness, and opportunity applications.', '/ventures/iwiin', true)
ON CONFLICT (slug) DO UPDATE SET 
    name = EXCLUDED.name,
    description = EXCLUDED.description;

-- 2. Insert Core Service Offerings (from dist/seed.js)
INSERT INTO public.services (department_id, code, title, level, scope, deliverable, requirements, is_approved)
VALUES
    -- BizDoc
    ('11111111-1111-1111-1111-111111111101', 'b1', 'Bank-Ready Documents', 0, 
     'Review the documents needed for a corporate account and prepare the agreed missing items.',
     'Applicable business documents, TIN support, SCUML where required, letterhead and board resolution according to approved scope.',
     'Business and authorized-person details; existing documents; applicable identity and address evidence.', true),
    ('11111111-1111-1111-1111-111111111101', 'b2', 'Business Document & Compliance Review', 1,
     'Review business records and identify the applicable outstanding work.',
     'Document register, gap review and selected processing under agreed scope.',
     'Existing business documents and operating context.', true),
    ('11111111-1111-1111-1111-111111111101', 'b3', 'Compliance Calendar & Document Governance', 2,
     'Organize applicable recurring obligations and key business records.',
     'Reviewed calendar, responsibility register and agreed documentation.',
     'Business records and confirmed obligations.', true),
    ('11111111-1111-1111-1111-111111111101', 'b4', 'Expansion Readiness Review', 3,
     'Review documentation and applicable obligations for a planned expansion.',
     'Gap assessment and agreed implementation scope.',
     'Expansion plan, operating locations and current records.', true),

    -- Medialy
    ('11111111-1111-1111-1111-111111111102', 'm1', 'Profile Plan & Branding Kit', 0,
     'Give your business a clear introduction and a consistent starting identity.',
     'Business profile plan, core message, agreed logo or existing-logo application, colours, typography and starter brand assets.',
     'Business description, audience, existing logo and preferred references.', true),
    ('11111111-1111-1111-1111-111111111102', 'm2', 'Portfolio & Content System', 1,
     'Present completed projects clearly and build a practical content routine.',
     'Portfolio structure, agreed content templates, channel plan and follow-up scripts.',
     'Project photographs, permission to use client work and service details.', true),
    ('11111111-1111-1111-1111-111111111102', 'm3', 'Campaign & Conversion Management', 2,
     'Connect campaign activity to a measured sales process.',
     'Campaign plan, sales materials, pipeline routines and performance review.',
     'Approved offer, channel access and budget review.', true),
    ('11111111-1111-1111-1111-111111111102', 'm4', 'Growth & Retention Programme', 3,
     'Improve repeat business, referrals and measured acquisition.',
     'Growth experiments, retention routines and management reporting.',
     'Sales evidence, customer records and approved budget.', true),

    -- SUBT
    ('11111111-1111-1111-1111-111111111103', 's1', 'Google Business Profile Setup', 0,
     'Help eligible businesses establish their business profile and submit accurate information.',
     'Eligibility review, profile setup or improvement, service details and verification guidance.',
     'Accurate business information, eligible location or service area, business-controlled account and verification evidence.', true),
    ('11111111-1111-1111-1111-111111111103', 's2', 'Portfolio Website & Enquiry Tracker', 1,
     'Connect your work, enquiries and next actions in a simple system.',
     'Agreed website pages, enquiry capture and lead-tracking configuration.',
     'Approved content, brand assets, domain access and enquiry workflow.', true),
    ('11111111-1111-1111-1111-111111111103', 's3', 'Project Workflow & Automation', 2,
     'Connect enquiry, costing, project delivery and reporting.',
     'Approved workflow configuration, selected automations, testing and handover.',
     'Process map, staff roles, existing tools and approved integration scope.', true),
    ('11111111-1111-1111-1111-111111111103', 's4', 'Multi-Team Systems & Analytics', 3,
     'Extend proven workflows to the next business stage.',
     'Approved permissions, integrations, dashboards and support scope.',
     'Team structure, reporting needs and technical review.', true),

    -- Iotics
    ('11111111-1111-1111-1111-111111111104', 'i1', 'Practical Automation Needs Check', 0,
     'Assess a real physical-work problem where hardware may help.',
     'Initial needs checklist and feasibility direction, if relevant.',
     'Site context, task description and basic operating constraints.', true),
    ('11111111-1111-1111-1111-111111111104', 'i2', 'Scoped Site Automation Plan', 1,
     'Plan a suitable physical automation improvement where needed.',
     'Site needs assessment, equipment proposal and installation scope.',
     'Site access and operating requirements.', true),
    ('11111111-1111-1111-1111-111111111104', 'i3', 'Approved Smart Installation', 2,
     'Deliver a technically reviewed physical automation project.',
     'Agreed equipment, installation, testing and user handover.',
     'Approved site survey, equipment budget and installation access.', true),
    ('11111111-1111-1111-1111-111111111104', 'i4', 'Automation Rollout & Maintenance', 3,
     'Extend successful installations with a support plan.',
     'Approved rollout scope, commissioning and maintenance schedule.',
     'Site review, operating evidence and equipment scope.', true),

    -- Hamzury Hub
    ('11111111-1111-1111-1111-111111111105', 'h1', 'Workspace & Customer-Handling Essentials', 0,
     'Help the owner use the agreed tools and handle enquiries consistently.',
     'Short practical training and a simple enquiry-handling checklist.',
     'Participant availability and tool access.', true),
    ('11111111-1111-1111-1111-111111111105', 'h2', 'Team Tool Adoption', 1,
     'Train the relevant team to use the selected business tools.',
     'Role-based walkthrough, practice task and readiness check.',
     'Team roles and availability.', true),
    ('11111111-1111-1111-1111-111111111105', 'h3', 'Supervisor & Systems Training', 2,
     'Build consistent use of the operating process.',
     'Supervisor learning plan, practical assessment and team guidance.',
     'Named supervisors and agreed operating procedures.', true),
    ('11111111-1111-1111-1111-111111111105', 'h4', 'Team Capability Programme', 3,
     'Close the skills gaps that limit expansion.',
     'Role-based learning plan, supervised application and assessment.',
     'Skills review and business priorities.', true),

    -- Iwiin
    ('11111111-1111-1111-1111-111111111106', 'w1', 'Opportunity Readiness Check', 0,
     'Identify whether a suitable partnership or funding route is relevant now.',
     'Readiness checklist and a suitable next action. No award guarantee.',
     'Business profile and eligibility information.', true),
    ('11111111-1111-1111-1111-111111111106', 'w2', 'Partnership Positioning', 1,
     'Prepare an appropriate partnership approach.',
     'Partner profile and outreach direction for agreed opportunities.',
     'Capacity evidence and partnership objectives.', true),
    ('11111111-1111-1111-1111-111111111106', 'w3', 'Opportunity Application Support', 2,
     'Support an eligible, selected opportunity.',
     'Eligibility review and agreed proposal or application assistance.',
     'Opportunity terms and business evidence.', true),
    ('11111111-1111-1111-1111-111111111106', 'w4', 'Strategic Partnerships & Funding Readiness', 3,
     'Prepare for suitable growth partnerships and funding opportunities.',
     'Opportunity pipeline, readiness work and agreed proposal support.',
     'Business evidence, partnership goals and eligibility review.', true)
ON CONFLICT (code) DO UPDATE SET 
    title = EXCLUDED.title,
    scope = EXCLUDED.scope,
    deliverable = EXCLUDED.deliverable,
    requirements = EXCLUDED.requirements;
