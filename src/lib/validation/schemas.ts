import { z } from 'zod'

export const publicEnquirySchema = z.object({
  fullName: z.string().min(2, 'Full name is required').max(100),
  email: z.string().email('Valid email address is required'),
  phone: z.string().min(7, 'Valid contact phone number is required').max(30),
  organisationName: z.string().max(100).optional(),
  departmentSlug: z.enum(['bizdoc', 'medialy', 'subt', 'iotics', 'hamzury-hub', 'iwiin']),
  serviceCode: z.string().min(2).max(10),
  description: z.string().min(10, 'Please provide brief details about your request').max(2000),
  sourceUrl: z.string().optional(),
  botTrap: z.string().max(0, 'Spam detected').optional() // Honeypot field for bot protection
})

export const quotationCreateSchema = z.object({
  leadId: z.string().uuid().optional(),
  customerId: z.string().uuid(),
  validUntil: z.string(),
  currency: z.string().default('NGN'),
  discount: z.number().nonnegative().default(0),
  terms: z.string().optional(),
  items: z.array(
    z.object({
      serviceId: z.string().uuid().optional(),
      description: z.string().min(3),
      quantity: z.number().int().positive(),
      unitPrice: z.number().nonnegative()
    })
  ).min(1, 'At least one line item is required')
})

export const resourceItemSchema = z.object({
  title: z.string().min(2).max(200),
  category: z.string().min(2).max(50),
  description: z.string().max(1000).optional(),
  url: z.string().url('A valid URL is required'),
  source: z.string().max(100).optional(),
  tags: z.array(z.string()).default([])
})

export const accountAccessSchema = z.object({
  accountName: z.string().min(2).max(100),
  purpose: z.string().min(3).max(500),
  loginEmail: z.string().email(),
  responsibleUserId: z.string().uuid().optional(),
  departmentId: z.string().uuid().optional(),
  accessStatus: z.enum(['active', 'suspended', 'revoked', 'under_review']).default('active'),
  vaultItemReference: z.string().max(100).optional(),
  mfaEnabled: z.boolean().default(false),
  lastAccessReview: z.string().optional(),
  notes: z.string().max(1000).optional()
})
