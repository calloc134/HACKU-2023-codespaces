import { createClient, Session, User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

export const supabase = createClient(
  "https://rphpgdwfvgbqodprwhbo.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJwaHBnZHdmdmdicW9kcHJ3aGJvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTE4NDU4NTEsImV4cCI6MjAwNzQyMTg1MX0.Rni5vkoj06n16aobQ3uuz-Id2A09a4GEPCx6EkzZLgs",
);

let cachedUserData: User | null = null;

const getUser = async () => {
  if (cachedUserData) return cachedUserData;
  const user_data = await supabase.auth.getUser();
  cachedUserData = user_data.data.user;
  return cachedUserData;
};

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

export const signUpAndUpdateUsername = async (
  signUpData: { email: string; password: string },
  app_user_id: string,
  username: string,
) => {
  try {
    const signupQuery = await supabase.auth.signUp(signUpData);

    if (signupQuery.error) {
      throw signupQuery.error;
    }

    const user = await getUser();

    if (user == null) {
      alert("エラー(USER_IS_NULL)");
      return false;
    }

    const auth_user_id = user.id;
    const usernameQuery = await supabase
      .from("app_users")
      .update({ name: username, app_user_id: app_user_id })
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

export const fetchPosts = async () => {
  try {
    const user = await getUser();

    if (!user) {
      alert("エラー(USER_IS_NULL)");
      return;
    }

    const auth_user_id = user.id;

    // すべての投稿のうち，作成日時が新しい100件を取得する
    const { data, error } = await supabase
      .rpc("get_posts", { my_auth_id: auth_user_id })
      .order("created_at", { ascending: false })
      .limit(100);

    if (error) {
      alert(error.message);
    } else {
      return data;
    }
  } catch (error) {
    alert(error);
  }
};

export const sendPost = async (content: string) => {
  try {
    const user = await getUser();

    if (user == null) return;

    const auth_user_id = user.id;

    const { error } = await supabase
      .from("posts")
      .insert({ auth_id: auth_user_id, content: content });
    // 嘘判定の結果をどうするかはまだ未定のため省略

    if (error) {
      throw error;
    }
  } catch (error) {
    alert(error);
  }
};

export const sendPostComment = async (
  replying_post_id: number,
  content: string,
) => {
  try {
    const user = await getUser();

    if (user == null) return;

    const auth_user_id = user.id;

    const { error } = await supabase.from("comments").insert([
      {
        replying_post_id: replying_post_id, //大本の投稿のid
        auth_id: auth_user_id,
        content: content,
      },
    ]);
    // 嘘判定の結果をどうするかはまだ未定のため省略

    if (error) {
      throw error;
    }
  } catch (error) {
    alert(error);
  }
};

export const fetchPostComments = async (post_id: number) => {
  try {
    // 特定の投稿に対するコメント一覧を取得する
    const { data, error } = await supabase
      .from("comments")
      .select("*")
      .eq("replying_post_id", post_id);

    if (error) {
      alert(error.message);
    } else {
      return data;
    }
  } catch (error) {
    alert("a");
  }
  // 特定の投稿に対するコメント一覧を取得する
};
