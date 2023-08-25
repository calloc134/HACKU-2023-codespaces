import { Button } from "@chakra-ui/react";
import { useState } from "react";
import { BiSolidLike, BiLike } from "react-icons/bi";
import { likePost } from "../../../supabase";

type LikeProps = {
  post_id: number;
  likes: number;
  pressed: boolean;
};

export const LikeButton = (props: LikeProps) => {
  const [likes, setLikes] = useState<number>(props.likes ? 0 : props.likes);
  const [pressed, setPressed] = useState<boolean>(props.pressed);

  const handleLike = () => {
    likePost(props.post_id, !pressed);

    // 押された状態　＝＞ 押されてない状態
    if (pressed) {
      setLikes(likes - 1);
    }
    // 押してない状態　＝＞ 押された状態
    else {
      setLikes(likes + 1);
    }
    setPressed(!pressed);
  };

  return (
    <Button
      flex="1"
      variant="ghost"
      leftIcon={pressed ? <BiSolidLike /> : <BiLike />}
      onClick={handleLike}
    >
      {likes != 0 && likes}
    </Button>
  );
};
