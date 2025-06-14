export type Database = {
  public: {
    Tables: {
      ads: {
        Row: {
          id: string
          created_at: string
          title: string
          category: string
          description: string
          location: string
          contact_name: string
          contact_phone: string
          contact_email: string
          image_url: string | null
          user_id: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          title: string
          category: string
          description: string
          location: string
          contact_name: string
          contact_phone: string
          contact_email: string
          image_url?: string | null
          user_id?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          title?: string
          category?: string
          description?: string
          location?: string
          contact_name?: string
          contact_phone?: string
          contact_email?: string
          image_url?: string | null
          user_id?: string | null
        }
      }
    }
  }
} 