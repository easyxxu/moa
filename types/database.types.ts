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
      answer: {
        Row: {
          content: string
          created_at: string
          id: number
          question_id: number
          writer_id: string | null
        }
        Insert: {
          content: string
          created_at?: string
          id?: number
          question_id: number
          writer_id?: string | null
        }
        Update: {
          content?: string
          created_at?: string
          id?: number
          question_id?: number
          writer_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "answer_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "question"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "answer_writer_id_fkey"
            columns: ["writer_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      cart: {
        Row: {
          created_at: string
          id: number
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          user_id?: string
        }
        Update: {
          created_at?: string
          id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "cart_user_id_fkey1"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      cart_item: {
        Row: {
          cart_id: number
          id: number
          product_id: number
          quantity: number
        }
        Insert: {
          cart_id: number
          id?: number
          product_id: number
          quantity: number
        }
        Update: {
          cart_id?: number
          id?: number
          product_id?: number
          quantity?: number
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
          customer_address: string
          customer_delivery_message: string | null
          customer_email: string
          customer_id: string
          customer_name: string
          customer_phone: string
          id: number
          order_name: string
          order_status: string
          payment_method: string
          payment_status: string
          total_price: number
        }
        Insert: {
          created_at?: string
          customer_address: string
          customer_delivery_message?: string | null
          customer_email: string
          customer_id?: string
          customer_name: string
          customer_phone: string
          id?: number
          order_name: string
          order_status: string
          payment_method: string
          payment_status: string
          total_price: number
        }
        Update: {
          created_at?: string
          customer_address?: string
          customer_delivery_message?: string | null
          customer_email?: string
          customer_id?: string
          customer_name?: string
          customer_phone?: string
          id?: number
          order_name?: string
          order_status?: string
          payment_method?: string
          payment_status?: string
          total_price?: number
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
          item_id: number
          order_id: number
          price: number
          quantity: number
          review_id: number | null
          review_status: boolean
          shipping_fee: number
        }
        Insert: {
          id?: number
          item_id: number
          order_id: number
          price: number
          quantity: number
          review_id?: number | null
          review_status?: boolean
          shipping_fee: number
        }
        Update: {
          id?: number
          item_id?: number
          order_id?: number
          price?: number
          quantity?: number
          review_id?: number | null
          review_status?: boolean
          shipping_fee?: number
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
          average_rating: number
          category: string
          character: string
          created_at: string
          description: string | null
          id: number
          image: string[]
          liked_count: number
          liked_list: string[] | null
          name: string
          price: number
          seller_id: string
          seller_store: string
          shipping_fee: number
          stock: number
        }
        Insert: {
          average_rating?: number
          category: string
          character: string
          created_at?: string
          description?: string | null
          id?: number
          image: string[]
          liked_count?: number
          liked_list?: string[] | null
          name: string
          price: number
          seller_id?: string
          seller_store: string
          shipping_fee: number
          stock: number
        }
        Update: {
          average_rating?: number
          category?: string
          character?: string
          created_at?: string
          description?: string | null
          id?: number
          image?: string[]
          liked_count?: number
          liked_list?: string[] | null
          name?: string
          price?: number
          seller_id?: string
          seller_store?: string
          shipping_fee?: number
          stock?: number
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
          answer_id: number | null
          answer_status: boolean
          content: string
          created_at: string
          id: number
          product_id: number
          title: string
          writer_id: string
        }
        Insert: {
          answer_id?: number | null
          answer_status: boolean
          content: string
          created_at?: string
          id?: number
          product_id: number
          title: string
          writer_id?: string
        }
        Update: {
          answer_id?: number | null
          answer_status?: boolean
          content?: string
          created_at?: string
          id?: number
          product_id?: number
          title?: string
          writer_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "question_answer_id_fkey"
            columns: ["answer_id"]
            isOneToOne: false
            referencedRelation: "answer"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "question_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "product"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "question_writer_id_fkey"
            columns: ["writer_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      review: {
        Row: {
          content: string
          created_at: string
          id: number
          images: string[] | null
          order_item_id: number
          product_id: number
          star_rating: number
          writer_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: number
          images?: string[] | null
          order_item_id: number
          product_id: number
          star_rating: number
          writer_id?: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: number
          images?: string[] | null
          order_item_id?: number
          product_id?: number
          star_rating?: number
          writer_id?: string
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
          {
            foreignKeyName: "review_writer_id_fkey"
            columns: ["writer_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      user: {
        Row: {
          created_at: string
          email: string
          id: string
          name: string
          phone: string | null
          profile_img: string | null
          user_type: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id: string
          name: string
          phone?: string | null
          profile_img?: string | null
          user_type?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          name?: string
          phone?: string | null
          profile_img?: string | null
          user_type?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_product_with_order_count: {
        Args: Record<PropertyKey, never>
        Returns: {
          product_id: number
          name: string
          price: number
          image: string[]
          category: string
          product_character: string
          created_at: string
          liked_count: number
          order_count: number
        }[]
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
