import { Heading, Button } from "@chakra-ui/react";
import React, { useState } from "react";
import { CenterBox } from "../../components/CenterBox";
import {
  EmailInput,
  PasswordInput,
  UsernameInput,
} from "../../components/auth/AuthInput";
import { useNavigate } from "react-router-dom";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { supabase } from "../../supabase";

export const SignUpPage = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setUsername(e.target.value);
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  const handleSubmit = async () => {
    try {
      // 登録処理
      const signupQuery = await supabase.auth.signUp({
        email: email,
        password: password,
      });

      // エラーの確認
      if (signupQuery.error) {
        throw signupQuery.error;
      }

      // エラーなしでユーザー名前を登録するように設定
      const user = await supabase.auth.getUser(); // ログイン中のユーザー情報を取得

      if (user.data.user == null) {
        alert("エラー");
        return;
      }

      const auth_user_id = user.data.user.id;
      // アプリ側のユーザテーブルのユーザ名を更新する
      const usernameQuery = await supabase
        .from("app_users")
        .update({ name: "YourName" })
        .eq("auth_id", auth_user_id);

      if (!usernameQuery.error) {
        navigate("/home");
      } else {
        throw usernameQuery.error;
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <CenterBox>
      <Button
        position="absolute"
        borderEndRadius="full"
        left="0"
        mb={4}
        variant="ghost"
        _hover={{ bg: "gray.200" }}
        _active={{ bg: "gray.300" }}
        onClick={() => {
          navigate("/");
        }}
      >
        <ArrowBackIcon fontSize="3xl" />
      </Button>
      <Heading mb={4} color={"gray.600"}>
        Sign up
      </Heading>
      <UsernameInput value={username} onChange={handleUsernameChange} />
      <EmailInput value={email} onChange={handleEmailChange} />
      <PasswordInput
        label="Create a password"
        value={password}
        onChange={handlePasswordChange}
      />
      <Button
        colorScheme="whiteAlpha"
        size="lg"
        mt={4}
        background={"gray.600"}
        type="submit"
        shadow="xl"
        onClick={handleSubmit}
      >
        Sign up
      </Button>
    </CenterBox>
  );
};
