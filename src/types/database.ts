export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      departments: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          logo_url: string | null
          website_url: string | null
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          logo_url?: string | null
          website_url?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          logo_url?: string | null
          website_url?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      user_profiles: {
        Row: {
          id: string
          full_name: string
          email: string
          phone: string | null
          avatar_url: string | null
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          full_name: string
          email: string
          phone?: string | null
          avatar_url?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string
          email?: string
          phone?: string | null
          avatar_url?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      user_roles: {
        Row: {
          id: string
          user_id: string
          role: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          role: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          role?: string
          created_at?: string
        }
      }
      customers: {
        Row: {
          id: string
          customer_type: string
          full_name: string
          organisation_name: string | null
          email: string
          phone: string | null
          address: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          customer_type?: string
          full_name: string
          organisation_name?: string | null
          email: string
          phone?: string | null
          address?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          customer_type?: string
          full_name?: string
          organisation_name?: string | null
          email?: string
          phone?: string | null
          address?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      services: {
        Row: {
          id: string
          department_id: string
          code: string
          title: string
          level: number
          scope: string
          deliverable: string
          requirements: string | null
          is_approved: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          department_id: string
          code: string
          title: string
          level?: number
          scope: string
          deliverable: string
          requirements?: string | null
          is_approved?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          department_id?: string
          code?: string
          title?: string
          level?: number
          scope?: string
          deliverable?: string
          requirements?: string | null
          is_approved?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      leads: {
        Row: {
          id: string
          lead_reference: string
          customer_id: string | null
          department_id: string
          service_id: string | null
          status: string
          priority: string
          source: string
          source_url: string | null
          assigned_to: string | null
          description: string | null
          answers: Json | null
          next_action: string | null
          follow_up_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          lead_reference: string
          customer_id?: string | null
          department_id: string
          service_id?: string | null
          status?: string
          priority?: string
          source?: string
          source_url?: string | null
          assigned_to?: string | null
          description?: string | null
          answers?: Json | null
          next_action?: string | null
          follow_up_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          lead_reference?: string
          customer_id?: string | null
          department_id?: string
          service_id?: string | null
          status?: string
          priority?: string
          source?: string
          source_url?: string | null
          assigned_to?: string | null
          description?: string | null
          answers?: Json | null
          next_action?: string | null
          follow_up_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      quotations: {
        Row: {
          id: string
          lead_id: string | null
          customer_id: string
          quote_reference: string
          subtotal: number
          discount: number
          total: number
          currency: string
          status: string
          terms: string | null
          valid_until: string
          created_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          lead_id?: string | null
          customer_id: string
          quote_reference: string
          subtotal?: number
          discount?: number
          total?: number
          currency?: string
          status?: string
          terms?: string | null
          valid_until: string
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          lead_id?: string | null
          customer_id?: string
          quote_reference?: string
          subtotal?: number
          discount?: number
          total?: number
          currency?: string
          status?: string
          terms?: string | null
          valid_until?: string
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      projects: {
        Row: {
          id: string
          customer_id: string
          lead_id: string | null
          quotation_id: string | null
          project_reference: string
          project_name: string
          department_id: string
          status: string
          project_manager: string | null
          start_date: string | null
          expected_completion: string | null
          completed_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          customer_id: string
          lead_id?: string | null
          quotation_id?: string | null
          project_reference: string
          project_name: string
          department_id: string
          status?: string
          project_manager?: string | null
          start_date?: string | null
          expected_completion?: string | null
          completed_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          customer_id?: string
          lead_id?: string | null
          quotation_id?: string | null
          project_reference?: string
          project_name?: string
          department_id?: string
          status?: string
          project_manager?: string | null
          start_date?: string | null
          expected_completion?: string | null
          completed_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      resource_items: {
        Row: {
          id: string
          title: string
          category: string
          description: string | null
          url: string
          source: string | null
          tags: string[] | null
          added_by: string | null
          status: string
          created_at: string
          last_reviewed_at: string
        }
        Insert: {
          id?: string
          title: string
          category: string
          description?: string | null
          url: string
          source?: string | null
          tags?: string[] | null
          added_by?: string | null
          status?: string
          created_at?: string
          last_reviewed_at?: string
        }
        Update: {
          id?: string
          title?: string
          category?: string
          description?: string | null
          url?: string
          source?: string | null
          tags?: string[] | null
          added_by?: string | null
          status?: string
          created_at?: string
          last_reviewed_at?: string
        }
      }
      account_access_records: {
        Row: {
          id: string
          account_name: string
          purpose: string
          login_email: string
          responsible_user_id: string | null
          department_id: string | null
          access_status: string
          vault_item_reference: string | null
          mfa_enabled: boolean
          last_access_review: string | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          account_name: string
          purpose: string
          login_email: string
          responsible_user_id?: string | null
          department_id?: string | null
          access_status?: string
          vault_item_reference?: string | null
          mfa_enabled?: boolean
          last_access_review?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          account_name?: string
          purpose?: string
          login_email?: string
          responsible_user_id?: string | null
          department_id?: string | null
          access_status?: string
          vault_item_reference?: string | null
          mfa_enabled?: boolean
          last_access_review?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
