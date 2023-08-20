import { createClient, Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

export const supabase = createClient(
  "https://rphpgdwfvgbqodprwhbo.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJwaHBnZHdmdmdicW9kcHJ3aGJvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTE4NDU4NTEsImV4cCI6MjAwNzQyMTg1MX0.Rni5vkoj06n16aobQ3uuz-Id2A09a4GEPCx6EkzZLgs",
);

export const useSession = () => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setSession(session);
    };

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return;
  });

  return session;
};

/**
 * すべての投稿のうち，作成日時が新しい100件を取得する
 * @returns
 */
export const fetchPosts = async () => {
  const { data, error } = await supabase
    .from("posts_view")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(100);

  if (error) {
    throw error;
  }

  return data;
};

/**
 * 嘘を投稿する
 * @param content 嘘の中身
 */
export const sendPost = async (content: string) => {
  // ログイン中のユーザーidを取得
  const user_data = await supabase.auth.getUser();

  // null check
  if (user_data.data.user == null) return;

  const auth_user_id = user_data.data.user.id;

  // postsテーブルにレコードを追加する
  const { error } = await supabase
    .from("posts")
    .insert({ auth_id: auth_user_id, content: content });
  // 嘘判定の結果をどうするかはまだ未定のため省略
};
