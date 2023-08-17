import { Heading, Button } from "@chakra-ui/react";
import React, { useState } from "react";
import { CenterBox } from "../../components/CenterBox";
import { EmailInput, PasswordInput } from "../../components/auth/AuthInput";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  return (
    <CenterBox>
      <Heading mb={4} color={"gray.600"}>
        ログイン
      </Heading>
      <EmailInput value={email} onChange={handleEmailChange} />
      <PasswordInput
        value={password}
        onChange={handlePasswordChange}
        showButton={true}
      />
      <Button
        colorScheme="whiteAlpha"
        size="lg"
        mt={4}
        background={"gray.600"}
        type="submit"
        shadow="xl"
      >
        Sign in
      </Button>
    </CenterBox>
  );
};
