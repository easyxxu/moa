export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      cart: {
        Row: {
          created_at: string
          id: number
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          user_id?: string | null
        }
        Relationships: []
      }
      cart_item: {
        Row: {
          cart_id: number | null
          id: number
          product_id: number | null
          quantity: number | null
        }
        Insert: {
          cart_id?: number | null
          id?: number
          product_id?: number | null
          quantity?: number | null
        }
        Update: {
          cart_id?: number | null
          id?: number
          product_id?: number | null
          quantity?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "cart_item_cart_id_fkey"
            columns: ["cart_id"]
            isOneToOne: false
            referencedRelation: "cart"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cart_item_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "product"
            referencedColumns: ["id"]
          },
        ]
      }
      order: {
        Row: {
          created_at: string
          customer_address: string | null
          customer_delivery_message: string | null
          customer_email: string | null
          customer_id: string | null
          customer_name: string | null
          customer_phone: string | null
          id: number
          order_items: Json[] | null
          order_name: string | null
          order_status: string | null
          payment_method: string | null
          payment_status: string | null
          total_price: number | null
        }
        Insert: {
          created_at?: string
          customer_address?: string | null
          customer_delivery_message?: string | null
          customer_email?: string | null
          customer_id?: string | null
          customer_name?: string | null
          customer_phone?: string | null
          id?: number
          order_items?: Json[] | null
          order_name?: string | null
          order_status?: string | null
          payment_method?: string | null
          payment_status?: string | null
          total_price?: number | null
        }
        Update: {
          created_at?: string
          customer_address?: string | null
          customer_delivery_message?: string | null
          customer_email?: string | null
          customer_id?: string | null
          customer_name?: string | null
          customer_phone?: string | null
          id?: number
          order_items?: Json[] | null
          order_name?: string | null
          order_status?: string | null
          payment_method?: string | null
          payment_status?: string | null
          total_price?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "order_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      order_item: {
        Row: {
          id: number
          item_id: number | null
          order_id: number | null
          price: number | null
          quantity: number | null
          review_id: number | null
          review_status: boolean
          shipping_fee: number | null
        }
        Insert: {
          id?: number
          item_id?: number | null
          order_id?: number | null
          price?: number | null
          quantity?: number | null
          review_id?: number | null
          review_status?: boolean
          shipping_fee?: number | null
        }
        Update: {
          id?: number
          item_id?: number | null
          order_id?: number | null
          price?: number | null
          quantity?: number | null
          review_id?: number | null
          review_status?: boolean
          shipping_fee?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "order_item_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "product"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_item_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "order"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_item_review_id_fkey"
            columns: ["review_id"]
            isOneToOne: false
            referencedRelation: "review"
            referencedColumns: ["id"]
          },
        ]
      }
      product: {
        Row: {
          category: string[] | null
          created_at: string
          description: string | null
          id: number
          image: string[] | null
          liked_count: number | null
          liked_list: string[] | null
          name: string | null
          price: number | null
          seller_id: string
          seller_store: string | null
          shipping_fee: number | null
          stock: number | null
          updated_at: string | null
        }
        Insert: {
          category?: string[] | null
          created_at?: string
          description?: string | null
          id?: number
          image?: string[] | null
          liked_count?: number | null
          liked_list?: string[] | null
          name?: string | null
          price?: number | null
          seller_id?: string
          seller_store?: string | null
          shipping_fee?: number | null
          stock?: number | null
          updated_at?: string | null
        }
        Update: {
          category?: string[] | null
          created_at?: string
          description?: string | null
          id?: number
          image?: string[] | null
          liked_count?: number | null
          liked_list?: string[] | null
          name?: string | null
          price?: number | null
          seller_id?: string
          seller_store?: string | null
          shipping_fee?: number | null
          stock?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "product_seller_id_fkey"
            columns: ["seller_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      question: {
        Row: {
          answer_status: string
          content: string
          created_at: string
          id: number
          title: string
          user_id: string
        }
        Insert: {
          answer_status: string
          content: string
          created_at?: string
          id?: number
          title: string
          user_id: string
        }
        Update: {
          answer_status?: string
          content?: string
          created_at?: string
          id?: number
          title?: string
          user_id?: string
        }
        Relationships: []
      }
      review: {
        Row: {
          content: string
          created_at: string
          id: number
          images: string[] | null
          order_item_id: number
          product_id: number
          star_rating: number | null
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: number
          images?: string[] | null
          order_item_id: number
          product_id: number
          star_rating?: number | null
          user_id?: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: number
          images?: string[] | null
          order_item_id?: number
          product_id?: number
          star_rating?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "review_order_item_id_fkey"
            columns: ["order_item_id"]
            isOneToOne: false
            referencedRelation: "order_item"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "review_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "product"
            referencedColumns: ["id"]
          },
        ]
      }
      user: {
        Row: {
          created_at: string
          email: string | null
          id: string
          name: string | null
          phone: string | null
          user_type: string | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          id: string
          name?: string | null
          phone?: string | null
          user_type?: string | null
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: string
          name?: string | null
          phone?: string | null
          user_type?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
