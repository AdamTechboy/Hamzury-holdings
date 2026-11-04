export function generateReference(prefix: 'ENQ' | 'QTE' | 'PRJ' | 'TCK'): string {
  const year = new Date().getFullYear()
  const random = Math.random().toString(36).substring(2, 7).toUpperCase()
  return `${prefix}-${year}-${random}`
}

