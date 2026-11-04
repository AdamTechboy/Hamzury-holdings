import { UserRole } from '@/types'

export const ROLE_HIERARCHY: Record<UserRole, number> = {
  holding_super_admin: 100,
  holding_manager: 80,
  crm_manager: 60,
  department_manager: 50,
  finance: 40,
  marketing: 30,
  crm_agent: 30,
  department_staff: 20,
  client: 10
}

export function isHoldingStaff(role: UserRole): boolean {
  return role === 'holding_super_admin' || role === 'holding_manager'
}

export function canManageCRM(role: UserRole): boolean {
  return isHoldingStaff(role) || role === 'crm_manager'
}

export function canAccessAccountRegister(role: UserRole): boolean {
  // Passwords / credentials access governance is strictly restricted
  return isHoldingStaff(role)
}

export function canManageQuotations(role: UserRole): boolean {
  return isHoldingStaff(role) || role === 'finance' || role === 'department_manager' || role === 'crm_manager'
}
