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
      department_memberships: {
        Row: {
          id: string
          user_id: string
          department_id: string
          role: string
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          department_id: string
          role?: string
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          department_id?: string
          role?: string
          is_active?: boolean
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
      customer_memberships: {
        Row: {
          id: string
          customer_id: string
          user_id: string
          role: string
          created_at: string
        }
        Insert: {
          id?: string
          customer_id: string
          user_id: string
          role?: string
          created_at?: string
        }
        Update: {
          id?: string
          customer_id?: string
          user_id?: string
          role?: string
          created_at?: string
        }
      }
      customer_contacts: {
        Row: {
          id: string
          customer_id: string
          contact_name: string
          email: string | null
          phone: string | null
          role_title: string | null
          is_primary: boolean
          created_at: string
        }
        Insert: {
          id?: string
          customer_id: string
          contact_name: string
          email?: string | null
          phone?: string | null
          role_title?: string | null
          is_primary?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          customer_id?: string
          contact_name?: string
          email?: string | null
          phone?: string | null
          role_title?: string | null
          is_primary?: boolean
          created_at?: string
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
          department_id?: string | null
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
      lead_activities: {
        Row: {
          id: string
          lead_id: string
          user_id: string | null
          activity_type: string
          description: string
          metadata: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          lead_id: string
          user_id?: string | null
          activity_type: string
          description: string
          metadata?: Json | null
          created_at?: string
        }
        Update: {
          id?: string
          lead_id?: string
          user_id?: string | null
          activity_type?: string
          description?: string
          metadata?: Json | null
          created_at?: string
        }
      }
      lead_assignments: {
        Row: {
          id: string
          lead_id: string
          assigned_by: string | null
          assigned_to: string
          reason: string | null
          created_at: string
        }
        Insert: {
          id?: string
          lead_id: string
          assigned_by?: string | null
          assigned_to: string
          reason?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          lead_id?: string
          assigned_by?: string | null
          assigned_to?: string
          reason?: string | null
          created_at?: string
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
      quotation_items: {
        Row: {
          id: string
          quotation_id: string
          service_id: string | null
          description: string
          quantity: number
          unit_price: number
          total_price: number
          created_at: string
        }
        Insert: {
          id?: string
          quotation_id: string
          service_id?: string | null
          description: string
          quantity?: number
          unit_price?: number
          total_price?: number
          created_at?: string
        }
        Update: {
          id?: string
          quotation_id?: string
          service_id?: string | null
          description?: string
          quantity?: number
          unit_price?: number
          total_price?: number
          created_at?: string
        }
      }
      payments: {
        Row: {
          id: string
          quotation_id: string | null
          customer_id: string
          payment_reference: string
          amount: number
          currency: string
          payment_method: string
          status: string
          provider_reference: string | null
          verified_at: string | null
          verified_by: string | null
          created_at: string
        }
        Insert: {
          id?: string
          quotation_id?: string | null
          customer_id: string
          payment_reference: string
          amount: number
          currency?: string
          payment_method: string
          status?: string
          provider_reference?: string | null
          verified_at?: string | null
          verified_by?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          quotation_id?: string | null
          customer_id?: string
          payment_reference?: string
          amount?: number
          currency?: string
          payment_method?: string
          status?: string
          provider_reference?: string | null
          verified_at?: string | null
          verified_by?: string | null
          created_at?: string
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
      project_tasks: {
        Row: {
          id: string
          project_id: string
          assigned_to: string | null
          title: string
          description: string | null
          status: string
          priority: string
          due_date: string | null
          completion_evidence: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          project_id: string
          assigned_to?: string | null
          title: string
          description?: string | null
          status?: string
          priority?: string
          due_date?: string | null
          completion_evidence?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          project_id?: string
          assigned_to?: string | null
          title?: string
          description?: string | null
          status?: string
          priority?: string
          due_date?: string | null
          completion_evidence?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      project_milestones: {
        Row: {
          id: string
          project_id: string
          title: string
          target_date: string | null
          is_completed: boolean
          completed_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          project_id: string
          title: string
          target_date?: string | null
          is_completed?: boolean
          completed_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          project_id?: string
          title?: string
          target_date?: string | null
          is_completed?: boolean
          completed_at?: string | null
          created_at?: string
        }
      }
      project_requirements: {
        Row: {
          id: string
          project_id: string
          title: string
          description: string | null
          required: boolean
          status: string
          due_date: string | null
          reviewed_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          project_id: string
          title: string
          description?: string | null
          required?: boolean
          status?: string
          due_date?: string | null
          reviewed_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          project_id?: string
          title?: string
          description?: string | null
          required?: boolean
          status?: string
          due_date?: string | null
          reviewed_by?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      documents: {
        Row: {
          id: string
          project_id: string | null
          customer_id: string
          title: string
          document_type: string
          storage_path: string
          file_size: number | null
          mime_type: string | null
          status: string
          uploaded_by: string | null
          reviewed_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          project_id?: string | null
          customer_id: string
          title: string
          document_type: string
          storage_path: string
          file_size?: number | null
          mime_type?: string | null
          status?: string
          uploaded_by?: string | null
          reviewed_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          project_id?: string | null
          customer_id?: string
          title?: string
          document_type?: string
          storage_path?: string
          file_size?: number | null
          mime_type?: string | null
          status?: string
          uploaded_by?: string | null
          reviewed_by?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      conversations: {
        Row: {
          id: string
          customer_id: string | null
          lead_id: string | null
          channel: string
          channel_reference: string | null
          status: string
          assigned_to: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          customer_id?: string | null
          lead_id?: string | null
          channel?: string
          channel_reference?: string | null
          status?: string
          assigned_to?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          customer_id?: string | null
          lead_id?: string | null
          channel?: string
          channel_reference?: string | null
          status?: string
          assigned_to?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      conversation_messages: {
        Row: {
          id: string
          conversation_id: string
          sender_type: string
          sender_id: string | null
          message_text: string
          metadata: Json | null
          delivery_status: string
          created_at: string
        }
        Insert: {
          id?: string
          conversation_id: string
          sender_type: string
          sender_id?: string | null
          message_text: string
          metadata?: Json | null
          delivery_status?: string
          created_at?: string
        }
        Update: {
          id?: string
          conversation_id?: string
          sender_type?: string
          sender_id?: string | null
          message_text?: string
          metadata?: Json | null
          delivery_status?: string
          created_at?: string
        }
      }
      notifications: {
        Row: {
          id: string
          user_id: string
          title: string
          message: string
          link: string | null
          is_read: boolean
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          message: string
          link?: string | null
          is_read?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          message?: string
          link?: string | null
          is_read?: boolean
          created_at?: string
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
      support_tickets: {
        Row: {
          id: string
          ticket_reference: string
          customer_id: string
          project_id: string | null
          department_id: string | null
          subject: string
          description: string
          priority: string
          status: string
          assigned_to: string | null
          created_at: string
          resolved_at: string | null
        }
        Insert: {
          id?: string
          ticket_reference: string
          customer_id: string
          project_id?: string | null
          department_id?: string | null
          subject: string
          description: string
          priority?: string
          status?: string
          assigned_to?: string | null
          created_at?: string
          resolved_at?: string | null
        }
        Update: {
          id?: string
          ticket_reference?: string
          customer_id?: string
          project_id?: string | null
          department_id?: string | null
          subject?: string
          description?: string
          priority?: string
          status?: string
          assigned_to?: string | null
          created_at?: string
          resolved_at?: string | null
        }
      }
      renewals: {
        Row: {
          id: string
          customer_id: string
          project_id: string | null
          service_id: string | null
          renewal_date: string
          status: string
          reminder_sent_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          customer_id: string
          project_id?: string | null
          service_id?: string | null
          renewal_date: string
          status?: string
          reminder_sent_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          customer_id?: string
          project_id?: string | null
          service_id?: string | null
          renewal_date?: string
          status?: string
          reminder_sent_at?: string | null
          created_at?: string
        }
      }
      referrals: {
        Row: {
          id: string
          referring_customer_id: string
          referred_name: string
          referred_email: string | null
          referred_phone: string | null
          status: string
          reward_notes: string | null
          created_at: string
        }
        Insert: {
          id?: string
          referring_customer_id: string
          referred_name: string
          referred_email?: string | null
          referred_phone?: string | null
          status?: string
          reward_notes?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          referring_customer_id?: string
          referred_name?: string
          referred_email?: string | null
          referred_phone?: string | null
          status?: string
          reward_notes?: string | null
          created_at?: string
        }
      }
      follow_up_tasks: {
        Row: {
          id: string
          customer_id: string
          lead_id: string | null
          project_id: string | null
          assigned_to: string | null
          title: string
          due_date: string
          is_completed: boolean
          completed_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          customer_id: string
          lead_id?: string | null
          project_id?: string | null
          assigned_to?: string | null
          title: string
          due_date: string
          is_completed?: boolean
          completed_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          customer_id?: string
          lead_id?: string | null
          project_id?: string | null
          assigned_to?: string | null
          title?: string
          due_date?: string
          is_completed?: boolean
          completed_at?: string | null
          created_at?: string
        }
      }
      audit_logs: {
        Row: {
          id: string
          user_id: string | null
          action: string
          entity_name: string
          entity_id: string
          old_data: Json | null
          new_data: Json | null
          ip_address: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          action: string
          entity_name: string
          entity_id: string
          old_data?: Json | null
          new_data?: Json | null
          ip_address?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          action?: string
          entity_name?: string
          entity_id?: string
          old_data?: Json | null
          new_data?: Json | null
          ip_address?: string | null
          created_at?: string
        }
      }
      consents: {
        Row: {
          id: string
          customer_id: string
          consent_type: string
          is_granted: boolean
          ip_address: string | null
          created_at: string
        }
        Insert: {
          id?: string
          customer_id: string
          consent_type: string
          is_granted?: boolean
          ip_address?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          customer_id?: string
          consent_type?: string
          is_granted?: boolean
          ip_address?: string | null
          created_at?: string
        }
      }
      testimonials: {
        Row: {
          id: string
          department_id: string | null
          client_name: string
          organisation_name: string | null
          quote: string
          avatar_url: string | null
          rating: number | null
          is_featured: boolean
          created_at: string
        }
        Insert: {
          id?: string
          department_id?: string | null
          client_name: string
          organisation_name?: string | null
          quote: string
          avatar_url?: string | null
          rating?: number | null
          is_featured?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          department_id?: string | null
          client_name?: string
          organisation_name?: string | null
          quote?: string
          avatar_url?: string | null
          rating?: number | null
          is_featured?: boolean
          created_at?: string
        }
      }
    }
  }
}
