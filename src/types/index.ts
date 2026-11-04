export type UserRole =
  | 'holding_super_admin'
  | 'holding_manager'
  | 'crm_manager'
  | 'crm_agent'
  | 'department_manager'
  | 'department_staff'
  | 'marketing'
  | 'finance'
  | 'client'

export type LeadStatus =
  | 'NEW ENQUIRY'
  | 'CONTACTED'
  | 'QUALIFIED'
  | 'DISCOVERY'
  | 'PROPOSAL SENT'
  | 'NEGOTIATION'
  | 'WON'
  | 'LOST'
  | 'NURTURE'

export type ProjectStatus =
  | 'AWAITING ACTIVATION'
  | 'ONBOARDING'
  | 'REQUIREMENTS PENDING'
  | 'READY FOR WORK'
  | 'IN PROGRESS'
  | 'QUALITY REVIEW'
  | 'AWAITING CLIENT APPROVAL'
  | 'DELIVERED'
  | 'AFTERCARE'

export interface VentureInfo {
  slug: string
  name: string
  tagline: string
  description: string
  color: string
}

export const VENTURES: Record<string, VentureInfo> = {
  bizdoc: {
    slug: 'bizdoc',
    name: 'BizDoc',
    tagline: 'Bank-Ready Business Documentation',
    description: 'Corporate registration, compliance reviews, document governance, and legal structuring.',
    color: '#0284c7'
  },
  medialy: {
    slug: 'medialy',
    name: 'Medialy',
    tagline: 'Strategic Branding & Marketing Systems',
    description: 'Visual identity kits, content workflows, conversion campaigns, and brand growth.',
    color: '#8b5cf6'
  },
  subt: {
    slug: 'subt',
    name: 'SUBT',
    tagline: 'Digital Infrastructure & Workflow Automation',
    description: 'Custom web development, CRM integration, task automation, and team systems.',
    color: '#10b981'
  },
  iotics: {
    slug: 'iotics',
    name: 'Iotics',
    tagline: 'Practical Automation & Hardware Solutions',
    description: 'Smart site installations, physical workflow automation, and hardware integration.',
    color: '#f59e0b'
  },
  'hamzury-hub': {
    slug: 'hamzury-hub',
    name: 'Hamzury Hub',
    tagline: 'Team Training & Operational Capability',
    description: 'Essential tool adoption, supervisor capability development, and team systems.',
    color: '#ec4899'
  },
  iwiin: {
    slug: 'iwiin',
    name: 'Iwiin',
    tagline: 'Partnership Positioning & Funding Readiness',
    description: 'Opportunity discovery, grant and partner proposals, and strategic growth positioning.',
    color: '#6366f1'
  }
}
