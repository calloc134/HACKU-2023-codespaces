import { createClient, Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

const supabase = createClient("", "");

/**
 * セッションの状態を取得する。
 *
 * @returns {Session | null}
 */
const useSession = () => {
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
  const auth_user_id = user_data.data.user.id;

  // postsテーブルにレコードを追加する
  const { error } = await supabase
    .from("posts")
    .insert({ auth_id: auth_user_id, content: content });
  // 嘘判定の結果をどうするかはまだ未定のため省略
};
