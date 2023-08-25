import { useRecoilState, useSetRecoilState } from "recoil";
import { postsState } from "./Atoms";
import { useState, useEffect } from "react";
import { fetchPosts } from "../supabase";

export const useEnablePosts = () => {
  const setPosts = useSetRecoilState(postsState);
  const [startedFetch, setStartFetch] = useState(false);

  useEffect(() => {
    if (!startedFetch) {
      setStartFetch(true);
      const asyncTask = async () => {
        const data = await fetchPosts();

        if (data) {
          setPosts(data); // 状態を更新
        }
      };
      asyncTask();
    }
  });
};

interface ReloadFunction {
  (): void;
}

/**
 * Postsの中身を更新する関数
 * @returns reload関数
 */
export const useReloadPosts = (): ReloadFunction => {
  const setPosts = useSetRecoilState(postsState);

  return () => {
    const asyncTask = async () => {
      const data = await fetchPosts();

      if (data) {
        setPosts(data); // 状態を更新
      }
    };
    asyncTask();
    return;
  };
};
