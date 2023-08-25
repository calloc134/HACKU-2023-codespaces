import { createClient, User } from "@supabase/supabase-js";
import { useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import { sessionState } from "./utils/Atoms";
import { Database } from "../types/supabase";

export const supabase = createClient<Database>(
  "https://rphpgdwfvgbqodprwhbo.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJwaHBnZHdmdmdicW9kcHJ3aGJvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTE4NDU4NTEsImV4cCI6MjAwNzQyMTg1MX0.Rni5vkoj06n16aobQ3uuz-Id2A09a4GEPCx6EkzZLgs",
);

let cachedUserData: User | null = null;

export const getUser = async () => {
  if (cachedUserData) return cachedUserData;
  const user_data = await supabase.auth.getUser();
  cachedUserData = user_data.data.user;
  return cachedUserData;
};

export const useSession = (check: boolean = false) => {
  const [session, setSession] = useRecoilState(sessionState);
  const listen = useRef(false);

  useEffect(() => {
    if (!listen.current && check) {
      listen.current = true;
      const asyncTask = async () => {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        setSession(session);
      };

      asyncTask;
      supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session);
      });
    }

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
    console.log("signINQuery => " + signupQuery.data);

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

export const deletePost = async (post_id: number) => {
  try {
    const { error } = await supabase
      .from("posts")
      .update({ is_active: false })
      .eq("post_id", post_id);

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
      .rpc("get_comments", { post_id: post_id })
      .order("created_at", { ascending: false });

    if (error) {
      alert(error.message);
    } else {
      return data;
    }
  } catch (error) {
    alert(error);
  }
  // 特定の投稿に対するコメント一覧を取得する
};

export const realtime_posts_insert_detection = async () => {
  supabase
    .channel("*")
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "posts",
      },
      (payload) => {
        if (payload.eventType == "INSERT") {
          console.log("投稿追加後のデータ", payload.new);
          console.log("投稿追加前のデータ", payload.old);
        }
      },
    )
    .subscribe();
};
