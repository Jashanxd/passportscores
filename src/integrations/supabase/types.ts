export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.17"
  }
  public: {
    Tables: {
      countries: {
        Row: {
          cover: string
          created_at: string
          iso: string
          name: string
          region: string
        }
        Insert: {
          cover: string
          created_at?: string
          iso: string
          name: string
          region: string
        }
        Update: {
          cover?: string
          created_at?: string
          iso?: string
          name?: string
          region?: string
        }
        Relationships: []
      }
      data_sync_runs: {
        Row: {
          finished_at: string | null
          id: string
          message: string | null
          rows_upserted: number
          source: string
          started_at: string
          status: string
        }
        Insert: {
          finished_at?: string | null
          id?: string
          message?: string | null
          rows_upserted?: number
          source: string
          started_at?: string
          status?: string
        }
        Update: {
          finished_at?: string | null
          id?: string
          message?: string | null
          rows_upserted?: number
          source?: string
          started_at?: string
          status?: string
        }
        Relationships: []
      }
      passport_snapshots: {
        Row: {
          captured_at: string
          created_at: string
          eta: number
          id: string
          iso: string
          mobility: number
          rank: number
          regional_rank: number
          source: string
          visa_free: number
          visa_on_arrival: number
          visa_required: number
        }
        Insert: {
          captured_at?: string
          created_at?: string
          eta?: number
          id?: string
          iso: string
          mobility?: number
          rank: number
          regional_rank?: number
          source?: string
          visa_free?: number
          visa_on_arrival?: number
          visa_required?: number
        }
        Update: {
          captured_at?: string
          created_at?: string
          eta?: number
          id?: string
          iso?: string
          mobility?: number
          rank?: number
          regional_rank?: number
          source?: string
          visa_free?: number
          visa_on_arrival?: number
          visa_required?: number
        }
        Relationships: [
          {
            foreignKeyName: "passport_snapshots_iso_fkey"
            columns: ["iso"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["iso"]
          },
        ]
      }
      visa_rules: {
        Row: {
          access: string
          destination_iso: string
          nationality_iso: string
          note: string | null
          updated_at: string
        }
        Insert: {
          access: string
          destination_iso: string
          nationality_iso: string
          note?: string | null
          updated_at?: string
        }
        Update: {
          access?: string
          destination_iso?: string
          nationality_iso?: string
          note?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "visa_rules_destination_iso_fkey"
            columns: ["destination_iso"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["iso"]
          },
          {
            foreignKeyName: "visa_rules_nationality_iso_fkey"
            columns: ["nationality_iso"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["iso"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      recompute_passport_snapshot: {
        Args: { _source?: string }
        Returns: number
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
