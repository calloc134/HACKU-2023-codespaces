export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      app_users: {
        Row: {
          app_user_id: string | null;
          auth_id: string;
          created_at: string | null;
          icon_url: string | null;
          is_active: boolean | null;
          name: string;
          profile: string | null;
          updated_at: string | null;
        };
        Insert: {
          app_user_id?: string | null;
          auth_id: string;
          created_at?: string | null;
          icon_url?: string | null;
          is_active?: boolean | null;
          name?: string;
          profile?: string | null;
          updated_at?: string | null;
        };
        Update: {
          app_user_id?: string | null;
          auth_id?: string;
          created_at?: string | null;
          icon_url?: string | null;
          is_active?: boolean | null;
          name?: string;
          profile?: string | null;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "app_users_auth_id_fkey";
            columns: ["auth_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      comments: {
        Row: {
          auth_id: string;
          comment_id: number;
          content: string | null;
          created_at: string | null;
          is_active: boolean | null;
          replying_comment_id: number | null;
          replying_post_id: number | null;
          updated_at: string | null;
        };
        Insert: {
          auth_id?: string;
          comment_id?: number;
          content?: string | null;
          created_at?: string | null;
          is_active?: boolean | null;
          replying_comment_id?: number | null;
          replying_post_id?: number | null;
          updated_at?: string | null;
        };
        Update: {
          auth_id?: string;
          comment_id?: number;
          content?: string | null;
          created_at?: string | null;
          is_active?: boolean | null;
          replying_comment_id?: number | null;
          replying_post_id?: number | null;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "comments_auth_id_fkey";
            columns: ["auth_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "comments_replying_comment_id_fkey";
            columns: ["replying_comment_id"];
            referencedRelation: "comments";
            referencedColumns: ["comment_id"];
          },
          {
            foreignKeyName: "comments_replying_post_id_fkey";
            columns: ["replying_post_id"];
            referencedRelation: "posts";
            referencedColumns: ["post_id"];
          },
        ];
      };
      likes: {
        Row: {
          auth_id: string;
          created_at: string | null;
          is_active: boolean | null;
          post_id: number;
          updated_at: string | null;
        };
        Insert: {
          auth_id?: string;
          created_at?: string | null;
          is_active?: boolean | null;
          post_id: number;
          updated_at?: string | null;
        };
        Update: {
          auth_id?: string;
          created_at?: string | null;
          is_active?: boolean | null;
          post_id?: number;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "likes_auth_id_fkey";
            columns: ["auth_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "likes_post_id_fkey";
            columns: ["post_id"];
            referencedRelation: "posts";
            referencedColumns: ["post_id"];
          },
        ];
      };
      posts: {
        Row: {
          auth_id: string;
          content: string | null;
          created_at: string | null;
          is_active: boolean | null;
          is_lie: boolean | null;
          post_id: number;
          updated_at: string | null;
        };
        Insert: {
          auth_id?: string;
          content?: string | null;
          created_at?: string | null;
          is_active?: boolean | null;
          is_lie?: boolean | null;
          post_id?: number;
          updated_at?: string | null;
        };
        Update: {
          auth_id?: string;
          content?: string | null;
          created_at?: string | null;
          is_active?: boolean | null;
          is_lie?: boolean | null;
          post_id?: number;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "posts_auth_id_fkey";
            columns: ["auth_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      val_lies: {
        Row: {
          auth_id: string;
          created_at: string | null;
          is_active: boolean | null;
          post_id: number;
          updated_at: string | null;
        };
        Insert: {
          auth_id?: string;
          created_at?: string | null;
          is_active?: boolean | null;
          post_id: number;
          updated_at?: string | null;
        };
        Update: {
          auth_id?: string;
          created_at?: string | null;
          is_active?: boolean | null;
          post_id?: number;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "val_lies_auth_id_fkey";
            columns: ["auth_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "val_lies_post_id_fkey";
            columns: ["post_id"];
            referencedRelation: "posts";
            referencedColumns: ["post_id"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      get_comments: {
        Args: {
          post_id: number;
        };
        Returns: {
          comment_id: number;
          replying_post_id: number;
          replying_comment_id: number;
          created_at: string;
          updated_at: string;
          content: string;
          is_comment_active: boolean;
          auth_id: string;
          app_user_id: string;
          name: string;
          icon_url: string;
          is_user_active: boolean;
        }[];
      };
      get_posts: {
        Args: {
          my_auth_id: string;
        };
        Returns: {
          post_id: number;
          auth_id: string;
          content: string;
          created_at: string;
          updated_at: string;
          is_active: boolean;
          is_lie: boolean;
          name: string;
          app_user_id: string;
          icon_url: string;
          likes_num: number;
          liked: boolean;
          val_lies_num: number;
          val_lied: boolean;
        }[];
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
