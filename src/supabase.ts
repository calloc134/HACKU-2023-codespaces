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
 * SignUp時にユーザー名も登録するようにする関数
 * @param signUpData SignUpに必要な情報
 * @param username ユーザー名
 * @returns 成功時 trueを返す。 失敗時は falseを返す
 */
export const signUpAndUpdateUsername = async (
  signUpData: { email: string; password: string },
  username: string,
) => {
  try {
    // 登録処理
    const signupQuery = await supabase.auth.signUp(signUpData);

    // エラーの確認
    if (signupQuery.error) {
      throw signupQuery.error;
    }

    // エラーなしでユーザー名前を登録するように設定
    const user = await supabase.auth.getUser(); // ログイン中のユーザー情報を取得

    if (user.data.user == null) {
      alert("エラー(USER_IS_NULL)");
      return false;
    }

    const auth_user_id = user.data.user.id;
    // アプリ側のユーザテーブルのユーザ名を更新する
    const usernameQuery = await supabase
      .from("app_users")
      .update({ name: username })
      .eq("auth_id", auth_user_id);

    if (!usernameQuery.error) {
      return true;
    } else {
      throw usernameQuery.error;
    }
  } catch (error) {
    alert(error);
    return false;
  }
};

/**
 * すべての投稿のうち，作成日時が新しい100件を取得する
 * @returns
 */
export const fetchPosts = async () => {
  try {
    // ログイン中のユーザーidを取得
    const user_data = await supabase.auth.getUser();

    if (!user_data.data.user) {
      alert("エラー(USER_IS_NULL)");
      return;
    }

    const auth_user_id = user_data.data.user.id;

    // すべての投稿のうち，作成日時が新しい100件を取得する
    const { data, error } = await supabase
      .rpc("get_posts", { my_auth_id: auth_user_id })
      .order("created_at", { ascending: false })
      .limit(100);

    if (error) {
      // ここでエラーハンドリング
      alert(error.message);
    } else {
      console.log("data" + data);
      return data;
    }
  } catch (error) {
    alert(error);
  }
};

/**
 * 嘘を投稿する
 * @param content 嘘の中身
 */
export const sendPost = async (content: string) => {
  try {
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
  } catch (error) {
    alert(error);
  }
};
