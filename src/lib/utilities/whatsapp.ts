export function generateWhatsAppLink(params: {
  phone?: string
  enquiryReference: string
  ventureName: string
  serviceTitle: string
}): string {
  const targetPhone = params.phone || process.env.NEXT_PUBLIC_WHATSAPP_SUPPORT_NUMBER || '2348000000000'
  const cleanPhone = targetPhone.replace(/[^0-9]/g, '')
  
  const text = encodeURIComponent(
    `Hello Hamzury Team, I have an enquiry regarding ${params.ventureName} (${params.serviceTitle}). Ref: ${params.enquiryReference}`
  )
  
  return `https://wa.me/${cleanPhone}?text=${text}`
}
