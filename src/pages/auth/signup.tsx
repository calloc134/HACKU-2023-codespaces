import { Heading, Button } from "@chakra-ui/react";
import React, { useState } from "react";
import { CenterBox } from "../../components/CenterBox";
import { EmailInput, PasswordInput } from "../../components/auth/AuthInput";
import { useNavigate } from "react-router-dom";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { supabase } from "../../supabase";

export const SignUpPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  const handleSubmit = async () => {
    try {
      const { error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });
      if (!error) {
        navigate("/home");
      } else {
        throw error;
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
        アカウント作成
      </Heading>
      <EmailInput value={email} onChange={handleEmailChange} />
      <PasswordInput value={password} onChange={handlePasswordChange} />
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
