import { Heading, Button } from "@chakra-ui/react";
import React, { useState } from "react";
import { CenterBox } from "../../components/CenterBox";
import { EmailInput, PasswordInput } from "../../components/auth/AuthInput";

export const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  return (
    <CenterBox>
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
      >
        Sign up
      </Button>
    </CenterBox>
  );
};
