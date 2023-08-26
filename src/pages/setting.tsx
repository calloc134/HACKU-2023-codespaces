import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  Avatar,
  Center,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { supabase } from "../supabase";

export const SettingPage = () => {
  const [icon, setIcon] = useState<File | null>(null);
  const [previewIcon, setPreviewIcon] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleIconChangeClick = () => {
    fileInputRef.current?.click();
  };

  const handleIconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIcon(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewIcon(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setName(e.target.value);
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  const handleSubmit = async () => {
    // メールアドレスとパスワードで認証
    if (!supabase.auth.getUser()) {
      const { error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) {
        alert("認証エラー");
        return;
      }
    }

    // アイコンファイルをアップロード
    if (icon) {
      const user = await supabase.auth.getUser();
      if (user && user.data && user.data.user) {
        const filePath = `${user.data.user.id}/${icon.name}`;
        const { error: uploadError } = await supabase.storage
          .from("icons")
          .upload(filePath, icon);

        if (uploadError) {
          alert(uploadError.message);
          return;
        }

        // 画像のURLを取得
        const { data } = supabase.storage.from("icons").getPublicUrl(filePath);
        const icon_url = data?.publicUrl;

        // アイコンとユーザー名の更新
        const { error: updateError } = await supabase
          .from("app_users")
          .update({ icon_url: icon_url, name: name })
          .eq("auth_id", user.data.user.id);

        if (updateError) {
          alert("更新エラー");
        } else {
          alert("更新成功");
          navigate("/home");
        }
      } else {
        alert("ユーザー情報を取得できませんでした");
        return;
      }
    }
  };

  const navigate = useNavigate();
  const handleHomeClick = () => {
    navigate("/home");
  };

  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"} bg="#D6BCFA">
      <Stack
        spacing={4}
        w={"full"}
        maxW={"md"}
        bg={useColorModeValue("white", "gray.700")}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        my={12}
      >
        <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
          User Profile Edit
        </Heading>
        <FormControl id="userName">
          <FormLabel>User Icon</FormLabel>
          <Stack direction={["column", "row"]} spacing={6}>
            <Center>
              <Avatar
                size="xl"
                src={
                  previewIcon ||
                  "https://cdn-icons-png.flaticon.com/512/6596/6596121.png"
                }
              ></Avatar>
            </Center>
            <Center w="full">
              <Button w="full" onClick={handleIconChangeClick}>
                Change Icon
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleIconChange}
                style={{ display: "none" }}
              />
            </Center>
          </Stack>
        </FormControl>
        <FormControl id="username" isRequired>
          <FormLabel>Username</FormLabel>
          <Input
            placeholder="Username"
            _placeholder={{ color: "gray.500" }}
            type="text"
            value={name}
            onChange={handleNameChange}
          />
        </FormControl>
        <FormControl id="email" isRequired>
          <FormLabel>Email address</FormLabel>
          <Input
            placeholder="your-email@example.com"
            _placeholder={{ color: "gray.500" }}
            type="email"
            value={email}
            onChange={handleEmailChange}
          />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <Input
            placeholder="password"
            _placeholder={{ color: "gray.500" }}
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </FormControl>
        <Stack spacing={6} direction={["column", "row"]}>
          <Button
            colorScheme="blue"
            variant="outline"
            w="full"
            onClick={handleHomeClick}
          >
            Cancel
          </Button>
          <Button
            colorScheme="blue"
            variant="solid"
            w="full"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
};
