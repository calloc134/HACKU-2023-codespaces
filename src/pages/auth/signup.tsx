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
import { signUpAndUpdateUsername, supabase } from "../../supabase";

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
    const result = await signUpAndUpdateUsername(
      { email: email, password: password },
      username,
    );

    if (result) {
      navigate("/");
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
